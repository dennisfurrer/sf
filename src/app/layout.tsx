import type { ReactNode } from "react";

// This root layout is needed for the redirect to work with next-intl
// The actual layout with providers is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
