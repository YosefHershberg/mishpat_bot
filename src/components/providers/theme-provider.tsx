"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(
  () =>
    Promise.resolve(({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => (
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    )),
  {
    ssr: false,
  }
);

export { ThemeProvider };