import { useQuery } from "@tanstack/react-query";

// type SearchResponse = {
//   results: {
//     nama_surat: string;
//     ayat_key: string;
//     ayat: string;
//     latin: string;
//     terjemah: string;
//   }[];
// };

// interface SearchResponse {
//   results: any[];
// }

export const useLatinSearch = (
  query: string,
  limit: number = 10,
  enable: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return useQuery({
    queryKey: ["latin-search"],
    // initialData: [],
    queryFn: async () => {
      const res = await fetch(
        `/api/latin-search?query=${query}&total=${limit}`,
        // `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}&total=${limit}`,
        { cache: "force-cache" }
      );
      setEnabled(false);
      const response = await res.json();
      return response;
      // return response.results as SearchResponse[] | undefined;
    },
    enabled: enable,
  });
};
