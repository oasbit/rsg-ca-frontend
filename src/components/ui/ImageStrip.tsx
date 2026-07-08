import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageStripProps {
  images: Array<{ src: string; alt: string }>;
  className?: string;
}

export function ImageStrip({ images, className }: ImageStripProps) {
  const displayImages =
    images.length >= 3
      ? images.slice(0, 3)
      : [
          ...images,
          ...Array.from({ length: 3 - images.length }, (_, index) => ({
            src: images[0]?.src ?? "",
            alt: images[0]?.alt ?? "RS Group",
            key: `placeholder-${index}`,
          })),
        ];

  return (
    <div className={cn("grid grid-cols-1 gap-1 md:grid-cols-3", className)}>
      {displayImages.map((image, index) => (
        <div key={`${image.src}-${index}`} className="relative aspect-[4/5] overflow-hidden">
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-surface" />
          )}
        </div>
      ))}
    </div>
  );
}
