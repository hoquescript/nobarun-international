import FlexBox from '@component/FlexBox';
import Footer from '@component/footer/Footer';
import Header from '@component/header/Header';
import Image from '@component/Image';
import useWindowSize from '@hook/useWindowSize';
import Link from 'next/link';
import React from 'react';
import StyledProductLayout from './AppLayoutStyle';

type Props = {
  title?: string;
  navbar?: React.ReactChild;
  count?: number;
  categories?: any[];
};

const ProductLayout: React.FC<Props> = ({
  count,
  categories,
  children,
  navbar,
}) => {
  const width = useWindowSize();
  const isTablet = width < 900;

  return (
    <StyledProductLayout>
      {isTablet && (
        <FlexBox
          justifyContent="center"
          alignItems="center"
          mr="1rem"
          bg="#fff"
        >
          <Link href="/">
            <a>
              <Image
                src="/assets/images/logo.svg"
                alt="logo"
                height="50px"
                width="200px"
              />
            </a>
          </Link>
        </FlexBox>
      )}
      <Header count={count} categories={categories} />
      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}
      <Footer />
    </StyledProductLayout>
  );
};

export default ProductLayout;
