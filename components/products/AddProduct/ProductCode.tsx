import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ProductCodeProps {
  register: any;
  productCodes: string[];
}

const ProductCode = (props: ProductCodeProps) => {
  const { register, productCodes } = props;
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { onChange, ...rest } = register('productCode', {
    required: `Please fill the value of Product Code field`,
  });

  return (
    <div className="field">
      <label>
        Product Code <sup style={{ color: 'red' }}>*</sup>
      </label>
      <input
        type="text"
        className="custom-input"
        onChange={(e) => {
          let isDuplicate = productCodes.some(
            (code) => code === e.target.value,
          );
          if (isDuplicate) {
            setError('productCode', {
              type: 'manual',
              message:
                'Duplicate Product Code. A product having this code already exists',
            });
          } else {
            clearErrors('productCode');
          }
          onChange(e);
        }}
        {...rest}
      />
    </div>
  );
};

export default ProductCode;
