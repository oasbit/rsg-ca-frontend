<?php
/**
 * Plugin Name: RSG Headless Bridge
 * Description: CORS + on-demand revalidation for the Vercel Next.js frontend.
 * Version: 1.0.0
 *
 * Install: copy this file to wp-content/mu-plugins/rsg-headless-bridge.php on SiteGround.
 * Configure the constants below before going live.
 */

if (!defined('ABSPATH')) {
  exit;
}

/** Public Next.js frontend URL (no trailing slash). */
if (!defined('RSG_FRONTEND_URL')) {
  define('RSG_FRONTEND_URL', 'https://rsg-ac.ca');
}

/** Must match REVALIDATE_SECRET on Vercel. */
if (!defined('RSG_REVALIDATE_SECRET')) {
  define('RSG_REVALIDATE_SECRET', 'change-me-in-production');
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
 * Map WordPress page slugs to frontend routes for cache revalidation.
 */
function rsg_revalidate_paths_for_slug(string $slug): array {
  $map = [
    'coworking-space' => ['/'],
    'about-us' => ['/about-us'],
    'services' => ['/services', '/services/team-building'],
    'contact' => ['/contact'],
    'privacy-policy-2' => ['/privacy-policy'],
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
      'body' => wp_json_encode(['slug' => $slug]),
    ]
  );
}, 20);
