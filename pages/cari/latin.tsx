/** @jsxImportSource @emotion/react */
import { SkeletonCustom } from "@/components/atoms/SkeletonCustom";
import { Content } from "@/components/molecules/Content";
// import { Searchbar } from "@/components/molecules/Searchbar";
// import { SearchFilter } from "@/components/molecules/SearchFilter";
import { useLatinSearch } from "@/helper/hooks/useLatinSearch";
import { css } from "@emotion/react";
import { Loader, NumberInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const Group = dynamic(() => import("@mantine/core").then((mod) => mod.Group), {
  ssr: false,
  loading: () => <Loader variant="dots" />,
});

const Searchbar = dynamic(
  () => import("@/components/molecules/Searchbar").then((mod) => mod.Searchbar),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const SearchFilter = dynamic(
  () =>
    import("@/components/molecules/SearchFilter").then(
      (mod) => mod.SearchFilter
    ),
  { ssr: false, loading: () => <Loader variant="dots" /> }
);

const Latin: NextPage = () => {
  const [search, setSearch] = React.useState<string>("");
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [limit, setLimit] = React.useState<number>(20);

  const randomPlaceholder = [
    "Lil muttaqin",
    "Masna wa sulasa wa ruba",
    "Ihdinas siratal mustaqim",
    "Alyaumma akmaltu lakum dinakum",
    "Ya ayyuhal ladzina amanu",
  ];

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const total = searchParams.get("total");

  const { data, isError, isFetching } = useLatinSearch(
    search,
    total,
    enabled,
    setEnabled
  );
  // const { data, isError, isFetching } = useLatinSearch(
  //   search,
  //   limit,
  //   enabled,
  //   setEnabled
  // );

  React.useEffect(() => {
    if (query) {
      setSearch(query);
      setEnabled(true);
    }

    return () => {};
  }, [query]);

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
          marginTop: "1rem",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Searchbar
          css={css`
            width: 35%;
            @media (max-width: 768px) {
              width: 90%;
            }
          `}
          defaultValue={search}
          placeholder={randomPlaceholder[Math.floor(Math.random() * 5)]}
          // onChange={(e) => handleSubmit(e.currentTarget.value)}
          onChange={(e) => setSearch(e.currentTarget.value)}
          setter={setEnabled}
        />
        <SearchFilter
          opened={opened}
          open={open}
          close={close}
          limit={limit}
          setLimit={setLimit}
          additionalFilter={
            <>
              <Text size="sm" style={{ marginBottom: 10, marginTop: 10 }}>
                Hasil yang ditampilkan
              </Text>
              <NumberInput
                placeholder="Number input"
                defaultValue={limit}
                min={10}
                max={30}
                onChange={(value) => setLimit(Number(value))}
              />
            </>
          }
        />
      </Group>

      {isFetching && <SkeletonCustom />}
      {/* <SkeletonCustom /> */}
      {isError && (
        <div style={{ textAlign: "center" }}>
          Error: Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.
        </div>
      )}
      {/* Tampilkan data yang diterima dari server */}
      {!isFetching && data && Array.isArray(data.results) && (
        <div>
          <Text align="center">
            Menampilkan {data.results.length} hasil pencarian yang relevan
            dengan kata kunci
          </Text>
          {data?.results.map((item: any, index: number) => (
            <Content
              key={index}
              no={index + 1}
              verse={item.ayat_key}
              translation={item.terjemah}
              latin={item.latin}
              ayat={item.ayat}
              queryType="latin-search"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Latin;
