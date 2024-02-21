import {
  ActionIcon,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

export function Searchbar(
  props: TextInputProps & {
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    placeholder?: string;
  }
) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const total = searchParams.get("total");
  const focusOn = searchParams.get("focusOn");

  const { push } = useRouter();
  const { pathname } = usePathname();

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
    const params = new URLSearchParams();

    if (inputRef.current?.value.length <= 3) {
      return notificationError("Kata kunci harus lebih dari 3 huruf");
    }
    props.setter((prev) => !prev);
    inputRef.current?.blur();
    params.set("query", inputRef.current?.value);

    push({
      pathname,
      query: params.toString(),
    });
  };

  React.useEffect(() => {
    if (inputRef.current?.value.length > 100) {
      return notificationError("Kata kunci tidak boleh lebih dari 100 huruf");
    }

    return () => {};
  }, [inputRef.current?.value.length]);

  React.useEffect(() => {
    if (query) {
      inputRef.current!.value = query;
    }

    return () => {};
  }, [query]);

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
      maxLength={100}
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
      placeholder={props.placeholder}
      rightSectionWidth={42}
      {...props}
    />
  );
}
