import Box from '@component/Box';
import Card from '@component/Card';
import MenuItem from '@component/MenuItem';
import navbarNavigations from '@data/navbarNavigations';
import dynamic from 'next/dynamic';
import React from 'react';
import Button from '../buttons/Button';
// import Categories from '../categories/Categories';
import Container from '../Container';
import FlexBox from '../FlexBox';
import Icon from '../icon/Icon';
import NavLink from '../nav-link/NavLink';
import Typography, { Span } from '../Typography';
import StyledNavbar from './NavbarStyle';
import RecentViewedProducts from './RecentViewedProducts';

const Categories = dynamic(() => import('../categories/Categories'));

export interface NavbarProps {
  navListOpen?: boolean;
  noOfCategory?: number;
  height?: number;
  categories?: any[];
}

interface Nav {
  title: string;
  url: string;
  child: Nav[];
  extLink?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ navListOpen, height, categories }) => {
  const renderNestedNav = (list: any[], isRoot = false) => {
    return list?.map((nav: Nav) => {
      if (isRoot) {
        if (nav.url && nav.extLink)
          return (
            <NavLink
              className="nav-link"
              href={nav.url}
              key={nav.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.title}
            </NavLink>
          );
        else if (nav.url)
          return (
            <NavLink className="nav-link" href={nav.url} key={nav.title}>
              {nav.title}
            </NavLink>
          );
        if (nav.child)
          return (
            <FlexBox
              className="root"
              position="relative"
              flexDirection="column"
              alignItems="center"
              key={nav.title}
            >
              <Span className="nav-link">{nav.title}</Span>
              <Box className="root-child">
                <Card
                  mt="1.25rem"
                  py="0.5rem"
                  boxShadow="large"
                  minWidth="230px"
                >
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </FlexBox>
          );
      } else {
        if (nav.url)
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                <Span fontSize="14px">{nav.title}</Span>
              </MenuItem>
            </NavLink>
          );

        if (nav.child)
          return (
            <Box
              className="parent"
              position="relative"
              minWidth="230px"
              key={nav.title}
            >
              <MenuItem color="gray.700">
                <Span flex="1 1 0" fontSize="14px">
                  {nav.title}
                </Span>
                <Icon size="8px" defaultcolor="currentColor">
                  right-arrow
                </Icon>
              </MenuItem>
              <Box className="child" pl="0.5rem">
                <Card py="0.5rem" boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </Box>
          );
      }
    });
  };

  return (
    <StyledNavbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <Categories open={navListOpen} height={height} categories={categories}>
          <Button
            width="30rem"
            height="40px"
            style={{
              width: '302px',
              backgroundColor: '#fff',
              borderRadius: 0,
              margin: '1px 0',
            }}
            variant="text"
          >
            <Icon>categories</Icon>
            <Typography
              fontSize="1.8rem"
              fontWeight="600"
              textAlign="left"
              flex="1 1 0"
              ml="1rem"
              color="#000"
            >
              Browse Categories
            </Typography>
            <Icon className="dropdown-icon" variant="small">
              chevron-right
            </Icon>
          </Button>
        </Categories>
        <FlexBox
          style={{ flexGrow: 1 }}
          justifyContent="space-between"
          px="40px"
        >
          <div>{renderNestedNav(navbarNavigations, true)}</div>
          <FlexBox
            className="root"
            position="relative"
            flexDirection="column"
            alignItems="center"
          >
            <Span className="nav-link">
              <FlexBox alignItems="center">
                Your Recent Views
                <Icon size="16px" ml="5px" mt="3px" defaultcolor="currentColor">
                  angle-double-down-solid
                </Icon>
              </FlexBox>
            </Span>
            <Box
              className="root-child"
              style={{ right: '-2.5rem', left: 'unset', zIndex: 100 }}
            >
              <Card
                mt="1.25rem"
                py="0.5rem"
                boxShadow="large"
                maxWidth="1200px"
              >
                <RecentViewedProducts />
              </Card>
            </Box>
          </FlexBox>

          {/* </FlexBox> */}
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
