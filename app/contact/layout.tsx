import Script from "next/script";

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script src="https://portal-thyleads.com/api/inbound/script?k=hv_site_ShCyzJZChPm-9DiCxpleMw" strategy="afterInteractive" />
      {children}
    </>
  );
}
