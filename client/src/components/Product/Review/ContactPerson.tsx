import Box from '@component/Box';
import Button from '@component/buttons/Button';
import FlexBox from '@component/FlexBox';
import Icon from '@component/icon/Icon';
import Image from '@component/Image';
import Typography, { H5, Paragraph } from '@component/Typography';
import React from 'react';

const ContactPerson = ({
  slug,
  productName,
  productCode,
  contact,
  setIsOpen,
}) => {
  const message = `Hello ${contact?.name},
I want to know more about ${productName} Which Product Code is ${productCode}
Product Link: https://www.nobarunbd.com/${slug}
Please send me more details.
`;

  return (
    <Box px="1rem" py="1rem" mb="2rem">
      {contact?.companyLogo && (
        <div className="product__contact-logo">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + contact?.companyLogo}
            alt="logo"
            maxHeight="60px"
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
            <Image
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
    </Box>
  );
};

export default ContactPerson;
