import { formatPhone } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { WPSocialLink } from "@/lib/wordpress/types";

interface ContactInfoProps {
  phone: string;
  email: string;
  address: string;
  socialLinks: WPSocialLink[];
}

export function ContactInfo({
  phone,
  email,
  address,
  socialLinks,
}: ContactInfoProps) {
  return (
    <Reveal variant="slideRight" className="text-white">
      <SectionLabel light>Get in touch</SectionLabel>

      <ul className="mt-10 space-y-8">
        <li>
          <p className="text-xs tracking-[0.28em] text-muted uppercase">Phone</p>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="mt-2 block text-lg transition-colors duration-300 ease-out hover:text-accent"
          >
            {formatPhone(phone)}
          </a>
        </li>
        <li>
          <p className="text-xs tracking-[0.28em] text-muted uppercase">Email</p>
          <a
            href={`mailto:${email}`}
            className="mt-2 block text-lg transition-colors duration-300 ease-out hover:text-accent"
          >
            {email}
          </a>
        </li>
        <li>
          <p className="text-xs tracking-[0.28em] text-muted uppercase">Address</p>
          <p className="mt-2 max-w-sm text-sm leading-7 text-white/85">{address}</p>
        </li>
      </ul>

      {socialLinks.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-[0.22em] text-muted uppercase transition-colors duration-300 ease-out hover:text-accent"
            >
              {link.platform}
            </a>
          ))}
        </div>
      )}
    </Reveal>
  );
}
