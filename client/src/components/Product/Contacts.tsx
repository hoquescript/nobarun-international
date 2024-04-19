import Button from '@component/buttons/Button';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import Icon from '@component/icon/Icon';
// import ProductCard from '@component/product-cards/HeadlineCard';
import Typography, { H5, Paragraph } from '@component/Typography';
// import { getDay, getHours } from 'date-fns';
import React, { Fragment } from 'react';

const Contacts = ({ slug, productName, productCode, contact, setIsOpen }) => {
  // const currentDate = new Date();
  // const day = getDay(currentDate);
  // const hours = getHours(currentDate);
  const message = `Hello ${contact?.name},
I want to know more about ${productName} Which Product Code is ${productCode}
Product Link: https://www.nobarunbd.com/${slug}
Please send me more details.
`;

  return (
    <Fragment>
      <Card px="1rem" py="1rem" mb="2rem">
        {contact?.companyLogo && (
          <div className="product__contact-logo">
            <img
              width={200}
              height={51}
              src={process.env.NEXT_PUBLIC_IMAGE_URL + contact?.companyLogo}
              alt="logo"
              style={{maxHeight:"60px"}}
            />
          </div>
        )}
        {contact?.name && (
          <FlexBox alignItems="center" mb=".8rem">
            <div className="product__contact-icon">
              <Icon size="2.4rem">profile</Icon>
            </div>
            <H5 ml="1rem" fontSize="22px">
              {contact?.name}
            </H5>
          </FlexBox>
        )}
        {contact?.whatsAppNumber && (
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${
              contact?.whatsAppNumber
            }&text=${encodeURI(message)}`}
          >
            <FlexBox alignItems="center" mb=".8rem">
              <div className="product__contact-icon">
                <Icon size="2.4rem">call 1</Icon>
              </div>
              <Typography ml="1rem" fontSize="22px">
                {contact?.whatsAppNumber}
              </Typography>
              <img
                width={136}
                height={46}
                src="/whatsapp.png"
                alt="Whatsapp"
                className="product__contact-icon--whatsapp"
              />
            </FlexBox>
          </a>
        )}
        {contact?.email && (
          <FlexBox alignItems="center" mb=".8rem">
            <div className="product__contact-icon">
              <Icon size="2.4rem">sms 1</Icon>
            </div>
            <Typography ml="1rem" fontSize="22px">
              {contact?.email}
            </Typography>
          </FlexBox>
        )}
        {contact?.address && (
          <FlexBox alignItems="center" mb=".8rem">
            <div className="product__contact-icon product__contact-icon-location">
              <Icon size="2.4rem">location 1</Icon>
            </div>
            <Paragraph
              ml="1.2rem"
              fontSize="22px"
              style={{ overflowWrap: 'anywhere' }}
            >
              {contact?.address}
            </Paragraph>
          </FlexBox>
        )}
        <Button
          variant="contained"
          color="primary"
          className="product_quote-btn"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Icon mr="1.5rem" size="1.8rem">
            plus-circles
          </Icon>
          Get a Quote
        </Button>
      </Card>
      {/*{contact?.maps && (*/}
        {/*<ProductCard*/}
          {/*title={*/}
            {/*day === 1*/}
              {/*? 'Today Closed'*/}
              {/*: hours <= 9 || hours > 19*/}
              {/*? 'Today Closed'*/}
              {/*: 'Today Open 09:00 am - 07:00 pm'*/}
          {/*}*/}
        {/*>*/}
          {/*<iframe*/}
            {/*data-src={contact?.maps}*/}
            {/*style={{ width: '100%', height: '46.7rem', border: 0 }}*/}
            {/*allowFullScreen*/}
            {/*loading="lazy"*/}
            {/*className="lazyload"*/}
          {/*/>*/}
        {/*</ProductCard>*/}
      {/*)}*/}
    </Fragment>
  );
};

export default Contacts;
