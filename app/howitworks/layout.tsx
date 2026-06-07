import { buildMetadata, pageSeo } from "@/lib/seo";

// The How We Work page is a client component, so its SEO metadata is
// exported from this server-side layout (rendered into the page source).
export const metadata = buildMetadata(pageSeo.howWeWork, "/howitworks");

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
