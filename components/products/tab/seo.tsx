import React from 'react';

const SEO = () => {
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
              <input type="text" className="custom-input" />
            </div>
            <div className="field">
              <div className="d-flex">
                <label htmlFor="" className="flex-1">
                  Meta Description
                </label>
                <span className="chr-count ml-10">26 of 70</span>
              </div>
              <input type="text" className="custom-input" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SEO;
