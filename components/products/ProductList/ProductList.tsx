import React from 'react';
import ProductImage from './../../../public/images/product-img.jpg';

interface ProductListProps {
  image: string;
  name: string;
  categoryId: string;
  brand: string;
}
const ProductList = (props: ProductListProps) => {
  const { name, categoryId, brand, image } = props;
  return (
    <table className="custom-table products-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Type</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Sold</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <figure className="mr-10">
                <img
                  src={
                    image && image.startsWith('https')
                      ? image
                      : ProductImage.src
                  }
                  alt=""
                />
              </figure>
              {name}
            </div>
          </td>
          <td>{categoryId}</td>
          <td>{brand}</td>
          <td>19.99</td>
          <td>2078</td>
          <td>289</td>
          <td>
            <div className="custom-table__actions d-flex align-items-center">
              <button
                type="button"
                className="btn-icon-fade btn-icon-small show-panel"
                data-target="#item-coupons-panel"
              >
                <i className="ticket-alt-icon"></i>
              </button>
              <button
                type="button"
                className="btn-icon-fade btn-icon-small show-panel"
                data-target="#tags-panel"
              >
                <i className="tags-icon"></i>
              </button>
              <button type="button" className="btn-icon-fade btn-icon-small">
                <i className="layer-plus-icon"></i>
              </button>
              <button type="button" className="btn-icon-fade btn-icon-small">
                <i className="chart-bar-icon"></i>
              </button>
              <label htmlFor="publish12" className="custom-switch">
                <input type="checkbox" id="publish12" />
                <span>&nbsp;</span>
              </label>
              <div className="dropdown">
                <button
                  type="button"
                  className="btn-icon-fade btn-icon-small dropdown__toggle"
                >
                  <i className="ellipsis-v-icon"></i>
                </button>
                <div className="dropdown__menu">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="pen-icon"></i>
                        Edit
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="clone-icon"></i>
                        Clone
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-red">
                        <i className="trash-icon"></i>
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductList;
