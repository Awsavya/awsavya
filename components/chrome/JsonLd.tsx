/**
 * Structured data for search and answer engines. Render it as the LAST child of <Page>, so the first Section
 * stays the page's first child (the first-load H1 landing keys on that). React does not warn about it:
 * application/ld+json is a data block, not a script it would try to run.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
