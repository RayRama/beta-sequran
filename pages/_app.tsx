// import { AppShell } from "@/components/molecules/AppShell";
import { RouterTransition } from "@/components/ui/RouterTransition";
import { css } from "@emotion/react";
import {
  ColorScheme,
  ColorSchemeProvider,
  Loader,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AppShell = dynamic(
  () => import("@/components/molecules/AppShell").then((mod) => mod.AppShell),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const ActionIconCustom = dynamic(
  () => import("@mantine/core").then((mod) => mod.ActionIcon),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const [hidden, setHidden] = React.useState(false); // For toggle the navbar on desktop

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
          <Notifications position="top-center" zIndex={999} />
          <AppShell hiddenNav={hidden}>
            <ActionIconCustom
              title="Toggle Navbar"
              onClick={() => setHidden(!hidden)}
              css={css`
                position: fixed;
                top: 50%;
                // left: ${!hidden ? "20%" : "0"};
                z-index: 3;
                // margin-left: 1rem;
                transition: all 0.3s ease-in-out;
                opacity: 0.5;

                &:hover {
                  opacity: 1;
                }

                @media (max-width: 768px) {
                  display: none;
                }
              `}
            >
              {hidden === true ? <FaChevronRight /> : <FaChevronLeft />}
            </ActionIconCustom>
            <RouterTransition />
            <Component {...pageProps} />
          </AppShell>
          {/* <Component {...pageProps} /> */}
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
    // <QueryClientProvider client={queryClient}>
    //   <Component {...pageProps} />
    // </QueryClientProvider>
  );
};

export default App;
