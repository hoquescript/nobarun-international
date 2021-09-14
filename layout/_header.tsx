import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/client';
import { BsBell } from 'react-icons/bs';

import styles from './_header.module.scss';

import logo from '../public/images/logo.png';
import { AiOutlineLogout } from 'react-icons/ai';

const Header = () => {
  const logoutHandler = () => {
    signOut();
  };
  return (
    <div className={styles.header}>
      {/* ---------Logo---------- */}
      <Image src={logo} height="50" width="250" alt="Logo of Nobarun" />
      {/* ---------Title---------- */}
      <div className={styles.title}>
        <span>
          <i />
        </span>
        <h2>Dashboard</h2>
      </div>
      {/* ---------Profile---------- */}
      <div className={styles.profileWrapper}>
        <div className={styles.notification}>
          <BsBell />
        </div>
        <div className={`ml-20 ${styles.notification}`} onClick={logoutHandler}>
          <AiOutlineLogout />
        </div>
        <span className={styles.seperator} />
        <div className={styles.profile}>
          <Image
            src="/images/profile.jpg"
            width="50"
            height="50"
            alt="Profile Picture"
          />
          <div>
            <h5>Welcome</h5>
            <h3>Sam</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
