import { about, projects, services, site } from "@/lib/site";

// /llms.txt (llmstxt.org): a plain summary for AI tools, built from lib/site.ts so it never drifts from the pages.
// Google says it does not use this file; other tools may. It repeats only what the pages say.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    about.meaning,
    "",
    "The four products below are the founders' own built projects, not client work. Product previews on the site are redrawn in code with sample data.",
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/): what AWSAVYA builds, the four built projects and the services`,
    `- [About](${site.url}/about): who runs AWSAVYA, what the name means, how we work, common questions`,
    `- [Work](${site.url}/work): the four built projects`,
    `- [Services](${site.url}/services): the four kinds of work we take on`,
    `- [Contact](${site.url}/contact): send a brief`,
    "",
    "## Built projects",
    "",
    ...projects.map(p => `- [${p.name}](${site.url}/work/${p.slug}): ${p.oneLine}`),
    "",
    "## Services",
    "",
    ...services.map(s => `- [${s.name}](${site.url}/services/${s.slug}): ${s.short}`),
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- Brief form: ${site.url}/contact`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
