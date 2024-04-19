import Box from '@component/Box';
import { H2, H5, SemiSpan } from '@component/Typography';
import { Line } from 'rc-progress';
import React from 'react';

const StarRating = ({ details, isLaptop }) => {
  return (
    <Box ml={isLaptop ? '3rem' : ''} className="star__wrapper">
      {isLaptop && <H2 mb="2rem">Rating Statistics</H2>}
      {details?.slice(0, 5).map((detail) => (
        <Box className="star" key={detail?.title}>
          <H5 className="star__star">{detail?.title}</H5>
          <Line
            className="star__rating"
            percent={detail?.percent}
            strokeColor="#FFCC48"
            strokeLinecap="butt"
          />
          <SemiSpan className="star__percentage">
            {Math.round(detail?.percent)}%
          </SemiSpan>
        </Box>
      ))}
    </Box>
  );
};

export default StarRating;
