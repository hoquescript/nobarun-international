import React from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';
import slugStringGenarator from '../../helpers/slugGenerator';
import Textfield from '../controls/textfield';

interface CategorySlugProps {
  register: any;
  setValue: any;
  control: any;
}

const CategorySlug = (props: CategorySlugProps) => {
  const { control, register, setValue } = props;
  const title = useWatch({
    control,
    name: 'categoryName',
    defaultValue: '',
  });
  title && setValue('categorySlug', slugStringGenarator(title));
  return (
    <>
      <div className="col-12">
        <Textfield
          label="Name"
          placeholder="Enter Category Name"
          name="categoryName"
        />
      </div>
      <div className="col-12">
        <Textfield
          label="Slug"
          placeholder="Enter Category Slug"
          name="categorySlug"
        />
      </div>
    </>
  );
};

export default CategorySlug;
