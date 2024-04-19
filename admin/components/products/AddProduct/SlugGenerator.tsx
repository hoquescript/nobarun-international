import React from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';
import slugStringGenarator from '../../../helpers/slugGenerator';
import Textfield from '../../controls/textfield';

interface SlugGeneratorProps {
  setValue: any;
  control: Control<FieldValues, object>;
  isEditMode?: boolean;
}

const SlugGenerator = (props: SlugGeneratorProps) => {
  const { control, setValue, isEditMode } = props;
  const title = useWatch({
    control,
    name: 'productName',
    defaultValue: '',
  });

  if (!isEditMode) {
    setValue('slug', slugStringGenarator(title));
  }

  return (
    <>
      <div className="col-12 mb-10">
        <Textfield required name="productName" label="Product Name" />
      </div>
      <div className="col-12 mb-10">
        <Textfield name="slug" label="Slug" />
      </div>
    </>
  );
};

export default SlugGenerator;
