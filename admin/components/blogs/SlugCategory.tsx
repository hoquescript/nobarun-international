import React from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';
import slugStringGenarator from '../../helpers/slugGenerator';
import Textfield from '../controls/textfield';

interface SlugGeneratorProps {
  register: any;
  setValue: any;
  control: any;
}

const SlugGenerator = (props: SlugGeneratorProps) => {
  const { control, register, setValue } = props;
  const title = useWatch({
    control,
    name: 'name',
    defaultValue: '',
  });
  title && setValue('slug', slugStringGenarator(title));
  return (
    <>
      <div className="col-12">
        <Textfield
          required
          name="name"
          label="Category Name"
          placeholder="Enter your Name"
        />
      </div>
      <div className="col-12">
        <Textfield
          required
          name="slug"
          label="Slug"
          placeholder="Enter your Name"
        />
      </div>
    </>
  );
};

export default SlugGenerator;
