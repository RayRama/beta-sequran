import { BiSearch } from "react-icons/bi";
import { BsRepeat } from "react-icons/bs";
import { GoHome, GoTypography } from "react-icons/go";
import { IoIosGitBranch } from "react-icons/io";

interface navbarLinkInterface {
  link: string;
  label: string;
  icon: React.ElementType;
  nestedLink?: {
    link: string;
    label: string;
    icon: React.ElementType;
  }[];
}

export const navbarLinks: navbarLinkInterface[] = [
  {
    link: "/",
    label: "Beranda",
    icon: GoHome,
  },
  {
    link: "/cari",
    label: "Cari",
    icon: BiSearch,
    nestedLink: [
      {
        link: "/cari/repetisi",
        label: "Repetisi",
        icon: BsRepeat,
      },
      {
        link: "/cari/latin",
        label: "Latin",
        icon: GoTypography,
      },
    ],
  },
  {
    link: "/akarkata",
    label: "Akar Kata",
    icon: IoIosGitBranch,
  },
];
