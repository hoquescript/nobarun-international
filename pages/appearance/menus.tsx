import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Menus = () => {
  return (
    <div className="container center">
      <div className="main__content__header mb-40">
        <h2 className="page-title">Menu</h2>
      </div>
      <div className="row">
        <div className="col-7"></div>
        <div className="col-5">
          <div>
            <h3></h3>
            <div></div>
          </div>
          <p>Select the Page, Collection, Categories, Custom Links</p>
          <div>
            <div className="search-input mb-30">
              <AiOutlineSearch className="search-icon" />
              <input
                type="text"
                className="custom-input"
                placeholder="Search"
              />
            </div>
            <div>
              <div>Tabmenu</div>
              <ul>
                <li>Select All(3 items)</li>
                <li>T-shirt Collection</li>
                <li>About Us</li>
              </ul>
            </div>
            <div>
              <h4>Custom Link</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menus;
