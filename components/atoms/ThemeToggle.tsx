import {
  Box,
  Center,
  Group,
  SegmentedControl,
  useMantineColorScheme,
} from "@mantine/core";
import { GoMoon, GoSun } from "react-icons/go";

export const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <SegmentedControl
        value={colorScheme}
        onChange={(value: "light" | "dark") => toggleColorScheme(value)}
        fullWidth
        data={[
          {
            value: "light",
            label: (
              <Center>
                <GoSun size="1rem" stroke="1.5" />
                {/* <Box ml={10}>Light</Box> */}
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <GoMoon size="1rem" stroke="1.5" />
                {/* <Box ml={10}>Dark</Box> */}
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};
