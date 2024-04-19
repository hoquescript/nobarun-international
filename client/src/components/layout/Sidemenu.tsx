import Accordion from '@component/accordion/Accordion';
import AccordionHeader from '@component/accordion/AccordionHeader';
import Box from '@component/Box';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import Icon from '@component/icon/Icon';
import NavLink from '@component/nav-link/NavLink';
import { SemiSpan } from '@component/Typography';
import navigations from '@data/groceryNavigations';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface SidemenuProps {
  categoriesList?: any;
  isfixed?: boolean;
}

const Sidemenu: React.FC<SidemenuProps> = ({ categoriesList, isfixed }) => {
  return (
    <Card
      position="relative"
      boxShadow="large"
      height="100%"
      borderRadius={0}
      overflow={isfixed ? 'auto' : 'unset'}
      className="sidebar-menu"
    >
      <Accordion>
        <AccordionHeader
          color="inherit"
          justifyContent="flex-start"
          className="sidebar-menu__category"
        >
          <Box flex="1 1 0">
            <FlexBox flex="1 1 0">
              <Icon variant="small" mr="0.75rem" defaultcolor="currentColor">
                categories
              </Icon>
              <SemiSpan color="inherit" fontWeight="600" mr="9px" flex="1 1 0">
                Browse All Categories
              </SemiSpan>
            </FlexBox>
          </Box>
        </AccordionHeader>
        {categoriesList.map((item) => (
          <NavLink
            href={'/category/' + item.slug}
            color="gray.700"
            key={item.slug}
          >
            <FlexBox key={item.name} mt=".5rem" ml=".5rem">
              {item?.image && (
                <LazyLoadImage
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.icon}
                  alt={item.name + 'icon'}
                  height={30}
                  width={30}
                />
              )}
              <SemiSpan ml="1rem" py="6px" color="inherit" flex="1 1 0">
                {item.name}
              </SemiSpan>
            </FlexBox>
          </NavLink>
        ))}
      </Accordion>

      {navigations.map((item) => (
        <Box
          mb="1rem"
          key={item.name}
          color="gray.700"
          className="sidebar-menu__link"
        >
          <NavLink href={'/' + item.slug} color="gray.700">
            <FlexBox py="6px" color="inherit" key={item.name}>
              <Icon variant="small" mr="0.75rem">
                {item.icon}
              </Icon>
              <SemiSpan color="inherit" fontWeight="600" mr="9px" flex="1 1 0">
                {item.name}
              </SemiSpan>
            </FlexBox>
          </NavLink>
        </Box>
      ))}
    </Card>
  );
};

export default Sidemenu;
