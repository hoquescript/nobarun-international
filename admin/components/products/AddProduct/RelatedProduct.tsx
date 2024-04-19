import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import fuzzyMatch from '../../../helpers/fuzzySearch';
import styles from '../../../styles/pages/products.module.scss';

interface RelatedProductsProps {
  placeholder?: string;
  chips: { id: string; value: string }[];
  setChips: any;
  productCodes?: { id: string; value: string }[];
}

const defaultState = (products) => {
  const defaultState: any = {};
  products &&
    products.forEach((product) => {
      defaultState[product.id] = {
        id: '',
        value: product.value,
      };
    });
  return defaultState;
};

const RelatedProducts = (props: RelatedProductsProps) => {
  const { placeholder, chips, setChips, productCodes } = props;
  const [suggestions, setSuggestions] = useState<any>({});
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    setSuggestions(defaultState(productCodes));
  }, [productCodes]);

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
    productCodes &&
      productCodes.forEach((product) => {
        const value = fuzzyMatch(product.id, e.target.value);
        if (value)
          searchLists[product.id] = {
            id: value,
            value: product.value,
          };
      });
    setSuggestions(searchLists);
  };

  const chipRemoveHandler = (idx) => {
    const newChips = chips.filter((chip) => chip.id !== idx);
    setChips(newChips);
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
          placeholder={`Search ${placeholder}`}
          onClick={() => setShowSuggestion(true)}
          onChange={onChangeHandler}
        />
        <ul
          className={styles.chip__searchList}
          style={{ display: showSuggestion ? 'block' : 'none' }}
        >
          {Object.keys(suggestions).map((suggestion: any, idx: number) => (
            <li
              key={suggestion + idx}
              className={styles.chip__searchItem}
              dangerouslySetInnerHTML={{
                __html: suggestions[suggestion].id || suggestion,
              }}
              onClick={() => {
                setChips(
                  chips.concat({
                    id: suggestion,
                    value: suggestions[suggestion].value,
                  }),
                );
              }}
            />
          ))}
        </ul>
      </div>
      <div className={styles.chip__chips}>
        {chips.map((chip, idx) => (
          <div className="chip ml-10" key={chip.value + idx + Math.random()}>
            <span className="chip__title">{chip.id}</span>
            <button
              type="button"
              className="chip__remove"
              onClick={() => chipRemoveHandler(chip.id)}
            >
              <AiOutlineClose />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
