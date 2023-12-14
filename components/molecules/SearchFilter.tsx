/** @jsxImportSource @emotion/react */
import {
  ActionIcon,
  Button,
  Modal,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { BiFilter } from "react-icons/bi";

type SearchFilterProps = {
  opened: boolean;
  open: () => void;
  close: () => void;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  additionalFilter?: React.ReactNode;
};

export function SearchFilter(props: SearchFilterProps) {
  const theme = useMantineTheme();
  return (
    <>
      <Tooltip
        label="Filter Pencarian"
        position="bottom"
        withArrow
        arrowSize={6}
      >
        <ActionIcon
          size={32}
          radius="sm"
          variant="filled"
          color={theme.primaryColor}
          onClick={props.open}
          aria-label="Search Filter"
          sx={() => {
            return {
              "@media (max-width: 768px)": {
                width: "90%",
              },
            };
          }}
        >
          <BiFilter size={18} />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={props.opened}
        onClose={props.close}
        title="Filter Pencarian"
        centered
        closeOnClickOutside={false}
        overlayProps={{
          blur: 3,
        }}
      >
        {props.additionalFilter}

        <Button fullWidth onClick={props.close} style={{ marginTop: 10 }}>
          Simpan
        </Button>
      </Modal>
    </>
  );
}
