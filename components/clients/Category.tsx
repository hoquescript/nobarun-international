import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import fuzzyMatch from '../../helpers/fuzzySearch';
import useAllClientCategory from '../../hooks/Client/useAllClientCategory';
import useAllProductCode from '../../hooks/Products/useAllProductCode';
import styles from '../../styles/pages/products.module.scss';

interface ClientCategoryProps {
  categories: string[];
  setCategories: any;
}

const defaultState = (products) => {
  const defaultState: any = {};
  products &&
    products.forEach((product) => {
      defaultState[product] = '';
    });
  return defaultState;
};

const ClientCategory = (props: ClientCategoryProps) => {
  const { categories, setCategories } = props;
  const [productCodes, setProductCodes] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any>({});
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [category, setCategory] = useState('');

  useEffect(() => {
    useAllClientCategory().then((data) => {
      let categories = [];
      data.forEach((product) => {
        // @ts-ignore
        categories = [...new Set([...categories, ...product.value])];
      });

      setProductCodes(categories);
      setSuggestions(defaultState(categories));
    });
  }, []);

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
    setCategory(e.target.value);

    const searchLists: any = {};
    setShowSuggestion(true);
    productCodes.forEach((product) => {
      const value = fuzzyMatch(product, e.target.value);
      if (value) searchLists[product] = value;
    });
    setSuggestions(searchLists);
  };

  const onSaveHandler = (event) => {
    if (event.key === 'Enter') {
      const newCategories = [...categories, category];
      const productCodeList = [...productCodes, category];

      setCategory('');
      setCategories(newCategories);
      setProductCodes(productCodeList);

      setSuggestions(defaultState(productCodeList));
    }
  };

  return (
    <div className="field">
      <label>Category {<sup style={{ color: 'red' }}>*</sup>}</label>
      <div
        className={`field ${styles.pCode}`}
        style={{ position: 'relative' }}
        ref={ref}
      >
        <div className={`flex ${styles.pCode__input_wrapper}`}>
          <div className={styles.pCode__input_field}>
            <AiOutlineSearch className={styles.pCode__search_icon} />
            <input
              type="text"
              className={`${styles.pCode__input}`}
              placeholder="Search Category"
              value={category}
              onClick={() => setShowSuggestion(true)}
              onChange={onChangeHandler}
              onKeyDown={onSaveHandler}
            />
            <ul
              className={styles.pCode__searchList}
              style={{ display: showSuggestion ? 'block' : 'none' }}
            >
              {Object.keys(suggestions).map((suggestion: any) => (
                <li
                  key={suggestion}
                  className={styles.pCode__searchItem}
                  dangerouslySetInnerHTML={{
                    __html: suggestions[suggestion] || suggestion,
                  }}
                  onClick={() => {
                    const newCategories = [...categories, suggestion];
                    setCategories(newCategories);
                    setShowSuggestion(false);
                  }}
                />
              ))}
            </ul>
          </div>
          <ul className="flex" style={{ flexWrap: 'wrap' }}>
            {categories &&
              categories.length > 0 &&
              categories.map((category, idx) => (
                <div className="chip ml-10" key={category}>
                  <span className="chip__title">{category}</span>
                  <button
                    type="button"
                    className="chip__remove"
                    onClick={() => {
                      const newCategories = categories.filter(
                        (c) => c !== category,
                      );
                      setCategories(newCategories);
                    }}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientCategory;
