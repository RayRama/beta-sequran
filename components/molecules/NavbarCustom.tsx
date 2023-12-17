import { navbarLinks } from "@/helper/constants/navbarLinks";
import { useStyles } from "@/styles/NavbarCustom.styles";
import { Code, Group, NavLink, Navbar } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { CgFileDocument } from "react-icons/cg";
import { LiaInfoCircleSolid } from "react-icons/lia";
import { NavbarLink } from "../atoms/NavbarLink";
import { ThemeToggle } from "../atoms/ThemeToggle";
// import classes from "@/styles/NavbarAtom.module.css";

export const NavbarCustom = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { classes } = useStyles();

  const links = navbarLinks.map((item) => (
    <NavbarLink
      key={item.label}
      items={item}
      setOpened={setOpened}
    ></NavbarLink>
  ));
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 280 }}
    >
      <Navbar.Section grow>
        <Image
          src="/vercel.svg"
          width={180}
          height={80}
          alt="Logo"
          // loading="lazy"
          priority
        />
        <Group className={classes.header} position="apart">
          <Code sx={{ fontWeight: 700 }}>v3.1.4</Code>
          <ThemeToggle />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <NavLink
          component={Link}
          href="https://google.com"
          target="_blank"
          className={classes.link}
          prefetch={false}
          icon={<CgFileDocument className={classes.linkIcon} stroke="1.5" />}
          label="Dokumentasi"
        ></NavLink>

        <NavLink
          component={Link}
          href="https://google.com"
          target="_blank"
          className={classes.link}
          prefetch={false}
          label="Info"
          icon={
            <LiaInfoCircleSolid className={classes.linkIcon} stroke="1.5" />
          }
        ></NavLink>
      </Navbar.Section>
    </Navbar>
  );
};
