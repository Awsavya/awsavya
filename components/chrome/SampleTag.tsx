/** "SAMPLE DATA" in the data face, outlined. Every sample value on the site sits next to one. */
export function SampleTag({ children = "Sample data" }: { children?: string }) {
  return <span className="sample-tag">{children}</span>;
}
