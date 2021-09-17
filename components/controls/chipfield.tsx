import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import fuzzyMatch from '../../helpers/fuzzySearch';
import styles from './chipfield.module.scss';

const products = ['SKU-01', 'SKU-02', 'SKU-03'];
const defaultState = () => {
  const defaultState: any = {};
  products.forEach((product) => {
    defaultState[product] = '';
  });
  return defaultState;
};

const Chipfield = () => {
  const [chips, setChips] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any>(defaultState());
  const [showSuggestion, setShowSuggestion] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSuggestion(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const onChangeHandler = (e) => {
    const searchLists: any = {};
    setShowSuggestion(true);
    products.forEach((product) => {
      const value = fuzzyMatch(product, e.target.value);
      if (value) searchLists[product] = value;
    });
    setSuggestions(searchLists);
  };

  return (
    <div className={styles.chip__wrapper}>
      <div
        className={`field ${styles.chip}`}
        style={{ position: 'relative' }}
        ref={ref}
      >
        <AiOutlineSearch className={styles.chip__search_icon} />
        <input
          type="text"
          className={`${styles.chip__input}`}
          placeholder="Search"
          onClick={() => setShowSuggestion(true)}
          onChange={onChangeHandler}
        />
        <ul
          className={styles.chip__searchList}
          style={{ display: showSuggestion ? 'block' : 'none' }}
        >
          {Object.keys(suggestions).map((suggestion: any) => (
            <li
              key={suggestion}
              className={styles.chip__searchItem}
              dangerouslySetInnerHTML={{
                __html: suggestions[suggestion] || suggestion,
              }}
              onClick={() => {
                setChips(chips.concat(suggestion));
              }}
            />
          ))}
        </ul>
      </div>
      <div className={styles.chip__chips}>
        {chips.map((chip) => (
          <span className={styles.chip__btn}>
            {chip} <AiOutlineClose className="ml-10" />
          </span>
        ))}
        {/* <span className={styles.chip__btn}>
          SKU-01 <AiOutlineClose className="ml-10" />
        </span>
        <span className={styles.chip__btn}>
          SKU-01 <AiOutlineClose className="ml-10" />
        </span> */}
      </div>
    </div>
  );
};

export default Chipfield;
