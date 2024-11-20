import DiseaseDropdown from "./DiseaseDropdown";
import React, { useState } from "react";

export default function SearchBar({ rareDiseases, articlesFromDb, setFilteredArticles }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownDisease, setDropdownDisease] = useState("")

  const handleSearch = (event) => {
    event.preventDefault();
    const updatedFilteredArticles = articlesFromDb.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (article.title.toLowerCase().includes(dropdownDisease.toLowerCase()) ||
      article.tags.toLowerCase().includes(dropdownDisease.toLowerCase()))
    );
    setFilteredArticles(updatedFilteredArticles);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex">
        <select
          id="countries"
          className="dropdown-button flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          value={dropdownDisease}
          onChange={(e) => setDropdownDisease(e.target.value)}
        >
          <option value="">All rare diseases</option>
          {rareDiseases.map((rareDisease) => (
            <option key={rareDisease} value={rareDisease}>
              {rareDisease}
            </option>
          ))}
        </select>

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Additional search terms..."
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
