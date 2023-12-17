import { Menu } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  FaBookOpen,
  FaClipboard,
  FaClipboardList,
  FaExternalLinkSquareAlt,
} from "react-icons/fa";
import { LiaInfoCircleSolid } from "react-icons/lia";

interface ToolbarMenuProps {
  children: React.ReactNode;
  index: number;
  queryType: string;
}

export const ToolbarMenu = ({
  children,
  index,
  queryType,
}: ToolbarMenuProps) => {
  const matches = useMediaQuery("(max-width: 480px)");
  const queryClient = useQueryClient();
  let realIndex = index - 1;

  const query: { results: any[] } = queryClient.getQueryData([queryType]) || {
    results: [],
  };

  const showNotification = (err?: any) => {
    notifications.show({
      title: `${err ? "Gagal" : "Berhasil"} disalin`,
      message: `Konten ${err ? "gagal" : "berhasil"} disalin ke clipboard`,
      color: `${err ? "red" : "green"}`,
      withCloseButton: true,
      icon: <FaClipboardList />,
      autoClose: 3000,
    });
  };

  const handleCopyAyat = () => {
    navigator.clipboard
      .writeText(
        `${query?.results[realIndex]?.ayat_key}\n\n${query?.results[realIndex]?.ayat}\n\nSumber: Sequran`
      )
      .then(() => showNotification())
      .catch((err) => {
        showNotification(err);
      });
  };

  const handleCopySemua = () => {
    navigator.clipboard
      .writeText(
        `${query?.results[realIndex]?.ayat_key}\n\n${query?.results[realIndex]?.ayat}\n\n${query?.results[realIndex]?.document}\n\nSumber: Sequran`
      )
      .then(() => showNotification())
      .catch((err) => {
        showNotification(err);
      });
  };

  const handleViewSurat = () => {
    window.open(
      `https://quran.com/${query?.results[realIndex]?.ayat_key}`,
      "_blank"
    );
  };

  return (
    <Menu position={`${matches ? "bottom-end" : "bottom"}`} offset={10}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Toolbar Menu</Menu.Label>
        <Menu.Item icon={<FaClipboard />} onClick={handleCopyAyat}>
          Salin Ayat
        </Menu.Item>
        <Menu.Item icon={<FaClipboardList />} onClick={handleCopySemua}>
          Salin Semua
        </Menu.Item>
        <Menu.Item icon={<FaBookOpen />}>Lihat Tafsir</Menu.Item>
        <Menu.Item icon={<FaExternalLinkSquareAlt />} onClick={handleViewSurat}>
          Lihat Surat
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item icon={<LiaInfoCircleSolid />}>Info Ayat</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
