import React, { useState } from 'react';
import Link from 'next/link';
import {
  BiDownArrow,
  BiCart,
  BiAt,
  BiCommentDots,
  BiCog,
  BiCustomize,
} from 'react-icons/bi';
import { RiQuestionAnswerLine, RiSlackFill } from 'react-icons/ri';
import { BsFillGridFill, BsPeople } from 'react-icons/bs';

import styles from './_sidebar.module.scss';
import slug from '../helpers/slugGenerator';
import { useRouter } from 'next/dist/client/router';

const MENU: { [key: string]: string[] } = {
  Dashboard: [],
  Product: ['Add New Product', 'Products', 'Categories', 'Collections'],
  Blogs: ['Add New Post', 'Blog Post', 'Categories'],
  Review: ['Add New Review', 'Reviews'],
  'Query Report': ['Add New Query', 'Queries'],
  Client: ['Add New Client', 'Clients'],
  Media: ['Images', 'Videos'],
  Settings: [
    'Accounts',
    'Contact Person',
    'Stock Status',
    'Add Script',
    '301 Redirect',
  ],
};
const ICONS = [
  <BsFillGridFill />,
  <BiCart />,
  <BiAt />,
  <BiCommentDots />,
  <RiQuestionAnswerLine />,
  <BsPeople />,
  <RiSlackFill />,
  <BiCog />,
];

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
    <aside className={styles.sidebar}>
      <ul className={styles.sidebar__list}>
        {Object.keys(MENU).map((menu, idx) => (
          <li
            key={menu}
            className={`${styles.sidebar__item} ${
              open[menu] ? styles.sidebar__item_active : ''
            }`}
            onClick={() => menuOpenHandler(menu)}
          >
            {/* <Link href={menu !== 'Dashboard' ? '' : '/'}> */}
            <a className={styles.sidebar__link}>
              <div>
                <span>{ICONS[idx]}</span>
                {menu}
              </div>
              {menu !== 'Dashboard' && (
                <BiDownArrow className={styles.sidebar__collapse_icon} />
              )}
            </a>
            {/* </Link> */}
            <ul
              className={`${styles.sidebar__sublist} ${
                open[menu] ? styles.sidebar__sublist_active : ''
              }`}
            >
              {MENU[menu].map((submenu) => (
                <li key={submenu} className={styles.sidebar__subitem}>
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
    </aside>
  );
};

export default Sidebar;
