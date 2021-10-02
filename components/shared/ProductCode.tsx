import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import fuzzyMatch from '../../helpers/fuzzySearch';
import useAllProductCode from '../../hooks/Products/useAllProductCode';
import styles from '../../styles/pages/products.module.scss';

interface RelatedProductsProps {
  productCode: string;
  setProductCode: any;
}

const defaultState = (products) => {
  const defaultState: any = {};
  products &&
    products.forEach((product) => {
      defaultState[product] = '';
    });
  console.log('Method', defaultState);
  return defaultState;
};

const RelatedProducts = (props: RelatedProductsProps) => {
  const { productCode, setProductCode } = props;
  const [productCodes, setProductCodes] = useState([]);
  const [suggestions, setSuggestions] = useState<any>({});
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    useAllProductCode().then((data) => {
      const products = data.map((product) => product.value);
      setProductCodes(products);
      setSuggestions(defaultState(products));
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
    const searchLists: any = {};
    setShowSuggestion(true);
    setProductCode(e.target.value);
    productCodes.forEach((product) => {
      const value = fuzzyMatch(product, e.target.value);
      if (value) searchLists[product] = value;
    });
    setSuggestions(searchLists);
  };

  return (
    <div className="field">
      <label>Product Code {<sup style={{ color: 'red' }}>*</sup>}</label>
      <div
        className={`field ${styles.pCode}`}
        style={{ position: 'relative' }}
        ref={ref}
      >
        <AiOutlineSearch className={styles.pCode__search_icon} />
        <input
          type="text"
          className={`${styles.pCode__input}`}
          placeholder="Search Product Code"
          value={productCode}
          onClick={() => setShowSuggestion(true)}
          onChange={onChangeHandler}
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
                setProductCode(suggestion);
                setShowSuggestion(false);
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RelatedProducts;
