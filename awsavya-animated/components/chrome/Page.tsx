import { ViewTransition } from "react";
import { RouteFocus } from "./RouteFocus";

/**
 * Wraps every page. "deliver" navigations flood the new page out of the clicked row; back/forward
 * and Motion Off use a 0.18s crossfade. Dynamic routes pass key={slug} so a param change is exit + enter.
 */
export function Page({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <ViewTransition enter={{ deliver: "deliver-in", default: "quick-in" }} exit={{ deliver: "deliver-out", default: "quick-out" }} default="none">
      <div className="page" data-page={id}>{children}<RouteFocus /></div>
    </ViewTransition>
  );
}
