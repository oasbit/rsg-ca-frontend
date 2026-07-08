import Image from "next/image";
import { cn } from "@/lib/utils";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

/** Display a transparent PNG/WebP cutout without a backing panel or crop frame. */
export function TransparentImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 1024px) 90vw, 40vw",
}: TransparentImageProps) {
  return (
    <div className={cn("relative flex items-end justify-center", className)}>
      <Image
        src={src}
        alt={alt}
        width={614}
        height={1024}
        priority={priority}
        className={cn(
          "h-auto w-full max-w-md object-contain object-bottom",
          imageClassName,
        )}
        sizes={sizes}
      />
    </div>
  );
}
