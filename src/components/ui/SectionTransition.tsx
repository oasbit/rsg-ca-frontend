/** Visual bridge from a PageHero into the next section — no content, gradient only. */
export function SectionTransition() {
  return (
    <div
      className="h-20 bg-gradient-to-b from-black to-surface md:h-28 lg:h-32"
      aria-hidden="true"
    />
  );
}
