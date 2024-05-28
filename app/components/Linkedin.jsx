import React from "react";

import Link from "next/link";

const getKeywords = (objectGPT) => {
  return new Promise((resolve) => {
    const keywordsJob = objectGPT.keywords.split(" ").join("+");
    resolve(keywordsJob);
  });
};

const LinkedinSearch = ({ objectGPT }) => {
  const [query, setQuery] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      getKeywords(objectGPT).then((keywordsJob) => {
        setKeywords(keywordsJob.split("+"));
        router.push(
          `https://www.linkedin.com/search/results/all/?keywords=${getKeywords(
            objectGPT
          )}`
        );
      });
    }
  };

  return (
    <div>
      <div className="mt-6">
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[0]}`}
          handleSubmit={handleSubmit}
          className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[0]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[1]}`}
          handleSubmit={handleSubmit}
          className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[1]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[2]}`}
          handleSubmit={handleSubmit}
          className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[2]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[3]}`}
          handleSubmit={handleSubmit}
          className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[3]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[4]}`}
          handleSubmit={handleSubmit}
          className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[4]}
        </Link>
      </div>
    </div>
  );
};

export default LinkedinSearch;