import React, { createContext, useState, useEffect, useMemo } from 'react';
import { fetchApiData } from './api';

const MyContext = createContext();

function MyContextProvider(props) {
  const [apiData, setApiData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetchApiData();
    setApiData(data);
    setSearchResults(data); // Initialize searchResults with the entire data set
  }

  const handleSearch = (query) => {
    const filteredResults = apiData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    setSearchTerm(query);
  };

  // Use useMemo to memoize searchResults
  const memoizedSearchResults = useMemo(() => searchResults, [apiData, searchTerm]);

  return (
    <MyContext.Provider value={{ apiData, searchResults: memoizedSearchResults, searchTerm, handleSearch }}>
      {props.children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
