import { NavLink, createStyles, getStylesRef } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.xl,
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

export const NavbarLink = ({ items, setOpened }) => {
  const { classes, cx } = useStyles();
  const router = useRouter();
  return (
    <>
      <NavLink
        className={cx(classes.link, {
          [classes.linkActive]: router.pathname === items.link,
        })}
        href={items.link}
        component={Link}
        {...(!items.nestedLink && { onClick: () => setOpened((o) => !o) })}
        label={items.label}
        icon={<items.icon className={classes.linkIcon} stroke="1.5" />}
        prefetch={false}
        childrenOffset={20}
        defaultOpened
      >
        {items.nestedLink?.map((nested, index) => (
          <NavLink
            className={cx(classes.link, {
              [classes.linkActive]: router.pathname === nested.link,
            })}
            key={index}
            label={nested.label}
            component={Link}
            href={nested.link}
            prefetch={false}
            onClick={() => setOpened((o) => !o)}
            icon={<nested.icon className={classes.linkIcon} stroke="1.5" />}
          ></NavLink>
        ))}
      </NavLink>
    </>
  );
};
