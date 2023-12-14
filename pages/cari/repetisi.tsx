/** @jsxImportSource @emotion/react */
import { SearchOptions } from "@/components/atoms/SearchOptions";
import { Content } from "@/components/molecules/Content";
import { SearchFilter } from "@/components/molecules/SearchFilter";
// import { Content } from "@/components/molecules/Content";
// import { Searchbar } from "@/components/molecules/Searchbar";
import { css } from "@emotion/react";
import { Loader, NumberInput, Skeleton, Text } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Group = dynamic(() => import("@mantine/core").then((mod) => mod.Group), {
  ssr: false,
  loading: () => <Loader variant="dots" />,
});

const SegmentedControl = dynamic(
  () => import("@mantine/core").then((mod) => mod.SegmentedControl),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const SearchBar = dynamic(
  () => import("@/components/molecules/SearchBar").then((mod) => mod.SearchBar),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

type SearchData = {
  verse_key: string;
  document: string;
  similarity_score: number;
};

const Repetisi: NextPage = () => {
  const [search, setSearch] = React.useState<string>("");
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [limit, setLimit] = React.useState<number>(10);

  const randomPlaceholder = ["Iman", "Takwa", "Allah", "Muhammad", "Puasa"];

  async function searchData(searchTerm: string): Promise<SearchData> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?query=${searchTerm}&total=${limit}`,
      {
        cache: "force-cache",
      }
    );
    const data = await res.json();
    setEnabled(false);
    return data.results;
  }

  // const debouncedSearchTerm = useDebounce(search, 1000);

  const { data, isError, error, isFetching } = useQuery<
    SearchData, // Menggunakan tipe SearchData sebagai tipe generic
    Error
  >({
    queryKey: ["search", useDebouncedValue(search, 200)] as const, // Menyesuaikan tipe argumen queryKey
    queryFn: () => searchData(search),
    enabled: enabled,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 15px;
      `}
    >
      <Head>
        <title>Sequran - Mesin Pencari Quran</title>
        <meta name="description" content="Generated by Create Next Stack." />
      </Head>

      <Group
        position="center"
        style={{
          width: "100%",
          marginTop: "10px",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SearchBar
          css={css`
            width: 35%;
            @media (max-width: 768px) {
              width: 90%;
            }
          `}
          defaultValue={search}
          placeHolder={randomPlaceholder[Math.floor(Math.random() * 5)]}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setEnabled(true);
            }
          }}
          setter={setEnabled}
        />
        {/* <SegmentedControl fullWidth data={SearchOptions} /> */}
        <SearchFilter
          opened={opened}
          open={open}
          close={close}
          limit={limit}
          setLimit={setLimit}
          additionalFilter={
            <>
              <Text size="sm" style={{ marginBottom: 10 }}>
                Fokus
              </Text>
              <SegmentedControl fullWidth data={SearchOptions} />
              <Text size="sm" style={{ marginBottom: 10, marginTop: 10 }}>
                Hasil yang ditampilkan
              </Text>
              <NumberInput
                placeholder="Number input"
                defaultValue={limit}
                min={10}
                max={30}
                onChange={(value) => setLimit(value)}
              />
            </>
          }
        />
      </Group>

      {isFetching && (
        <Skeleton height={100} width="100%" visible style={{ margin: 10 }} />
      )}
      {isError && <div>Error: {error?.message}</div>}
      {/* Tampilkan data yang diterima dari server */}
      {data && Array.isArray(data) && (
        <div>
          {data?.map((item: any, index: number) => (
            <Content
              key={index}
              no={index + 1}
              verse={item.verse_key}
              translation={item.document}
              ayat={item.ayat}
            />
          ))}
        </div>
      )}
      {/* <Content /> */}
    </div>
  );
};

export default Repetisi;