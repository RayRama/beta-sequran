// import { AppShell } from "@/components/molecules/AppShell";
import { RouterTransition } from "@/components/ui/RouterTransition";
import {
  ColorScheme,
  ColorSchemeProvider,
  Loader,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";

const AppShell = dynamic(
  () => import("@/components/molecules/AppShell").then((mod) => mod.AppShell),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <AppShell>
            <RouterTransition />
            <Component {...pageProps} />
          </AppShell>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
