import React from "react";

import { UseState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const getKeywords = (query, objecGPT) => {
  //string[]

  const keywords = query.split(objecGPT.skills).join("+");
  return keywords;
};

const LinkedinSearch = ({ objecGPT }) => {
  const router = useRouter();
  const [query, setQuery] = UseState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `https://www.linkedin.com/search/results/all/?keywords=${getKeywords(
          query,
          objecGPT
        )}`
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for keywords"
        />
        <button type="submit">Search</button>
      </form>
      
    </div>
  );
};

export default LinkedinSearch;