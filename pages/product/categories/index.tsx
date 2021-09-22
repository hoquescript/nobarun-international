import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaGripVertical,
  FaEllipsisV,
  FaTrash,
  FaPen,
  FaPlusCircle,
} from 'react-icons/fa';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import Togglebar from '../../../components/controls/togglebar';

import styles from '../../../styles/pages/products.module.scss';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

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
    // children: null,
    // children:[ '1','2'],
    children: [
      {
        id: 2,
        name: 'Commercial Kitchen Equipment',
        description: 'The freshest organic ingredients for milk making',
        children: [
          {
            id: 2,
            name: 'Commercial Kitchen Equipment',
            description: 'The freshest organic ingredients for milk making',
          },
        ],
      },
    ],
  },
  // { id: 3, text: 'Lisa' },
];

const GET_ALL_CATEGORY = gql`
  query allCategory {
    getCategories
  }
`;

interface renderItemProps {
  item: any;
  index: any;
  collapseIcon: any;
  handler: any;
}
const renderItem = (props: renderItemProps) => {
  const { item, index, collapseIcon, handler } = props;
  // const [published, setPublished] = useState(false);
  return (
    <div className="row">
      <div className="col-1 flex ct" style={{ cursor: 'move' }}>
        <FaGripVertical className="mb-20" />
      </div>
      <div className="col-3">
        <h3 className="custom-input">{item.name}</h3>
      </div>
      <div className="col-5">
        <div
          className="custom-input"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
      <div className="col-3 row">
        <div className="col-5">
          <figure className={`${styles.category__image} center`}>
            <img src="/images/product-img.jpg" alt="" />
          </figure>
        </div>
        <div className="col-7 flex ct">
          <Togglebar checked={true} />
          <span className={`ml-20 ${styles.category__menu}`}>
            <FaEllipsisV />
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
    </div>
  );
};

const Categories = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_ALL_CATEGORY);
  if (loading) return 'Loading...';
  if (error) return `Fetching error! ${error.message}`;
  const categories = JSON.parse(data?.getCategories);
  console.log(categories);

  return (
    <div className="container center">
      <div className="flex sb mb-60">
        <h1 className="heading-primary">Categories</h1>
        <Link href="/product/categories/add">
          <a className="btn-outline-green small mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Category
          </a>
        </Link>
      </div>
      <div className="row">
        <div className="col-1" />
        <div className="col-3 center">Name</div>
        <div className="col-5 center">Description</div>
        <div className="col-3 row">
          <div className="col-5 center">Image</div>
          <div className="col-7 center">Status</div>
        </div>
        <div className="col-12">
          <Nestable
            items={categories}
            renderItem={renderItem}
            onChange={(items) => {
              // console.log(items);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
