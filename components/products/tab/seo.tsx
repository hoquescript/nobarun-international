import React from 'react';
import {
  Control,
  FieldValues,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import slugStringGenarator from '../../../helpers/slugGenerator';

import Chip from '../../controls/chip';
import Textfield from '../../controls/textfield';

interface WordCountProps {
  control: Control<FieldValues, object>;
  name: string;
  limit: string;
}
const WordCount = (props: WordCountProps) => {
  const { control, name, limit } = props;
  const count = useWatch({
    control,
    name,
    defaultValue: '',
  });
  if (count.length > limit) {
    return (
      <span className="chr-count ml-10" style={{ color: 'red' }}>
        *No of Characters overflowed
      </span>
    );
  } else {
    return (
      <span className="chr-count ml-10">
        {count.length} of {limit}
      </span>
    );
  }
};

interface SlugGeneratorProps {
  register: any;
  setValue: any;
  control: Control<FieldValues, object>;
}
const SlugGenerator = (props: SlugGeneratorProps) => {
  const { control, register, setValue } = props;
  const title = useWatch({
    control,
    name: 'SeoTitle',
    defaultValue: '',
  });
  setValue('slug', slugStringGenarator(title));
  return (
    <>
      <div className="field">
        <div className="d-flex">
          <label htmlFor="" className="flex-1">
            Title
          </label>
          <span
            className="chr-count ml-10"
            style={{ color: title.length > 70 ? 'red' : 'inherit' }}
          >
            {title.length > 70
              ? '*No of Characters overflowed'
              : `${title.length} of 70`}
          </span>
        </div>
        <input
          type="text"
          className="custom-input"
          {...register('SeoTitle', { maxLength: 70 })}
        />
      </div>
      <Textfield name="slug" label="Slug" />
    </>
  );
};

interface SEOProps {
  register: UseFormRegister<FieldValues>;
  control: any;
  chips: string[];
  setChips: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddProduct: any;
  setValue: any;
}
const SEO = (props: SEOProps) => {
  const { register, setValue, control, chips, setChips, handleAddProduct } =
    props;

  return (
    <>
      <div className="wrapper-section">
        <div className="wrapper-section__content">
          <div className="grid one">
            <SlugGenerator
              register={register}
              control={control}
              setValue={setValue}
            />
            <div className="field">
              <label>Targeted Keywords</label>
              <Chip chips={chips} setChips={setChips} />
            </div>
            <div className="field" style={{ marginTop: '-2.5rem' }}>
              <div className="d-flex">
                <label htmlFor="" className="flex-1">
                  Meta Description
                </label>
                <WordCount control={control} name="title" limit="160" />
              </div>
              <textarea
                className="custom-input"
                placeholder="Enter Meta Description"
                {...register('title', { maxLength: 160 })}
              ></textarea>
            </div>
          </div>
          <div className="mt-20">
            <Textfield name="url" label="Canonical URL" />
          </div>
          <div className="mt-20">
            <Textfield name="siteMap" label="Site Map Priority" />
          </div>
          <div className="center mt-40 mb-30">
            <button className="btn-green" onClick={handleAddProduct}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(SEO);
