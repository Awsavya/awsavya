import type { Project } from "@/lib/site";
import { DeviceFrame } from "./DeviceFrame";
import { ui } from "./sample-data";
import { Build2BuzzScreen } from "./screens/Build2BuzzScreen";
import { HarApparelsScreen } from "./screens/HarApparelsScreen";
import { QuicklyCartScreen } from "./screens/QuicklyCartScreen";
import { TripSplitScreen } from "./screens/TripSplitScreen";

function Screen({ project }: { project: Project }) {
  switch (project.slug) {
    case "tripsplit": return <TripSplitScreen project={project} />;
    case "build2buzz": return <Build2BuzzScreen project={project} />;
    case "har-apparels": return <HarApparelsScreen project={project} />;
    case "quicklycart": return <QuicklyCartScreen project={project} />;
  }
}

/** A project's drawn device with its sample screen, all states rendered. Place it inside a .work-state. */
export function ProjectDevice({ project, className }: { project: Project; className?: string }) {
  return (
    <DeviceFrame kind={project.frame} product={project.name} className={[`work-device--${project.slug}`, className].filter(Boolean).join(" ")}
      label={ui.device(project.name, project.states.map(s => s.label))}>
      <Screen project={project} />
    </DeviceFrame>
  );
}
