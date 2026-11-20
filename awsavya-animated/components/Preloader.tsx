import type { CSSProperties } from "react";

// Pure CSS intro on every full page load (never on in-app navigation, because the root layout persists).
// It plays and removes itself even before JavaScript loads, so content is never trapped behind it.

export function Preloader() {
  return <div className="preloader" aria-hidden="true">
    <div className="preloader-meta"><span>AWSAVYA / Digital universe</span><span>Loading experience</span></div>
    <div className="preloader-word">{"AWSAVYA".split("").map((letter, index) => <span key={index} style={{ "--i": index } as CSSProperties}>{letter}</span>)}</div>
    <div className="preloader-meta"><span>Ideas made alive</span><span className="preloader-count" /></div>
    <div className="preloader-bar" />
  </div>;
}
