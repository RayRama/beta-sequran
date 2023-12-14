"use client";
import {
  ActionIcon,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

export function SearchBar(
  props: TextInputProps & {
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolder?: string;
  }
) {
  const theme = useMantineTheme();
  const inputRef = React.useRef<HTMLInputElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  const notificationError = (message = "Error") => {
    notifications.show({
      title: "Kata kunci tidak valid",
      message: message,
      color: "red",
      withCloseButton: true,
      icon: <BsArrowRight />,
      autoClose: 3000,
    });
  };

  const submitInput = () => {
    if (inputRef.current?.value.length <= 3) {
      return notificationError("Kata kunci harus lebih dari 3 huruf");
    }
    props.setter((prev) => !prev);
    inputRef.current?.blur();
  };

  React.useEffect(() => {
    if (inputRef.current?.value.length == 30) {
      return notificationError("Kata kunci tidak boleh lebih dari 30 huruf");
    }

    return () => {};
  }, [inputRef.current?.value.length]);

  return (
    <TextInput
      autoFocus
      type="search"
      icon={<BiSearch size="1.1rem" stroke="1.5" />}
      ref={inputRef}
      required
      radius="sm"
      size="md"
      minLength={3}
      maxLength={30}
      rightSection={
        <ActionIcon
          size={32}
          radius="sm"
          color={theme.primaryColor}
          variant="filled"
          onClick={() => submitInput()}
          aria-label="Search"
        >
          <BsArrowRight size="1.1rem" stroke="1.5" />
        </ActionIcon>
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          submitInput();
        }
      }}
      placeholder={props.placeHolder}
      rightSectionWidth={42}
      {...props}
    />
  );
}
