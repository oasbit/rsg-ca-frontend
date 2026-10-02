<?php
/**
 * Plugin Name: RSG Headless Bridge
 * Description: CORS + on-demand revalidation + contact form relay for the Vercel Next.js frontend.
 * Version: 1.1.0
 *
 * Install: copy this file to wp-content/mu-plugins/rsg-headless-bridge.php on SiteGround.
 * Configure the constants below before going live.
 */

if (!defined('ABSPATH')) {
  exit;
}

/** Public Next.js frontend URL (no trailing slash). */
if (!defined('RSG_FRONTEND_URL')) {
  define('RSG_FRONTEND_URL', 'https://rsg-frontend.vercel.app');
}

/** Must match REVALIDATE_SECRET on Vercel. */
if (!defined('RSG_REVALIDATE_SECRET')) {
  define('RSG_REVALIDATE_SECRET', 'ef306fecfd5f3659ba9481a41c029fa83b45a2afb036a903a6ed8e5868c5ed63');
}

/**
 * Inbox address that receives contact form submissions.
 * Override via wp-config.php: define('RSG_CONTACT_EMAIL', 'you@example.com');
 */
if (!defined('RSG_CONTACT_EMAIL')) {
  define('RSG_CONTACT_EMAIL', get_option('admin_email'));
}

/**
 * Allow the Vercel frontend to call the WordPress REST API from the browser if needed.
 */
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    $allowed = [
      RSG_FRONTEND_URL,
      'http://localhost:3000',
    ];

    if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed, true)) {
      header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
      header('Access-Control-Allow-Credentials: true');
    }

    return $value;
  });
}, 15);

/**
 * Contact form relay endpoint.
 *
 * POST /wp-json/rsg/v1/contact
 * Header: X-RSG-Secret: <RSG_REVALIDATE_SECRET>
 * Body (JSON): { name, email, phone?, message }
 *
 * Sends the submission to RSG_CONTACT_EMAIL via wp_mail and returns JSON.
 */
add_action('rest_api_init', function () {
  register_rest_route('rsg/v1', '/contact', [
    'methods'             => 'POST',
    'callback'            => 'rsg_handle_contact',
    'permission_callback' => 'rsg_verify_contact_secret',
  ]);
});

function rsg_verify_contact_secret(WP_REST_Request $request): bool {
  $secret = $request->get_header('X-RSG-Secret');
  return hash_equals(RSG_REVALIDATE_SECRET, (string) $secret);
}

function rsg_handle_contact(WP_REST_Request $request): WP_REST_Response {
  $body = $request->get_json_params();

  $name    = sanitize_text_field($body['name'] ?? '');
  $email   = sanitize_email($body['email'] ?? '');
  $phone   = sanitize_text_field($body['phone'] ?? '');
  $message = sanitize_textarea_field($body['message'] ?? '');

  if (!$name || !$email || !$message || !is_email($email)) {
    return new WP_REST_Response(
      ['error' => 'Please complete all required fields.'],
      400
    );
  }

  $to      = RSG_CONTACT_EMAIL;
  $subject = sprintf('[RS Group] New inquiry from %s', $name);
  $content = implode("\n", array_filter([
    "Name:    {$name}",
    "Email:   {$email}",
    $phone ? "Phone:   {$phone}" : '',
    '',
    $message,
  ]));

  $headers = [
    'Content-Type: text/plain; charset=UTF-8',
    "Reply-To: {$name} <{$email}>",
  ];

  $sent = wp_mail($to, $subject, $content, $headers);

  if (!$sent) {
    return new WP_REST_Response(
      ['error' => 'Unable to send message. Please try again or contact us directly.'],
      500
    );
  }

  return new WP_REST_Response(['ok' => true], 200);
}

/**
 * Map WordPress page slugs to frontend routes for cache revalidation.
 */
function rsg_revalidate_paths_for_slug(string $slug): array {
  $map = [
    'coworking-space' => ['/'],
    'about-us'        => ['/about-us'],
    'services'        => ['/services', '/services/team-building'],
    'contact'         => ['/contact'],
    'privacy-policy-2'=> ['/privacy-policy'],
  ];

  return $map[$slug] ?? ['/'];
}

/**
 * Ask Vercel to revalidate cached pages when a WordPress page is published or updated.
 */
add_action('save_post_page', function ($post_id) {
  if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
    return;
  }

  $status = get_post_status($post_id);
  if (!in_array($status, ['publish', 'future'], true)) {
    return;
  }

  $slug = get_post_field('post_name', $post_id);
  if (!$slug) {
    return;
  }

  wp_remote_post(
    RSG_FRONTEND_URL . '/api/revalidate?secret=' . rawurlencode(RSG_REVALIDATE_SECRET),
    [
      'timeout' => 10,
      'headers' => ['Content-Type' => 'application/json'],
      'body'    => wp_json_encode(['slug' => $slug]),
    ]
  );
}, 20);
