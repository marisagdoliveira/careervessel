import React from "react";
import '../../app/globals.css';
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
      <div className="">
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[0]}`}
          handleSubmit={handleSubmit}
          className="border-2 border-indigo-500 hover:bg-indigo-900 hover:text-white py-2 rounded-lg cursor-pointer text-indigo-500 m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[0]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[1]}`}
          handleSubmit={handleSubmit}
          className="border-2 border-indigo-500 hover:bg-indigo-900 hover:text-white py-2 rounded-lg cursor-pointer text-indigo-500 m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[1]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[2]}`}
          handleSubmit={handleSubmit}
          className="border-2 border-indigo-500 hover:bg-indigo-900 hover:text-white py-2 rounded-lg cursor-pointer text-indigo-500 m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[2]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[3]}`}
          handleSubmit={handleSubmit}
          className="border-2 border-indigo-500 hover:bg-indigo-900 hover:text-white py-2 rounded-lg cursor-pointer text-indigo-500 m-6 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {objectGPT.keywords[3]}
        </Link>
        <Link
          href={`https://www.linkedin.com/search/results/all/?keywords=${objectGPT.keywords[4]}`}
          handleSubmit={handleSubmit}
          className="border-2 border-indigo-500 hover:bg-indigo-900 hover:text-white py-2 rounded-lg cursor-pointer text-indigo-500 m-6 p-6"
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