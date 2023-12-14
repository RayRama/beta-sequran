import { Box, Center, MediaQuery } from "@mantine/core";
import { BsTranslate } from "react-icons/bs";
import { FaQuran } from "react-icons/fa";
import { FaBookQuran } from "react-icons/fa6";
import { GoTypography } from "react-icons/go";

export const SearchOptions = [
  {
    label: (
      <Center>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <BsTranslate size="1rem" stroke="1.5" style={{ marginRight: 10 }} />
        </MediaQuery>
        <Box>Terjemah</Box>
      </Center>
    ),
    value: "terjemah",
  },
  {
    label: (
      <Center>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <FaQuran size="1rem" stroke="1.5" style={{ marginRight: 10 }} />
        </MediaQuery>
        <Box>Arab</Box>
      </Center>
    ),
    value: "arab",
  },
  {
    label: (
      <Center>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <FaBookQuran size="1rem" stroke="1.5" style={{ marginRight: 10 }} />
        </MediaQuery>
        <Box>Tnp. Harakat</Box>
      </Center>
    ),
    value: "tanpa-harakat",
  },
  {
    label: (
      <Center>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <GoTypography size="1rem" stroke="1.5" style={{ marginRight: 10 }} />
        </MediaQuery>
        <Box>Latin</Box>
      </Center>
    ),
    value: "transliterasi",
  },
];
