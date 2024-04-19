import Container from '@component/Container';
import FlexBox from '@component/FlexBox';
import Footer from '@component/footer/Footer';
import GoToTop from '@component/goToTop/GoToTop';
import Header from '@component/header/Header';
import Image from '@component/Image';
import Navbar from '@component/navbar/Navbar';
import Sticky from '@component/sticky/Sticky';
import useWindowSize from '@hook/useWindowSize';
import Link from 'next/link';
import React from 'react';
import StyledAppLayout from './AppLayoutStyle';

type Props = {
  title?: string;
  navbar?: React.ReactChild;
  count?: number;
  categories?: any[];
};

const OtherLayout: React.FC<Props> = ({ count, categories, children }) => {
  const width = useWindowSize();
  const isTablet = width < 900;

  return (
    <StyledAppLayout>
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
      <GoToTop showBelow={250} />
      <Sticky fixedOn={0}>
        <div>
          <Header count={count} categories={categories} />
        </div>
      </Sticky>
      <Navbar categories={categories} />
      <Container>{children}</Container>
      <Footer />
    </StyledAppLayout>
  );
};

export default OtherLayout;
