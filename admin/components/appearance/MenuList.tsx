import el from 'date-fns/esm/locale/el/index.js';
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import useMenuInfo from '../../hooks/Appearance/useMenuInfo';
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

const parentMenu = ['products', 'categories', 'collections', 'blogs'];

const MenuList = (props: MenuListProps) => {
  const { menuFor } = props;
  const methods = useForm();

  const { register } = methods;

  const [menus, setMenus] = useState<{ [k: string]: any }>({});
  useEffect(() => {
    useMenuInfo().then((menu) => setMenus(menu));
  }, []);

  const selected = useState<{ [k: string]: any }>({});

  const onChangeHandler = (event, parent, slug) => {
    const { name, checked } = event.target;
    console.log({ event, parent, slug });
    let menu: { [k: string]: any };
    if (menus[parent]) {
      menu = menus[parent];
    }
    menu = {};
  };
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
          {parentMenu.map((menu) => (
            <li className={styles.menu__item} key={menu}>
              <label>
                <input
                  type="checkbox"
                  name="edit"
                  // checked={permission[menu].edit}
                  // onChange={(e) => onPermissionChange(e, menu)}
                />
                {menu}
              </label>
              <ul className={styles.menu__sub_list}>
                {menus[menu] &&
                  menus[menu].map((url, idx) => (
                    <li className={styles.menu__sub_item} key={url.slug + idx}>
                      <label>
                        <input
                          type="checkbox"
                          name={url.slug}
                          checked={selected[menu] && selected[menu][url.slug]}
                          onChange={(e) => onChangeHandler(e, menu, url.slug)}
                        />
                        {url.name}
                      </label>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MenuList;
