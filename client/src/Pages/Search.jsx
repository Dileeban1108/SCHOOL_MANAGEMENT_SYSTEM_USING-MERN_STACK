import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../styles/universities.css'
const Search = () => {
  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Where are you studying?" />
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default Search;
