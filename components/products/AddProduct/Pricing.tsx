import React from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';

import Textfield from '../../controls/textfield';

interface PricingProps {
  getValues: any;
  setValue: any;
  control: Control<FieldValues, object>;
}

const Details = (props: PricingProps) => {
  const { control, getValues, setValue } = props;

  const currentPriceHandler = (e) => {
    const currentPrice = +e.target.value;
    const originalPrice = +getValues('originalPrice');
    if (currentPrice >= originalPrice) {
      return setValue('discount', 0);
    }
    if (originalPrice > currentPrice) {
      const discount = originalPrice - currentPrice;
      const cDiscount = Math.ceil((discount / originalPrice) * 100);
      setValue('discount', cDiscount);
    }
  };

  // We have to change both the price and the discount
  const originalPriceHandler = (e) => {
    const originalPrice = +e.target.value;
    const currentPrice = +getValues('price');
    const discount = +getValues('discount');
    console.log(originalPrice, currentPrice);

    if (currentPrice >= originalPrice) {
      return setValue('discount', 0);
    }
    // Setting Discount based on OP and CP
    if (currentPrice < originalPrice && discount <= 100) {
      const discount = originalPrice - currentPrice;
      const cDiscount = Math.ceil((discount / originalPrice) * 100);
      setValue('discount', cDiscount);
    }
  };

  const discountHandler = (e) => {
    const discount = +e.target.value;
    if (discount >= 100) return;

    const originalPrice = +getValues('originalPrice');
    const discountAmmount = Math.ceil((discount / 100) * originalPrice);
    const discountPrice = originalPrice - discountAmmount;
    setValue('price', discountPrice);
  };
  return (
    <>
      <div className="col-3">
        <Textfield
          name="price"
          label="Current Price"
          onChangeHandler={currentPriceHandler}
        />
      </div>
      <div className="col-3">
        <Textfield
          name="originalPrice"
          label="Original Price"
          onChangeHandler={originalPriceHandler}
        />
      </div>
      <div className="col-3">
        <Textfield
          name="discount"
          label="Discount"
          onChangeHandler={discountHandler}
        />
      </div>
    </>
  );
};

export default Details;
