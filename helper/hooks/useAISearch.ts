import { useQuery } from "@tanstack/react-query";

// type SearchResponse = {
//   results: {
//     score: number;
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

export const useAISearch = (
  query: string,
  limit: number = 20,
  enable: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return useQuery({
    queryKey: ["ai-search"],
    initialData: [],
    queryFn: async () => {
      const res = await fetch(
        `/api/ai-search?query=${query}&total=${limit}`,
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
