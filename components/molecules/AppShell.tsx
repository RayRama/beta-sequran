import { Loader, useMantineTheme } from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import dynamic from "next/dynamic";

const AppShellComponent = dynamic(
  () => import("@mantine/core").then((mod) => mod.AppShell),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const NavbarAtom = dynamic(
  () => import("../atoms/NavbarAtom").then((mod) => mod.NavbarAtom),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const Header = dynamic(
  () => import("../atoms/Header").then((mod) => mod.Header),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const theme = useMantineTheme();
  const matches = useMediaQuery("(max-width: 480px)");
  const [opened, setOpened] = React.useState(false);

  return (
    <AppShellComponent
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarAtom opened={opened} setOpened={setOpened} />}
      {...(matches && {
        header: <Header opened={opened} setOpened={setOpened} theme={theme} />,
      })}
    >
      {children}
    </AppShellComponent>
  );
};
