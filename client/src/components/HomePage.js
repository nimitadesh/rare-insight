import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const rareDiseases = [
  "Multiple Sclerosis",
  "Narcolepsy",
  "Primary biliary cholangitis",
  "Fabry disease",
  "Cystic fibrosis",
  "Duchenne muscular dystrophy (DMD)",
  "Sickle cell disease"
];

export default function HomePage() {
  const [articlesFromDb, setArticlesFromDb] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticlesFromDb(data);
          setFilteredArticles(data);
        } else {
          console.error("Unexpected data format from API:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return (
    <div>
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="pt-20 text-center">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight dark:text-white sm:text-5xl">
            RareReview
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-white">
            Get the most up-to-date research and news surrounding rare diseases.
          </p>
        </div>
        <div className="mt-10 pb-10 mx-auto w-7/12">
          <SearchBar
            rareDiseases={rareDiseases}
            articlesFromDb={articlesFromDb}
            setFilteredArticles={setFilteredArticles}
          />
        </div>
      </section>

      <section className="h-screen bg-white dark:bg-gray-900">
        <div className="pb-10 flex flex-col scroll-smooth items-center overflow-auto max-h-full">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="mt-5 w-9/12 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
              >
                {article.tags &&
                  article.tags.split(",").map((tag) => (
                    <span
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
                      key={tag.trim()}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                <h5 className="mt-5 mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {article.title}
                </h5>
                <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  {article.summary}
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Read More
                  </button>
                </a>
              </div>
            ))
          ) : (
            <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">
              No articles found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
