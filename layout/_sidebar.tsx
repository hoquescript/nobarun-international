import React, { useState } from 'react';
import Link from 'next/link';
import { BiDownArrow } from 'react-icons/bi';

import styles from './_sidebar.module.scss';
import slug from '../helpers/slugGenerator';
import { useRouter } from 'next/dist/client/router';

const MENU: { [key: string]: string[] } = {
  Dashboard: [],
  Products: ['Add New Products', 'Products', 'Categories', 'Collections'],
  Blogs: ['Add New Post', 'Blog Post', 'Categories'],
  'Query Report': ['Add New Query', 'Queries'],
  Appearance: ['Pages', 'Menus', 'Media'],
  Settings: [
    'Accounts',
    'Contact Person',
    'Stock Status',
    'Add Script',
    '301 Redirect',
  ],
};

const resetState = () => {
  const state: { [key: string]: boolean } = {};
  Object.keys(MENU).map((menu) => {
    state[menu] = false;
  });
  return state;
};

const Sidebar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(resetState());
  const menuOpenHandler = (key: string) => {
    if (key === 'Dashboard') return router.push('/');
    setOpen({
      ...resetState(),
      [key]: !open[key],
    });
  };
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebar__list}>
        {Object.keys(MENU).map((menu) => (
          <li
            key={menu}
            className={`${styles.sidebar__item} ${
              open[menu] ? styles.sidebar__item_active : ''
            }`}
            onClick={() => menuOpenHandler(menu)}
          >
            <a className={styles.sidebar__link}>
              <div>
                <span>
                  <i />
                </span>
                {menu}
              </div>
              {menu !== 'Dashboard' && (
                <BiDownArrow className={styles.sidebar__collapse_icon} />
              )}
            </a>
            <ul
              className={`${styles.sidebar__sublist} ${
                open[menu] ? styles.sidebar__sublist_active : ''
              }`}
            >
              {MENU[menu].map((submenu) => (
                <li className={styles.sidebar__subitem}>
                  <Link href={`/${slug(menu)}/${slug(submenu)}`}>
                    <a
                      className={`${styles.sidebar__link} ${styles.sidebar__sublink}`}
                    >
                      <div>
                        <span>
                          <i />
                        </span>
                        {submenu}
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
