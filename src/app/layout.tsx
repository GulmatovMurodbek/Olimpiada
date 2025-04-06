"use client";
import "./styles/globals.css";
import "../lib/i18n";
import ThemeProvider from "@/components/theme-provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tj">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disabconstransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
