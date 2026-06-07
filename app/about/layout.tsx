import { buildMetadata, pageSeo } from "@/lib/seo";

// The About page is a client component, so its SEO metadata is exported
// from this server-side layout (rendered into the page source).
export const metadata = buildMetadata(pageSeo.about, "/about");

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
