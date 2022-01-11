import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import fuzzyMatch from '../../helpers/fuzzySearch';
import useAllReviewProductCode from '../../hooks/Review/useAllReviewProductCode';
import products from '../../store/slices/products';
import styles from '../../styles/pages/products.module.scss';

interface ReviewCodeProps {
  productCode: string;
  setProductCode: any;
  required?: boolean;
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

const getProductName = (products: any[], productCode) => {
  const product =
    products && products.find((product) => product.value === productCode);
  return product ? product.id : '';
};

const ReviewCode = (props: ReviewCodeProps) => {
  const { productCode, setProductCode, required } = props;
  const [productCodes, setProductCodes] = useState<
    { id: string; value: string }[]
  >([]);
  const [productName, setProductName] = useState('');
  const [suggestions, setSuggestions] = useState<any>({});
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    setProductName(getProductName(productCodes, productCode));
  }, [productCode, productCodes]);

  useEffect(() => {
    useAllReviewProductCode().then((data) => {
      setProductCodes(data);
      setSuggestions(defaultState(data));
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
    setProductName(e.target.value);
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

  console.log(productCode);

  return (
    <div className="field">
      <label>
        Product Code
        {required && <sup style={{ color: 'red', marginLeft: '.5rem' }}>*</sup>}
      </label>
      <div
        className={`field ${styles.pCode}`}
        style={{ position: 'relative' }}
        ref={ref}
      >
        <AiOutlineSearch className={styles.pCode__search_icon} />
        <input
          type="text"
          className={`${styles.pCode__inputs}`}
          placeholder="Search Products"
          value={productName}
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
                __html: suggestions[suggestion].id || suggestion,
              }}
              onClick={() => {
                setProductName(suggestion);
                setProductCode(suggestions[suggestion].value);
                setShowSuggestion(false);
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewCode;
