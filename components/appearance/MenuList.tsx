import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from '../../styles/pages/appearance.module.scss';

const MenuList = () => {
  const [listType, setListType] = useState('all');
  return (
    <>
      <div className={styles.menu__search}>
        <input type="text" className="custom-input" placeholder="Find a Menu" />
        <AiOutlineSearch />
      </div>
      <div className={styles.menu__wrapper}>
        <ul className={styles.menu__tab_wrapper}>
          <li>All</li>
          <li>Selected</li>
        </ul>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <label>
              <input
                type="checkbox"
                name="edit"
                // checked={permission[menu].edit}
                // onChange={(e) => onPermissionChange(e, menu)}
              />
              Select All(3 items)
            </label>
          </li>
          <li className={styles.menu__item}>
            <label>
              <input
                type="checkbox"
                name="edit"
                // checked={permission[menu].edit}
                // onChange={(e) => onPermissionChange(e, menu)}
              />
              T-shirt Collection
            </label>
          </li>
          <li className={styles.menu__item}>
            <label>
              <input
                type="checkbox"
                name="edit"
                // checked={permission[menu].edit}
                // onChange={(e) => onPermissionChange(e, menu)}
              />
              About Us
            </label>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuList;
