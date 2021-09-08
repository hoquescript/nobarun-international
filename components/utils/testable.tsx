import Nestable from 'react-nestable';

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import 'react-nestable/dist/styles/index.css';

import React from 'react';
import Textfield from '../controls/textfield';
import Togglebar from '../controls/togglebar';
import { FaEllipsisH, FaTrash, FaPen, FaGripVertical } from 'react-icons/fa';

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
    <div className="row">
      <div className="col-1">
        <FaGripVertical />
      </div>
      <div className="col-3">
        <h3 className="custom-input">{item.name}</h3>
      </div>
      <div className="col-5">
        <h3 className="custom-input">{item.description}</h3>
      </div>
      <div className="col-3">
        <figure>
          <button type="button" className="remove-image">
            <i className="times-icon"></i>
          </button>
          <img src="/images/product-img.jpg" alt="" />
        </figure>
        <Togglebar />
        <span className="table__icon menu" style={{ marginLeft: '3rem' }}>
          <FaEllipsisH />
          <div className="table__action_menu">
            <button>
              <FaTrash />
            </button>
            <button>
              <FaPen />
            </button>
          </div>
        </span>
      </div>
    </div>
  );
};

const testable = () => {
  // console.log(items);
  // const renderItem = ({ item }) => item.text;

  return (
    <div className="row">
      <div className="col-1" />
      <div className="col-3">Name</div>
      <div className="col-5">Description</div>
      <div className="col-3 row">
        <div className="col-5">Image</div>
        <div className="col-7">Status</div>
      </div>
      <div className="col-12">
        <Nestable
          items={items}
          renderItem={renderItem}
          onChange={(items) => {
            // console.log(items);
          }}
        />
      </div>
    </div>
  );
};

export default testable;
