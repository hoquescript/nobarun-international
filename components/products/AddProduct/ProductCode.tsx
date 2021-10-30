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
    <div>
      {errors.productCode ? (
        <h6 style={{ color: 'red', marginBottom: '.5rem' }}>
          {errors.productCode.message}
        </h6>
      ) : (
        <h6>&nbsp;</h6>
      )}
      <input
        type="text"
        className="custom-input medium mb-10 center"
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
      <span>
        Product Code <sup style={{ color: 'red' }}>*</sup>
      </span>
    </div>
  );
};

export default ProductCode;
