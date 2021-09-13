import React, { useState } from 'react';
import { AiFillSetting, AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';

const Toolbar = () => {
  const [show, setShow] = useState(false);
  return (
    <div
      id="tools-panel"
      className={`side-panel side-panel--floated ${show ? 'active' : ''}`}
    >
      <button
        type="button"
        className="btn-icon-fade side-panel__toggle show-panel"
        data-target="#tools-panel"
        onClick={() => {
          setShow(!show);
        }}
      >
        <AiFillSetting />
      </button>
      <div className="side-panel__title">
        <h3>Tools</h3>
      </div>

      <div className="side-panel__content">
        <div className="accordion">
          <div className="accordion__title has-actions active">
            <h4>Media Gallery</h4>
            <button type="button" className="btn-icon-fade ml-auto">
              <i className="plus-icon"></i>
            </button>
          </div>
          <div
            className="accordion__content active"
            style={{ display: 'block' }}
          >
            <div className="search-input mb-30">
              <AiOutlineSearch className="search-icon" />
              <input
                type="text"
                className="custom-input"
                placeholder="Search"
              />
            </div>
            <div className="images-gallery">
              <div className="images-gallery__image">
                <i className="check-circle-icon selected-mark"></i>
                <figure>
                  <img src="/images/product-img.jpg" alt="" />
                </figure>
                <h5>Kale</h5>
              </div>
              <div className="images-gallery__image">
                <i className="check-circle-icon selected-mark"></i>
                <figure>
                  <img src="/images/product-img.jpg" alt="" />
                </figure>
                <h5>Kale</h5>
              </div>
              <div className="images-gallery__image">
                <i className="check-circle-icon selected-mark"></i>
                <figure>
                  <img src="/images/product-img.jpg" alt="" />
                </figure>
                <h5>Kale</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion">
          <div className="accordion__title">
            <h4>Video Gallery</h4>
          </div>
          <div
            className="accordion__content active"
            style={{ display: 'block' }}
          >
            <div className="field video" style={{ position: 'relative' }}>
              <AiFillYoutube className="video__icon" />
              <input
                type="text"
                className="custom-input video__input"
                placeholder="Post Your Youtube Link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
