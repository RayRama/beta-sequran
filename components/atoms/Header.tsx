import {
  Burger,
  Header as HeaderComponent,
  MediaQuery,
  Text,
} from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import React from "react";

export const Header = ({
  opened,
  setOpened,
  theme,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  theme: any;
}) => {
  const headRoom = useHeadroom({ fixedAt: 160 });
  return (
    <>
      <HeaderComponent
        height={{ base: 50 }}
        p="md"
        // sx={() => ({
        //   transform: `translate3d(0, ${headRoom ? 0 : "-3.4rem"}, 0)`,
        //   transition: "transform 400ms ease",
        // })}
        {...(opened === false && {
          sx: {
            transform: `translate3d(0, ${headRoom ? 0 : "-3.4rem"}, 0)`,
            transition: "transform 400ms ease",
          },
        })}
      >
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="md"
              />
              <Text size="xl" weight={700}>
                SEQURAN
              </Text>
            </div>
          </MediaQuery>
        </div>
      </HeaderComponent>
    </>
  );
};
