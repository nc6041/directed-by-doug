import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <>
      <Hero />
      {/* In the design the grid starts 67px above the bottom of the hero */}
      <section id="work" aria-labelledby="work-heading" className="relative mx-gutter-sm -mt-[67px] scroll-mt-8 md:mx-gutter">
        <h2 id="work-heading" className="sr-only">
          Work
        </h2>
        <ProjectGrid />
      </section>
    </>
  );
}
