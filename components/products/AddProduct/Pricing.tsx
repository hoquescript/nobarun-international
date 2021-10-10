import React from 'react';
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

  useEffect(() => {
    const price = priceValue !== '' ? parseInt(priceValue) : '';
    const discount = discountValue !== '' ? parseInt(discountValue) : '';
    const originalPrice =
      originalPriceValue !== '' ? parseInt(originalPriceValue) : '';

    if (
      dirtyFields.price &&
      dirtyFields.originalPrice &&
      price > originalPrice
    ) {
      setError('price', {
        type: 'price < originalPrice',
        message: 'Original Price should be higher than Price',
      });
      setError('originalPrice', {
        type: 'price < originalPrice',
        message: 'Original Price should be higher than Price',
      });
    } else {
      clearErrors('price');
      clearErrors('originalPrice');
    }

    if (dirtyFields.discount && discount > 100) {
      setError('discount', {
        type: 'Invalid Discount',
        message: 'Discount Percantage cant be more than 100%',
      });
    } else {
      clearErrors('discount');
    }

    // Finding Discount
    if (
      price &&
      originalPrice &&
      dirtyFields.price &&
      dirtyFields.originalPrice &&
      !dirtyFields.discount &&
      price < originalPrice
    ) {
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
      const discountAmmount = Math.ceil((discount / 100) * originalPrice);
      const discountPrice = originalPrice - discountAmmount;
      setValue('price', discountPrice);
    }
  }, [priceValue, discountValue, originalPriceValue]);

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
          {...register('price', {
            required: true,
          })}
        />
        <span>
          Discounted Price <sup style={{ color: 'red' }}>*</sup>
        </span>
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
          {...register('originalPrice', {
            required: true,
          })}
        />
        <span>
          Original Price <sup style={{ color: 'red' }}>*</sup>
        </span>
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
          {...register('discount', {
            required: true,
            maxLength: 3,
          })}
        />
        <span>
          Discount (%) <sup style={{ color: 'red' }}>*</sup>
        </span>
      </div>
    </>
  );
};

export default Pricing;
