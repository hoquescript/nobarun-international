import React from 'react';
import Link from 'next/link';
import { BiDownArrow } from 'react-icons/bi';

import styles from './_sidebar.module.scss';

const MENU = {
  Dashboard: [],
  Shop: ['Categories', 'Products', 'Add product'],
  Blog: ['Categories', 'Blog Post'],
  'Query Report': ['Add New Query', 'Queries'],
  'Media & Menus': ['Media', 'Menus'],
  Settings: [
    'Contacts, Stock Status',
    '101 Redirect',
    'Add Script',
    'Accounts',
  ],
};

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebar__list}>
        {Object.keys(MENU).map((menu) => (
          <li key={menu} className={styles.sidebar__item}>
            <Link href={menu}>
              <a className={styles.sidebar__link}>
                <div>
                  <span>
                    <i />
                  </span>
                  {menu}
                </div>
                <BiDownArrow className={styles.sidebar__collapse_icon} />
              </a>
            </Link>
            <ul style={{ marginLeft: '2rem', marginTop: '.5rem' }}>
              {MENU[menu].map((submenu) => (
                <li className={styles.sidebar__subitem}>
                  <Link href={menu}>
                    <a className={styles.sidebar__link}>
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
