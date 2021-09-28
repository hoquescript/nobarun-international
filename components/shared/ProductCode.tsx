import React from 'react';
import Combobox from '../controls/combobox';

const ProductCode = () => {
  return (
    <Combobox
      name="productCode"
      label="Product Code"
      options={[
        {
          id: '23',
          value: '#ht57jw',
        },
      ]}
    />
  );
};

export default ProductCode;
