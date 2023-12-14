import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

type SearchResponse = {
  verse_key: string;
  document: string;
  similarity_score: number;
};

export const useAISearch = (
  query: string,
  limit: number = 10,
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
      return response as SearchResponse[] | undefined;
      // return response.results as SearchResponse[] | undefined;
    },
    enabled: enable,
  });
};
