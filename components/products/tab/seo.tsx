import React from 'react';
import {
  Control,
  FieldValues,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';

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
  console.log(count);
  return <span className="chr-count ml-10">{count.length} of 70</span>;
};

interface SEOProps {
  register: UseFormRegister<FieldValues>;
  control: any;
  chips: string[];
  setChips: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddProduct: any;
}
const SEO = (props: SEOProps) => {
  const { register, control, chips, setChips, handleAddProduct } = props;

  return (
    <>
      <div className="wrapper-section">
        <div className="wrapper-section__content">
          <div className="grid one">
            <div className="field">
              <div className="d-flex">
                <label htmlFor="" className="flex-1">
                  Title
                </label>
              </div>
              <WordCount control={control} name="SeoTitle" />
              <input
                type="text"
                className="custom-input"
                {...register('SeoTitle')}
              />
            </div>
            <Textfield name="slug" label="Slug" />
            <Textfield name="url" label="Canonical URL" />
            <Textfield name="siteMap" label="Site Map Priority" />
            <div className="field">
              <label htmlFor="">Keywords</label>
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
