"use client";

import { ThemeProvider } from "next-themes";

export function NextThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: 'dark' | 'light';
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme}>
      {children}
    </ThemeProvider>
  );
}
