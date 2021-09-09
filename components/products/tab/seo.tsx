import React, { useState, useRef, useEffect } from 'react';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

import Chip from '../../controls/chip';
import Textarea from '../../controls/textarea';

const ChipItem = ({ children }) => (
  <div className="chip ml-10 mr-10">
    <span className="chip__title">{children}</span>
  </div>
);

const SEO = () => {
  const [value, setValue] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const textArea = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(textArea.current);
    if (textArea.current && textArea.current.style) {
      textArea.current.style.border = '1px solid #070606';
    }
  }, []);
  return (
    <>
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3>SEO Settings</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="grid one">
            <div className="field">
              <div className="d-flex">
                <label htmlFor="" className="flex-1">
                  Title
                </label>
                <span className="chr-count ml-10">26 of 70</span>
              </div>
              <input type="text" className="custom-input" />
            </div>
            <div className="field">
              <label htmlFor="">Slug</label>
              <input type="text" className="custom-input" />
            </div>
            <div className="field">
              <label htmlFor="">Canonical URL</label>
              <input type="text" className="custom-input" />
            </div>
            <div className="field">
              <label htmlFor="">Site Map Priority</label>
              <input type="text" className="custom-input" />
            </div>
            <div className="field">
              <label htmlFor="">Keywords</label>
              <Chip chips={chips} setChips={setChips} />
            </div>
            <div className="field">
              <div className="d-flex">
                <label htmlFor="" className="flex-1">
                  Meta Description
                </label>
                <span className="chr-count ml-10">{value.length} of 70</span>
              </div>
              <textarea
                className="custom-input"
                placeholder="Enter Meta Description"
              ></textarea>
              {/* <HighlightWithinTextarea
                ref={textArea}
                highlight={[{ highlight: chips, component: ChipItem }]}
                value={value}
                onChange={(value) => setValue(value)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SEO;
