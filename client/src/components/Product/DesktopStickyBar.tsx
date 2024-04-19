import Box from '@component/Box';
import Container from '@component/Container';
import FlexBox from '@component/FlexBox';
import Rating from '@component/rating/Rating';
import { H1, Span } from '@component/Typography';
import useWindowSize from '@hook/useWindowSize';
import React from 'react';
import Scrollspy from 'react-scrollspy';

interface DesktopStickyBarProps {
  active: boolean;
  product: any;
  setIsOpen: any;
  reviewLength: number;
}
const DesktopStickyBar = (props: DesktopStickyBarProps) => {
  const { active, product, setIsOpen, reviewLength } = props;
  const width = useWindowSize();
  const isTablet = width < 900;
  return (
    <>
      {!isTablet && (
        <Box
          className={`product__sticky ${
            active ? 'product__sticky--active' : ''
          }`}
        >
          <Container>
            <FlexBox alignItems="center" justifyContent="space-between">
              <FlexBox width={width > 1400 ? '50%' : '42%'}>
                <img
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    product?.intro?.featuredImage?.src
                  }
                  alt="1121"
                  className="product__sticky-image"
                />
                <Box>
                  <H1 fontSize="18px" mt={reviewLength === 0 ? '1rem' : '0rem'}>
                    {product?.intro?.productName}
                  </H1>
                  {reviewLength > 0 && (
                    <FlexBox
                      flexDirection={width > 660 ? 'row' : 'column'}
                      alignItems={width > 660 ? 'center' : 'flex-start'}
                      flexWrap="nowrap"
                    >
                      <Rating
                        outof={5}
                        value={product?.intro?.rating}
                        color="warn"
                        size="medium"
                      />
                      <a href="#reviews">
                        <Span ml={width > 660 ? '1em' : '0em'} color="#0082C9">
                          {reviewLength} Real Customer Reviews
                        </Span>
                      </a>
                    </FlexBox>
                  )}
                </Box>
              </FlexBox>
              <Box>
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
              </Box>
            </FlexBox>
          </Container>
        </Box>
      )}
    </>
  );
};

export default DesktopStickyBar;
