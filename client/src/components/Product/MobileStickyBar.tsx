import FlexBox from '@component/FlexBox';
import Sticky from '@component/sticky/Sticky';
import useWindowSize from '@hook/useWindowSize';
import React from 'react';
import Scrollspy from 'react-scrollspy';

interface MobileStickyBarProps {
  active: boolean;
  product: any;
  setIsOpen: any;
  reviewLength: number;
}
const MobileStickyBar = (props: MobileStickyBarProps) => {
  const { active, setIsOpen, reviewLength } = props;
  const width = useWindowSize();
  const isTablet = width < 900;
  return (
    <Sticky fixedOn={0}>
      <div>
        {active && isTablet && (
          <FlexBox className="product__sticky-tab">
            <Scrollspy
              items={['details', 'keypoints', 'questions', 'reviews']}
              currentClassName="product__sticky-btn--active"
            >
              <a href="#details" className={`product__sticky-btn`}>
                Details
              </a>

              <a href="#keypoints" className={`product__sticky-btn`}>
                Key Points of Product
              </a>
              <a href="#questions" className={`product__sticky-btn`}>
                Question & Answers
              </a>
              <a href="#reviews" className={`product__sticky-btn`}>
                Reviews{reviewLength ? ` ( ${reviewLength} )` : ''}
              </a>
              <a
                href="#addQuote"
                className="product__sticky-btn"
                style={{
                  background: '#ec1c24',
                  color: '#fff',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
              >
                Get a Quote
              </a>
            </Scrollspy>
          </FlexBox>
        )}
      </div>
    </Sticky>
  );
};

export default MobileStickyBar;
