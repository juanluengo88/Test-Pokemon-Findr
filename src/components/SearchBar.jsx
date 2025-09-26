import React, { useState } from 'react';
import '../styles/SearchBar.css'; // We'll create this CSS file next


export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
    }
  };

  const handleGoBack= () =>{
    onSearch("");
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    
    <div className="search-bar-container">
      <button onClick={handleGoBack} className="search-button">
        Go back
      </button>
      <input
        type="text"
        placeholder="Enter Pokemon name..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;