import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './search.module.scss';

interface SearchProps {
  search: string;
  setSearch: any;
}
const Search = (props) => {
  const { search, setSearch } = props;
  return (
    <div className="field" style={{ position: 'relative' }}>
      <AiOutlineSearch className={styles.search__icon} />
      <input
        type="text"
        className={`custom-input ${styles.search__input}`}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
