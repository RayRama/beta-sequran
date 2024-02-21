"use client";

import { NextPage } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const Index: NextPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const total = searchParams.get("total");
  const { replace, push } = useRouter();
  const { pathname } = usePathname();

  function handleSearch(q: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", q);
    params.set("total", "100");

    push({
      pathname,
      query: params.toString(),
    });
  }

  if (!query) {
    //
  } else {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <input
        type="text"
        defaultValue={query}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.currentTarget.value);
          }
        }}
      />
      <p>Total: {total}</p>
      <p>Query: {query}</p>
    </div>
  );
};

export default Index;
