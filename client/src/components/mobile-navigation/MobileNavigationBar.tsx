import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import Icon from '../icon/Icon';
import StyledMobileNavigationBar from './MobileNavigationBar.style';

interface MobileNavigationBarProps {
  phone?: string;
  setIsOpen?: any;
  product?: any;
}
const MobileNavigationBar: React.FC<MobileNavigationBarProps> = (props) => {
  const { phone, setIsOpen, product } = props;
  const width = useWindowSize();
  const message = `Hello ${product?.contact?.name},
I want to know more about ${product?.intro?.productName} Which Product Code is ${product?.intro?.productCode}
Product Link: https://www.nobarunbd.com/${product.slug}
Please send me more details.
}`;
  return (
    width <= 1025 && (
      <StyledMobileNavigationBar>
        <a
          className="whatsapp"
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURI(
            message,
          )}`}
        >
          <Icon size="23px" className="icon">
            whatsapp
          </Icon>
          Whatsapp Chat
        </a>
        <a href={`tel:${phone}`} className="call">
          <Icon size="23px" className="icon">
            call-small
          </Icon>
          Phone Call
        </a>
        <a
          className="quote"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <Icon size="23px" className="icon">
            quote
          </Icon>
          Get a Quote
        </a>
      </StyledMobileNavigationBar>
    )
  );
};

export default MobileNavigationBar;
