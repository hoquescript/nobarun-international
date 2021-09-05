import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './search.module.scss';

const Search = () => {
  return (
    <div className="field" style={{ position: 'relative' }}>
      <AiOutlineSearch className={styles.search__icon} />
      <input
        type="text"
        className={`custom-input ${styles.search__input}`}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
