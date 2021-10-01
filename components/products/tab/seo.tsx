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
}
const WordCount = (props: WordCountProps) => {
  const { control, name } = props;
  const count = useWatch({
    control,
    name,
    defaultValue: '',
  });
  return <span className="chr-count ml-10">{count.length} of 70</span>;
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
        </div>
        <span className="chr-count ml-10">{title.length} of 70</span>
        <input type="text" className="custom-input" {...register('SeoTitle')} />
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
            <Textfield name="url" label="Canonical URL" />
            <Textfield name="siteMap" label="Site Map Priority" />
            <div className="field">
              <label>Keywords</label>
              <Chip chips={chips} setChips={setChips} />
            </div>
            <div className="field">
              <div className="d-flex">
                <label htmlFor="" className="flex-1">
                  Meta Description
                </label>
                <WordCount control={control} name="title" />
              </div>
              <textarea
                className="custom-input"
                placeholder="Enter Meta Description"
                {...register('title')}
              ></textarea>
            </div>
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
