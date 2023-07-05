import { Menu } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import {
  FaClipboard,
  FaClipboardList,
  FaBookOpen,
  FaExternalLinkSquareAlt,
} from "react-icons/fa";
import { LiaInfoCircleSolid } from "react-icons/lia";

interface ToolbarMenuProps {
  children: React.ReactNode;
}

export const ToolbarMenu = ({ children }: ToolbarMenuProps) => {
  const matches = useMediaQuery("(max-width: 480px)");
  return (
    <Menu position={`${matches ? "bottom-end" : "bottom"}`} offset={10}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Toolbar Menu</Menu.Label>
        <Menu.Item icon={<FaClipboard />}>Salin Ayat</Menu.Item>
        <Menu.Item icon={<FaClipboardList />}>Salin Semua</Menu.Item>
        <Menu.Item icon={<FaBookOpen />}>Lihat Tafsir</Menu.Item>
        <Menu.Item icon={<FaExternalLinkSquareAlt />}>Lihat Surat</Menu.Item>

        <Menu.Divider />
        <Menu.Item icon={<LiaInfoCircleSolid />}>Info Ayat</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
