"use client";

import parse from "html-react-parser";
import { Reveal } from "@/components/motion/Reveal";

interface PrivacyContentProps {
  body: string;
}

export function PrivacyContent({ body }: PrivacyContentProps) {
  return (
    <Reveal variant="fadeUp" delay={0.1} className="prose-legal">
      {parse(body)}
    </Reveal>
  );
}
