import Box from '@component/Box';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import Typography, { H2 } from '@component/Typography';
import useWindowSize from '@hook/useWindowSize';
import React from 'react';

const Features = ({ features }) => {
  const width = useWindowSize();
  const isTablet = width < 900;
  return (
    <Box py={isTablet ? '1.2rem' : '2.2rem'}>
      {features?.map((feature, idx) => (
        <Card
          px="2rem"
          py="3rem"
          mb="2rem"
          key={feature.title + idx}
          className="product__keypoints"
        >
          {isTablet && (
            <H2 fontSize="32px" mb="15px">
              {feature.title}
            </H2>
          )}
          <FlexBox
            justifyContent="center"
            className={
              idx % 2 !== 0
                ? 'product__keypoints--left'
                : 'product__keypoints--right'
            }
          >
            <span className="product__keypoints-image">
              {feature?.images.length > 0 ? (
                <img
                  data-src={process.env.NEXT_PUBLIC_IMAGE_URL + feature?.images[0]}
                  alt="Featured Image"
                  className="lazyload"
                />
              ) : (
                <img src="/assets/images/features.png" alt="Featured Image" />
              )}
            </span>
          </FlexBox>
          <div>
            {!isTablet && (
              <H2 fontSize="32px" mb="15px">
                {feature.title}
              </H2>
            )}
            <Typography>
              {feature.content && feature.content.length &&
                <div className="product__keypoints-content"
                  dangerouslySetInnerHTML={{
                    __html: feature?.content.replace('font-family:Titillium', ''),
                  }}></div>
              }
            </Typography>
          </div>
        </Card>
      ))}
    </Box>
  );
};

export default Features;
