import { LineCta } from "@/components/ui/LineCta";
import { TransparentImage } from "@/components/ui/TransparentImage";
import { Reveal } from "@/components/motion/Reveal";
import type { WPServiceBlock } from "@/lib/wordpress/types";

interface ServiceBlockProps {
  service: WPServiceBlock;
  imageUrl?: string | null;
  imageAlt?: string;
  index: number;
}

export function ServiceBlock({
  service,
  imageUrl,
  imageAlt = service.title,
  index,
}: ServiceBlockProps) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={service.title.toLowerCase().replace(/\s+/g, "-")}
      className="border-t border-white/10 bg-surface py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
        <Reveal
          variant={reversed ? "slideLeft" : "slideRight"}
          className={reversed ? "lg:order-2" : ""}
        >
          <p className="text-xs tracking-[0.28em] text-accent uppercase">{service.tagline}</p>
          <h2 className="mt-4 font-display text-4xl italic md:text-5xl">{service.title}</h2>
          <p className="mt-6 text-sm leading-8 text-muted md:text-base">{service.body}</p>
          <ul className="mt-8 space-y-3">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-white/85">
                <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <LineCta href="/contact" light>
              Start a conversation
            </LineCta>
          </div>
        </Reveal>

        {imageUrl ? (
          <Reveal
            variant={reversed ? "slideRight" : "slideLeft"}
            delay={0.1}
            className={reversed ? "lg:order-1" : ""}
          >
            <TransparentImage
              src={imageUrl}
              alt={imageAlt}
              className="mx-auto max-w-sm lg:mx-0"
              imageClassName="max-h-[22rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
