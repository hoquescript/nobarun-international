import React from 'react';

import Header from './_header';
import Sidebar from './_sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
