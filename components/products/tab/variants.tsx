import React from 'react';

const Variants = () => {
  return (
    <>
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3>Variants</h3>
        </div>
        <div className="wrapper-section__content">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Options</th>
                <th>Values</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" className="custom-input" value="Size" />
                </td>
                <td>
                  <div className="chips">
                    <div className="chip">
                      <span className="chip__title">5lb bag</span>
                      <button type="button" className="chip__remove">
                        <i className="times-icon"></i>
                      </button>
                    </div>
                    <div className="chip">
                      <span className="chip__title">10lb bag</span>
                      <button type="button" className="chip__remove">
                        <i className="times-icon"></i>
                      </button>
                    </div>
                    <div className="chip">
                      <span className="chip__title">12- 8oz Pods </span>
                      <button type="button" className="chip__remove">
                        <i className="times-icon"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="btn-group">
                    <button type="button" className="btn-icon-darkBlue">
                      <i className="plus-icon"></i>
                    </button>
                    <button type="button" className="btn-icon-red">
                      <i className="trash-icon"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" className="custom-input" value="Organic" />
                </td>
                <td>
                  <div className="chips">
                    <div className="chip">
                      <span className="chip__title">Orgnanic</span>
                      <button type="button" className="chip__remove">
                        <i className="times-icon"></i>
                      </button>
                    </div>
                    <div className="chip">
                      <span className="chip__title">Non-Orgnanic</span>
                      <button type="button" className="chip__remove">
                        <i className="times-icon"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="btn-group">
                    <button type="button" className="btn-icon-darkBlue">
                      <i className="plus-icon"></i>
                    </button>
                    <button type="button" className="btn-icon-red">
                      <i className="trash-icon"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3>Variations</h3>
        </div>
        <div className="wrapper-section__content">
          <table className="custom-table">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Variantions</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="variant1" className="custom-radio">
                    <input type="radio" id="variant1" name="default-variant" />
                    <div className="content">&nbsp;</div>
                  </label>
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" readOnly />
                </td>
                <td>
                  <img src="images/product-img.jpg" alt="" />
                </td>
                <td>
                  <label htmlFor="publish2" className="custom-switch ml-auto">
                    <input type="checkbox" id="publish2" />
                    <span>&nbsp;</span>
                  </label>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn-icon-fade dropdown__toggle"
                    >
                      <i className="ellipsis-v-icon"></i>
                    </button>
                    <div className="dropdown__menu">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="pen-icon"></i>
                            Edit Stock
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
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="variant1" className="custom-radio">
                    <input type="radio" id="variant1" name="default-variant" />
                    <div className="content">&nbsp;</div>
                  </label>
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" readOnly />
                </td>
                <td>
                  <img src="images/product-img.jpg" alt="" />
                </td>
                <td>
                  <label htmlFor="publish2" className="custom-switch ml-auto">
                    <input type="checkbox" id="publish2" />
                    <span>&nbsp;</span>
                  </label>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn-icon-fade dropdown__toggle"
                    >
                      <i className="ellipsis-v-icon"></i>
                    </button>
                    <div className="dropdown__menu">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="pen-icon"></i>
                            Edit Stock
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
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="variant1" className="custom-radio">
                    <input type="radio" id="variant1" name="default-variant" />
                    <div className="content">&nbsp;</div>
                  </label>
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" />
                </td>
                <td>
                  <input type="text" className="custom-input" readOnly />
                </td>
                <td>
                  <img src="images/product-img.jpg" alt="" />
                </td>
                <td>
                  <label htmlFor="publish2" className="custom-switch ml-auto">
                    <input type="checkbox" id="publish2" />
                    <span>&nbsp;</span>
                  </label>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn-icon-fade dropdown__toggle"
                    >
                      <i className="ellipsis-v-icon"></i>
                    </button>
                    <div className="dropdown__menu">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="pen-icon"></i>
                            Edit Stock
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Variants;
