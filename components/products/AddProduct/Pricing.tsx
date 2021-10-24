import React, { useState } from 'react';
import { useEffect } from 'react';
import { useWatch, useFormState, useFormContext } from 'react-hook-form';

interface PricingProps {
  register: any;
  setValue: any;
  control: any;
}
const Pricing = (props: PricingProps) => {
  const { register, control, setValue } = props;

  const { dirtyFields } = useFormState();
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const priceValue = useWatch({
    control,
    name: 'price',
    defaultValue: '',
  });
  const originalPriceValue = useWatch({
    control,
    name: 'originalPrice',
    defaultValue: '',
  });
  const discountValue = useWatch({
    control,
    name: 'discount',
    defaultValue: '',
  });

  // useEffect(() => {
  //   const price = priceValue !== '' ? parseInt(priceValue) : '';
  //   const discount = discountValue !== '' ? parseInt(discountValue) : '';
  //   const originalPrice =
  //     originalPriceValue !== '' ? parseInt(originalPriceValue) : '';
  //   if (price > originalPrice) {
  //     setError('price', {
  //       type: 'price < originalPrice',
  //       message: 'Original Price should be higher than Price',
  //     });
  //     setError('originalPrice', {
  //       type: 'price < originalPrice',
  //       message: 'Original Price should be higher than Price',
  //     });
  //   } else {
  //     clearErrors('price');
  //     clearErrors('originalPrice');
  //   }
  //   if (discount > 100) {
  //     setError('discount', {
  //       type: 'Invalid Discount',
  //       message: 'Discount Percantage cant be more than 100%',
  //     });
  //   } else {
  //     clearErrors('discount');
  //   }
  //   // Finding Discount
  //   if (price && originalPrice && price < originalPrice) {
  //     const discount = originalPrice - price;
  //     const cDiscount = Math.ceil((discount / originalPrice) * 100);
  //     setValue('discount', cDiscount);
  //   }
  //   // //Finding Original Price
  //   // // if (
  //   // //   price &&
  //   // //   discount &&
  //   // //   dirtyFields.price &&
  //   // //   !dirtyFields.originalPrice &&
  //   // //   dirtyFields.discount &&
  //   // //   discount <= 100
  //   // // ) {
  //   // //   const pricePercentage = 100 - discount;
  //   // //   const oPrice = Math.ceil((price / pricePercentage) * 100);
  //   // //   setValue('originalPrice', oPrice);
  //   // // }
  //   // //Finding Discounted Price
  //   if (discount && originalPrice) {
  //     const discountAmmount = Math.ceil((discount / 100) * originalPrice);
  //     const discountPrice = originalPrice - discountAmmount;
  //     setValue('price', discountPrice);
  //   }
  // }, [priceValue, discountValue, originalPriceValue]);

  const { onChange: onPriceChange, ...priceState } = register('price', {
    required: true,
  });
  const { onChange: onOriginalPriceChange, ...originalPriceState } = register(
    'originalPrice',
    {
      required: true,
    },
  );
  const { onChange: onDiscountChange, ...discountState } = register(
    'discount',
    {
      required: true,
    },
  );

  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleChange = (active) => {
    const price = priceValue !== '' ? parseInt(priceValue) : '';
    const discount = discountValue !== '' ? parseInt(discountValue) : '';
    const originalPrice =
      originalPriceValue !== '' ? parseInt(originalPriceValue) : '';

    // if (discount > 100) {
    //   setError('discount', {
    //     type: 'Invalid Discount',
    //     message: 'Discount Percantage cant be more than 100%',
    //   });
    // } else {
    //   clearErrors('discount');
    // }

    // Finding Discount
    if (active === 'price' && price && originalPrice && price < originalPrice) {
      console.log('object');

      const discount = originalPrice - price;
      const cDiscount = Math.ceil((discount / originalPrice) * 100);
      setValue('discount', cDiscount);
      // setDiscount(cDiscount);
    }

    // Finding Discounted Price
    if (active === 'discount' && discount && originalPrice) {
      const discountAmmount = Math.ceil((discount / 100) * originalPrice);
      const discountPrice = originalPrice - discountAmmount;
      setValue('price', discountPrice);
      // setPrice(discountPrice);
    }
  };
  return (
    <>
      <div>
        {errors.price ? (
          <h6 style={{ color: 'red', marginBottom: '.5rem' }}>
            {errors.price.message}
          </h6>
        ) : (
          <h6>&nbsp;</h6>
        )}
        <input
          type="text"
          className="custom-input medium mb-10 center"
          onChange={(e) => {
            // setPrice(e.target.value);
            onPriceChange(e);
            handleChange('price');
          }}
          {...priceState}
        />
        <span>Current Price</span>
      </div>
      <div>
        {errors.originalPrice ? (
          <h6 style={{ color: 'red', marginBottom: '.5rem' }}>
            {errors.originalPrice.message}
          </h6>
        ) : (
          <h6>&nbsp;</h6>
        )}
        <input
          type="text"
          className="custom-input medium mb-10 center"
          onChange={(e) => {
            setOriginalPrice(e.target.value);
            handleChange('originalPrice');
            onOriginalPriceChange(e);
          }}
          {...originalPriceState}
        />
        <span>Original Price</span>
      </div>
      <div>
        {errors.discount ? (
          <h6 style={{ color: 'red', marginBottom: '.5rem' }}>
            {errors.discount.message}
          </h6>
        ) : (
          <h6>&nbsp;</h6>
        )}
        <input
          type="text"
          className="custom-input medium mb-10 center"
          onChange={(e) => {
            setDiscount(e.target.value);
            handleChange('discount');
            onDiscountChange(e);
          }}
          {...discountState}
          // {...register('discount', {
          //   maxLength: 3,
          // })}
        />
        <span>Discount (%)</span>
      </div>
    </>
  );
};

export default Pricing;
