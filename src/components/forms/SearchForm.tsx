import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Styles from "@/styles/form/search.module.css";

interface SearchFormProps {
  placeholder: string;
  onSearch: (search: string) => void;
}

const SearchForm: React.FunctionComponent<SearchFormProps> = (props) => {
  const [search, setSearch] = useState("");

  return (
    <div className={Styles.searchContainer}>
      <div className={Styles.searchWrapper}>
        <input
          placeholder={props.placeholder}
          alt="Barra de pesquisa"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className={Styles.searchInput}
        />
        <button
          className={Styles.searchSubmit}
          onClick={() => props.onSearch(search)}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
