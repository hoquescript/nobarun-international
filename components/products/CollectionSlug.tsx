import React from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';
import slugStringGenarator from '../../helpers/slugGenerator';
import Textfield from '../controls/textfield';

interface CollectionSlugProps {
  register: any;
  setValue: any;
  control: any;
}

const CollectionSlug = (props: CollectionSlugProps) => {
  const { control, register, setValue } = props;
  const title = useWatch({
    control,
    name: 'collectionName',
    defaultValue: '',
  });
  title && setValue('collectionSlug', slugStringGenarator(title));
  return (
    <>
      <div className="col-12">
        <Textfield
          name="collectionName"
          label="Name"
          placeholder="Enter Collection Name"
        />
      </div>
      <div className="col-12">
        <Textfield
          name="collectionSlug"
          label="Slug"
          placeholder="Enter Collection Slug"
        />
      </div>
    </>
  );
};

export default CollectionSlug;
