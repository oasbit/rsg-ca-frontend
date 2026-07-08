import { TransparentImage } from "@/components/ui/TransparentImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

interface FounderProfileProps {
  name: string;
  title: string;
  bio: string;
  imageUrl: string | null;
  imageAlt: string;
}

export function FounderProfile({
  name,
  title,
  bio,
  imageUrl,
  imageAlt,
}: FounderProfileProps) {
  return (
    <section className="bg-surface py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-center lg:px-10">
        <Reveal variant="slideRight" className="lg:col-span-5">
          {imageUrl ? (
            <TransparentImage
              src={imageUrl}
              alt={imageAlt}
              className="mx-auto max-w-sm lg:mx-0"
              imageClassName="drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
            />
          ) : null}
        </Reveal>

        <Reveal variant="fadeUp" delay={0.12} className="lg:col-span-7">
          <SectionLabel light>Meet</SectionLabel>
          <h2 className="mt-4 font-display text-4xl italic md:text-5xl">{name}</h2>
          <p className="mt-2 text-sm tracking-[0.2em] text-accent uppercase">{title}</p>
          <p className="mt-8 max-w-2xl text-sm leading-8 text-muted md:text-base">{bio}</p>
        </Reveal>
      </div>
    </section>
  );
}
