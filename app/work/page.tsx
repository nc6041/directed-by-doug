import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "Short films and projects directed by Doug Truong.",
};

export default function WorkPage() {
  return (
    <div className="mx-gutter-sm pt-28 md:mx-gutter md:pt-40">
      <h1 className="font-label text-[48px] leading-none md:text-[72px]">Work</h1>
      <div className="mt-10 md:mt-14">
        <ProjectGrid priorityCount={2} />
      </div>
    </div>
  );
}
