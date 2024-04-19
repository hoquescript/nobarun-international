import FlexBox from '@component/FlexBox';
import Icon from '@component/icon/Icon';
import { H2, SemiSpan } from '@component/Typography';
import useWindowSize from '@hook/useWindowSize';
import Link from 'next/link';
import React from 'react';

export interface CategorySectionHeaderProps {
  title?: string;
  seeMoreLink?: string;
  iconName?: string;
}

const CategorySectionHeader: React.FC<CategorySectionHeaderProps> = ({
  title,
  seeMoreLink,
}) => {
  const width = useWindowSize();
  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <FlexBox alignItems="center">
        {/* {iconName && (
          <Icon defaultcolor="auto" mr="0.5rem">
            {iconName}
          </Icon>
        )} */}
        <H2
          fontWeight="600"
          lineHeight="1"
          fontSize={width < 600 ? (width < 400 ? '20px' : '26px') : '32px'}
          mb="1.5rem"
          ml={width < 600 ? '1rem' : '0'}
          style={{
            textTransform: 'capitalize',
            transform: 'translateY(.8rem)',
          }}
        >
          {title}
        </H2>
      </FlexBox>

      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <a>
            <FlexBox alignItems="center" ml="0.5rem" color="text.muted">
              <SemiSpan mr="0.5rem">View all</SemiSpan>
              <Icon size="12px" defaultcolor="currentColor">
                right-arrow
              </Icon>
            </FlexBox>
          </a>
        </Link>
      )}
    </FlexBox>
  );
};

export default CategorySectionHeader;
