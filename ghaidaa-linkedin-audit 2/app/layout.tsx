import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تقرير تطوير ملف غيداء إمام على لينكدإن",
  description: "تدقيق عربي متقدم من 70 نقطة، ومعيار سوقي، ونصوص وخطة 30/60/90 يومًا لتطوير ملف غيداء إمام على LinkedIn.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
