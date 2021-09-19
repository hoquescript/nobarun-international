import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from '../../styles/pages/appearance.module.scss';

interface MenuListProps {
  menus: {
    id: any;
    label: string;
    url: string;
    isOpen: boolean;
    isHeader: boolean;
    isFooter: boolean;
    children?: {
      id: any;
      label: string;
      url: string;
      isOpen: boolean;
    }[];
  }[];
  menuFor: string;
}
const MenuList = (props: MenuListProps) => {
  const { menuFor, menus } = props;
  console.log(menus);
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
          {menus.map((menu) => (
            <li className={styles.menu__item}>
              <label>
                <input
                  type="checkbox"
                  name="edit"
                  // checked={permission[menu].edit}
                  // onChange={(e) => onPermissionChange(e, menu)}
                />
                {menu.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MenuList;
