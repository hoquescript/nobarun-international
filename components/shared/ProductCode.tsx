import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAllProductCode from '../../hooks/Products/useAllProductCode';
import Combobox from '../controls/combobox';

const ProductCode = () => {
  const [productCodes, setProductCodes] = useState([]);
  useEffect(() => {
    useAllProductCode().then((data) => {
      setProductCodes(data);
    });
  }, []);
  return (
    <Combobox name="productCode" label="Product Code" options={productCodes} />
  );
};

export default ProductCode;
