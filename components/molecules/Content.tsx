import styled from "@emotion/styled";
import { ActionIcon, Text, Tooltip, createStyles, rem } from "@mantine/core";
import { IoIosMore } from "react-icons/io";
import { ToolbarMenu } from "../atoms/ToolbarMenu";

interface ContentProps {
  no?: number;
  verse?: string;
  ayat?: string;
  translation?: string;
  latin?: string;
  queryType?: string;
}
const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    padding: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
    [theme.fn.largerThan("sm")]: {
      flexDirection: "row",
      gap: 0,
    },
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.fn.largerThan("sm")]: {
      flexDirection: "column",
      width: "10%",
      gap: theme.spacing.md,
      justifyContent: "flex-start",
    },
  },
}));

// gap: ${({ theme }) => theme.spacing.md};
const QuranContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  @font-face {
    font-family: "Quran";
    src: url(fonts/quran-font.otf) format(opentype);
  }

  .quran-text {
    font-family: "Quran";
    font-size: ${rem(28)};
    width: 100%;
  }

  .translation-text {
    font-size: ${rem(16)};
    width: 100%;
  }

  .latin-text {
    font-size: ${rem(14)};
    width: 100%;
  }
`;

export const Content = ({
  no = 0,
  verse = "1:1",
  ayat = "ayat",
  translation = "terjemah",
  latin = "latin",
  queryType = "ai-search",
}: ContentProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.toolbar}>
          <Text size="md">{`No: ${no}`}</Text>
          <Text size="md">{verse}</Text>
          <ToolbarMenu index={no} queryType={queryType}>
            <Tooltip label="More" position="bottom" withArrow arrowSize={6}>
              <ActionIcon
                variant="filled"
                radius="xl"
                size="md"
                aria-label="Toolbar Menu"
              >
                <IoIosMore size="1.1rem" stroke="1.5" />
              </ActionIcon>
            </Tooltip>
          </ToolbarMenu>
        </div>
        <QuranContent>
          <Text dir="rtl" className="quran-text" align="justify">
            {ayat}
          </Text>
          {latin !== "latin" && (
            <Text
              fs={"italic"}
              dir="rtl"
              className="latin-text"
              align="justify"
            >
              {latin}
            </Text>
          )}
          <Text className="translation-text" align="justify">
            {translation}
          </Text>
        </QuranContent>
      </div>
    </div>
  );
};
