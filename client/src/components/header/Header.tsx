import Box from '@component/Box';
import Image from '@component/Image';
import Sidenav from '@component/sidenav/Sidenav';
import useWindowSize from '@hook/useWindowSize';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import Container from '../Container';
import FlexBox from '../FlexBox';
import Icon from '../icon/Icon';
import StyledHeader from './HeaderStyle';
const SearchBox = dynamic(() => import('../search-box/SearchBox'));
const Sidemenu = dynamic(() => import('@component/layout/Sidemenu'));

type HeaderProps = {
  className?: string;
  count?: number | string;
  categories?: any[];
};

const Header: React.FC<HeaderProps> = ({ count, categories, className }) => {
  const width = useWindowSize();
  const isTablet = width < 900;

  return (
    <StyledHeader className={className}>
      {isTablet && (
        <Box bg="#fff">
          <FlexBox width="100%" alignItems="center" py="1em" px="1em">
            <FlexBox flex="1 1 0" pt=".5em" px="1em">
              <SearchBox count={count} />
            </FlexBox>

            {isTablet && (
              <Sidenav position="left" handle={<Icon mx="1rem">menu</Icon>}>
                <Sidemenu categoriesList={categories} />
              </Sidenav>
            )}
          </FlexBox>
        </Box>
      )}
      {!isTablet && (
        <Container
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <FlexBox className="logo" alignItems="center" mr="1rem">
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

          <FlexBox justifyContent="center" flex="1 1 0">
            <SearchBox count={count} />
          </FlexBox>
          {/* {!isTablet && <Whatsapp width={width} />} */}
        </Container>
      )}
    </StyledHeader>
  );
};

export default Header;
