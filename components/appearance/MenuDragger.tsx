import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaGripVertical, FaSortDown } from 'react-icons/fa';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';

const items = [
  {
    id: 0,
    name: 'Car Parking Management',
    description: 'Make plant based milks and juices with ease',
  },
  {
    id: 1,
    name: 'Coffee & Tea Business',
    description:
      'Sustainability and freshness is assured with our branded glass bottles',
    children: [
      {
        id: 2,
        name: 'Commercial Kitchen Equipment',
        description: 'The freshest organic ingredients for milk making',
      },
    ],
  },
  // { id: 3, text: 'Lisa' },
];

const renderItem = (props) => {
  const { item, index, collapseIcon, handler } = props;
  console.log(props);
  return (
    <div className="row mr-20">
      <div className="col-1 flex ct" style={{ cursor: 'move' }}>
        <FaGripVertical />
      </div>
      <div className="col-11">
        <div className="menu-accordion">
          <div className="menu-accordion__title active">
            <h4>Media Gallery</h4>
            <FaSortDown />
          </div>
          <div className="menu-accordion__content active">
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
      </div>
    </div>
  );
};

const MenuDragger = () => {
  return (
    <Nestable
      items={items}
      renderItem={renderItem}
      onChange={(items) => {
        // console.log(items);
      }}
    />
  );
};

export default MenuDragger;
