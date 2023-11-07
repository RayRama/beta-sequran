import { ActionIcon, Text, createStyles, rem } from "@mantine/core";
import { IoIosMore } from "react-icons/io";
import { ToolbarMenu } from "../atoms/ToolbarMenu";
import styled from "@emotion/styled";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    padding: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
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

const ArabicContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // gap: ${({ theme }) => theme.spacing.md};
  gap: 1rem;

  @font-face {
    font-family: "Quran";
    src: url(fonts/quran-font.otf) format(opentype);
  }

  .quran-text {
    font-family: "Quran";
    font-size: ${rem(28)};
  }
`;

export const Content = () => {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.toolbar}>
          <Text size="md">No: 1</Text>
          <Text size="md">2:282</Text>
          <ToolbarMenu>
            <ActionIcon
              variant="filled"
              radius="xl"
              size="md"
              aria-label="Toolbar Menu"
            >
              <IoIosMore size="1.1rem" stroke="1.5" />
            </ActionIcon>
          </ToolbarMenu>
        </div>
        <ArabicContent>
          <Text dir="rtl" className="quran-text" align="justify">
            ۞ وَإِن كُنتُمْ عَلَىٰ سَفَرٍ وَلَمْ تَجِدُوا۟ كَاتِبًا فَرِهَـٰنٌ
            مَّقْبُوضَةٌ ۖ فَإِنْ أَمِنَ بَعْضُكُم بَعْضًا فَلْيُؤَدِّ ٱلَّذِى
            ٱؤْتُمِنَ أَمَـٰنَتَهُۥ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ ۗ وَلَا
            تَكْتُمُوا۟ ٱلشَّهَـٰدَةَ ۚ وَمَن يَكْتُمْهَا فَإِنَّهُۥٓ ءَاثِمٌ
            قَلْبُهُۥ ۗ وَٱللَّهُ بِمَا تَعْمَلُونَ عَلِيمٌ
          </Text>
          <Text align="justify">
            Dan jika kamu dalam perjalanan sedang kamu tidak mendapatkan seorang
            penulis, maka hendaklah ada barang jaminan yang dipegang. Tetapi,
            jika sebagian kamu mempercayai sebagian yang lain, hendaklah yang
            dipercayai itu menunaikan amanatnya (utangnya) dan hendaklah dia
            bertakwa kepada Allah, Tuhannya. Dan janganlah kamu menyembunyikan
            kesaksian, karena barangsiapa menyembunyikannya, sungguh, hatinya
            kotor (berdosa). Allah Maha Mengetahui apa yang kamu kerjakan.
          </Text>
        </ArabicContent>
      </div>
    </div>
  );
};
