import React from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';
import slugStringGenarator from '../../helpers/slugGenerator';
import Textfield from '../controls/textfield';

interface SlugGeneratorProps {
  setValue: any;
  control: Control<FieldValues, object>;
}
const SlugGenerator = (props: SlugGeneratorProps) => {
  const { control, setValue } = props;
  const title = useWatch({
    control,
    name: 'blogTitle',
    defaultValue: '',
  });
  setValue('slug', slugStringGenarator(title));
  return (
    <>
      <div className="col-12 mb-10">
        <Textfield required name="blogTitle" label="Blog Title" />
      </div>
      <div className="col-12 mb-10">
        <Textfield name="slug" label="Slug" />
      </div>
    </>
  );
};

export default SlugGenerator;
