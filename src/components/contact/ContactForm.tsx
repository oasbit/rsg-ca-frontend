"use client";

import Script from "next/script";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const FORM_ID = "aeIIpRIli8MTtL3dasx4";
const IFRAME_ID = `inline-${FORM_ID}`;
const FORM_MIN_HEIGHT = 463;

export function ContactForm() {
  return (
    <Reveal variant="fadeUp" delay={0.12}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        <div className="border-b border-white/10 bg-black/30 px-5 py-4 sm:px-6 sm:py-5">
          <SectionLabel light>Send a message</SectionLabel>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Complete the form and we&apos;ll respond within one business day.
          </p>
        </div>

        <div
          className="relative bg-transparent p-3 sm:p-4 [color-scheme:light]"
          style={{ minHeight: FORM_MIN_HEIGHT }}
        >
          <div className="overflow-hidden rounded-xl bg-transparent">
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
              data-height={String(FORM_MIN_HEIGHT)}
              data-layout-iframe-id={IFRAME_ID}
              data-form-id={FORM_ID}
              title="Contact Form"
              className="block w-full bg-transparent"
              style={{
                height: "100%",
                minHeight: FORM_MIN_HEIGHT,
                border: "none",
                background: "transparent",
                colorScheme: "light",
              }}
            />
          </div>
        </div>
      </div>

      <Script
        src="https://api.oasbit.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </Reveal>
  );
}
