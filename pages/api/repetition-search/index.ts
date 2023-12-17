import { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// define the handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get the query from the request
  const { focus, query, total } = req.query;
  let results: any[] = [];
  const focusOn: any[] = ["terjemah", "ayat", "latin"];

  if (!query) {
    return res.status(400).json({ error: "No query provided" });
  }

  if (!total) {
    return res.status(400).json({ error: "No total provided" });
  }

  if (!focus) {
    return res.status(400).json({ error: "No focus provided" });
  } else if (!focusOn.includes(focus)) {
    return res.status(400).json({ error: "Invalid focus provided" });
  }

  if (query.length <= 3) {
    return res
      .status(400)
      .json({ error: "Query must be at least 4 characters long" });
  }

  // get the results from the client

  await fetch(
    `${API_URL}/repetisi/search?focus=${focus}&query=${query}&total=${total}`,
    {
      cache: "force-cache",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
    });

  // return the results
  res.status(200).json(results);
}
