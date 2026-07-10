"use client";

import Script from "next/script";
import { Reveal } from "@/components/motion/Reveal";

const FORM_ID = "aeIIpRIli8MTtL3dasx4";
const IFRAME_ID = `inline-${FORM_ID}`;

export function ContactForm() {
  return (
    <Reveal variant="fadeUp" delay={0.12}>
      <div style={{ minHeight: 463 }} className="w-full">
        <iframe
          src={`https://api.oasbit.com/widget/form/${FORM_ID}`}
          id={IFRAME_ID}
          data-layout='{"id":"INLINE"}'
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Contact Form"
          data-height="463"
          data-layout-iframe-id={IFRAME_ID}
          data-form-id={FORM_ID}
          title="Contact Form"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 463,
            border: "none",
            borderRadius: 8,
          }}
        />
      </div>
      <Script
        src="https://api.oasbit.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </Reveal>
  );
}
