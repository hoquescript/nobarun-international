import React from 'react';
import { useEffect } from 'react';
import { useWatch, useFormState } from 'react-hook-form';

interface PricingProps {
  register: any;
  setValue: any;
  control: any;
}
const Pricing = (props: PricingProps) => {
  const { register, control, setValue } = props;
  const { dirtyFields } = useFormState();
  // console.log({ dirtyFields });
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
  useEffect(() => {
    const price = priceValue !== '' ? parseInt(priceValue) : '';
    const discount = discountValue !== '' ? parseInt(discountValue) : '';
    const originalPrice =
      originalPriceValue !== '' ? parseInt(originalPriceValue) : '';
    console.log(
      price,
      originalPrice,
      dirtyFields.discount,
      dirtyFields.originalPrice,
    );
    // Finding Discount
    if (
      price &&
      originalPrice &&
      dirtyFields.price &&
      dirtyFields.originalPrice &&
      !dirtyFields.discount &&
      price < originalPrice
    ) {
      console.log('Finding Discount');
      const discount = originalPrice - price;
      const cDiscount = Math.ceil((discount / originalPrice) * 100);
      setValue('discount', cDiscount);
    }

    //Finding Original Price
    if (
      price &&
      discount &&
      dirtyFields.price &&
      !dirtyFields.originalPrice &&
      dirtyFields.discount &&
      discount <= 100
    ) {
      console.log('Finding Original');
      const pricePercentage = 100 - discount;
      const oPrice = Math.ceil((price / pricePercentage) * 100);
      setValue('originalPrice', oPrice);
    }

    //Finding Discounted Price
    if (
      discount &&
      originalPrice &&
      !dirtyFields.price &&
      dirtyFields.originalPrice &&
      dirtyFields.discount
    ) {
      console.log('Finding Discounted Price');
      const discountAmmount = Math.ceil((discount / 100) * originalPrice);
      const discountPrice = originalPrice - discountAmmount;
      setValue('price', discountPrice);
    }
  }, [priceValue, discountValue, originalPriceValue]);
  return (
    <>
      <div>
        <input
          type="text"
          className="custom-input medium mb-10 center"
          {...register('price')}
        />
        <span>Price</span>
      </div>
      <div>
        <input
          type="text"
          className="custom-input medium mb-10 center"
          {...register('originalPrice')}
        />
        <span>Original Price</span>
      </div>
      <div>
        <input
          type="text"
          className="custom-input medium mb-10 center"
          {...register('discount')}
        />
        <span>Discount</span>
      </div>
    </>
  );
};

export default Pricing;
