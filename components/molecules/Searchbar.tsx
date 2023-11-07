import {
  ActionIcon,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

export function Searchbar(
  props: TextInputProps & {
    setter: React.Dispatch<React.SetStateAction<boolean>>;
  }
) {
  const theme = useMantineTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <TextInput
      icon={<BiSearch size="1.1rem" stroke="1.5" />}
      ref={inputRef}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={() => {
            props.setter((o) => !o);
          }}
          aria-label="Search"
        >
          <BsArrowRight size="1.1rem" stroke="1.5" />
        </ActionIcon>
      }
      placeholder="Search questions"
      rightSectionWidth={42}
      {...props}
    />
  );
}
