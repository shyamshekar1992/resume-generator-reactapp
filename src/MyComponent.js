import React, { useContext } from 'react';
import { MyContext } from './MyContext';

function MyComponent() {
  const { searchResults, searchTerm, handleSearch } = useContext(MyContext);

  return (
    <div>
      <h1>API Data:</h1>
      <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
      <ul>{searchResults.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
    </div>
  );
}

export default MyComponent;
