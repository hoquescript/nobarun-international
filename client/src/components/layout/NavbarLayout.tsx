import React from 'react';
import Container from '../Container';
import Navbar from '../navbar/Navbar';
import ProductLayout from './ProductLayout';

type Props = {
  count?: number;
  categories?: any[];
};

const NavbarLayout: React.FC<Props> = ({ count, categories, children }) => {
  return (
    <ProductLayout
      count={count}
      categories={categories}
      navbar={<Navbar categories={categories} />}
    >
      <Container my="10px">{children}</Container>
    </ProductLayout>
  );
};

export default NavbarLayout;
