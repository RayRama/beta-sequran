import {
  Code,
  Group,
  Navbar,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CgFileDocument } from "react-icons/cg";
import { GiComputing } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { LiaInfoCircleSolid } from "react-icons/lia";
import { SiAtom } from "react-icons/si";
import { ThemeToggle } from "./ThemeToggle";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.lg,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  {
    link: "/",
    label: "Beranda",
    icon: GoHome,
  },
  {
    link: "/quantum",
    label: "Quantum",
    icon: SiAtom,
  },
  {
    link: "/ai-search",
    label: "AI Search",
    icon: GiComputing,
  },
];

export const NavbarAtom = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { classes, cx } = useStyles();
  const router = useRouter();

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: router.pathname === item.link,
      })}
      href={item.link}
      key={item.label}
      onClick={() => setOpened((o) => !o)}
      prefetch={false}
    >
      <item.icon className={classes.linkIcon} stroke="1.5" />
      <span>{item.label}</span>
    </Link>
  ));
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow>
        <Image
          src="/vercel.svg"
          width={180}
          height={80}
          alt="Logo"
          loading="lazy"
        />
        <Group className={classes.header} position="apart">
          <Code sx={{ fontWeight: 700 }}>v3.1.3</Code>
          <ThemeToggle />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link href="#" className={classes.link} prefetch={false}>
          <CgFileDocument className={classes.linkIcon} stroke="1.5" />
          <span>Dokumentasi</span>
        </Link>

        <Link href="#" className={classes.link} prefetch={false}>
          <LiaInfoCircleSolid className={classes.linkIcon} stroke="1.5" />
          <span>Info</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
};
