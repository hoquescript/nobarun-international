import useWindowSize from '@hook/useWindowSize';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { getTheme } from '../../utils/utils';
import Box from '../Box';
import Container from '../Container';
import FlexBox from '../FlexBox';
import Grid from '../grid/Grid';
import Icon from '../icon/Icon';
import Typography from '../Typography';

const StyledLink = styled.span`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  text-decoration: underline;
  :hover {
    color: ${getTheme('colors.gray.100')};
  }
`;

const Footer: React.FC = () => {
  const width = useWindowSize();
  const Blog = (
    <Grid item lg={3} md={width < 1025 ? 12 : 6}>
      <Typography fontSize="26px" fontWeight="600" mb="1.25rem" lineHeight="1">
        Important Links
      </Typography>
      <div>
        <Link href="/about">
          <a>
            <StyledLink>About Us</StyledLink>
          </a>
        </Link>
        <Link href="/clients">
          <a>
            <StyledLink>Clients</StyledLink>
          </a>
        </Link>
        <Link href="/terms">
          <a>
            <StyledLink>Terms</StyledLink>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <StyledLink>Contact Us</StyledLink>
          </a>
        </Link>
        <Link href="/privacy-policy">
          <a>
            <StyledLink>Privacy Policy</StyledLink>
          </a>
        </Link>
      </div>
    </Grid>
  );
  const Contact = (
    <Grid item lg={3} md={6} sm={12} xs={12}>
      <Typography fontSize="18px" mb="1.25rem" textAlign="justify">
        <strong>NOBARUN INTERNATIONAL</strong> is leading supplier of Digital
        Safety & Security Products, Supermarket Equipments, Slaughterhouse
        Equipments & Commercial Kitchen Equipments in Bangladesh.
      </Typography>
      <FlexBox className="flex" mx="-5px">
        {iconList.map((item) => (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer noopenner"
            key={item.iconName}
          >
            <Box
              m="5px"
              size="small"
              p="8px"
              bg="rgba(0,0,0,0.56)"
              border="1px solid #fff"
              borderRadius="50%"
            >
              <Icon size="2.2rem" defaultcolor={item.color}>
                {item.iconName}
              </Icon>
            </Box>
          </a>
        ))}
      </FlexBox>
      <Typography py="0.8rem" fontSize="18px" fontWeight="600">
        Copyright @Nobarun International (2017-2022)
      </Typography>
    </Grid>
  );
  return (
    <footer>
      <Box
        style={{
          backgroundImage: 'linear-gradient(#1CA346,#6FBA1A)',
        }}
      >
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={3} md={6} sm={12}>
                <Typography
                  fontSize="26px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Corporate Office
                </Typography>
                <Typography fontSize="16px">Planet Ornate</Typography>
                <Typography fontSize="16px">
                  H#199(1st Floor), R#01,Mohakhali New DOHS
                </Typography>
                <Typography fontSize="16px">Dhaka 1206, Bangladesh.</Typography>
                <Typography fontSize="16px" mb="1rem">
                  Email: nobarunbd@gmail.com
                  <br />
                  Phone: +8801711 998626
                </Typography>
              </Grid>
              {width > 1024 || width < 765 ? Blog : Contact}
              {width < 1024 && width > 765 ? Blog : Contact}
              <Grid item lg={3} md={6} sm={12}>
                <div style={{textAlign:"center"}}>
                  <a href="//www.dmca.com/Protection/Status.aspx?ID=b678e4b2-c844-4be2-a23b-448888201af6"
                     title="DMCA.com Protection Status" className="dmca-badge">
                    <img data-src="https://images.dmca.com/Badges/dmca_protected_24_120.png?ID=b678e4b2-c844-4be2-a23b-448888201af6"
                         alt="DMCA.com Protection Status"
                         width={120}
                         height={70}
                         className="lazyload"/>
                  </a>
                  {/*<script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>*/}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const iconList = [
  {
    iconName: 'facebook',
    url: 'https://www.facebook.com/nobaruninternational',
    color: '#5982db',
  },
  {
    iconName: 'twitter',
    url: 'https://twitter.com/nobarunbd',
    color: '#00acee',
  },
  {
    iconName: 'youtube',
    url: 'https://www.youtube.com/c/NobarunInternational/videos',
    color: '#c4302b',
  },
  {
    iconName: 'google',
    url: 'https://www.google.com/maps/place/Nobarun+International/@23.7850459,90.3987561,16.97z/data=!4m5!3m4!1s0x3755c7404bd1656f:0x7ebd233d85ca7af8!8m2!3d23.78468!4d90.3985879',
    color: '#4285F4',
  },
  {
    iconName: 'pinterest',
    url: 'https://www.pinterest.com/nobaruninternational/',
    color: '#E60023',
  },
];

export default Footer;
