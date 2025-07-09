import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Styles from "@/styles/form/search.module.css";
import { filterTextInput } from "@/utils/filterTextInput";

interface SearchFormProps {
  placeholder: string;
  onSearch: (search: string) => void;
}

const SearchForm: React.FunctionComponent<SearchFormProps> = (props) => {
  const [search, setSearch] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onSearch(search.trimEnd());
    }
  };


  return (
    <div className={Styles.searchContainer}>
      <div className={Styles.searchWrapper}>
        <input
          placeholder={props.placeholder}
          alt="Barra de pesquisa"
          value={search}
          onChange={(event) => setSearch(filterTextInput(event.target.value, {allowNumbers: true}))}
          onKeyDown={handleKeyDown} 
          className={Styles.searchInput}
        />
        <button
          className={Styles.searchSubmit}
          onClick={() => props.onSearch(search.trimEnd())}
          disabled={!search.trim()}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
