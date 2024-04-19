import Box from '@component/Box';
import Container from '@component/Container';
import useWindowSize from '@hook/useWindowSize';
import React from 'react';
import CategorySectionHeader from '../FeaturedCategories/CategorySectionHeader';

export interface CategorySectionCreatorProps {
  iconName?: string;
  title?: string;
  seeMoreLink?: string;
}

const CategorySectionCreator: React.FC<CategorySectionCreatorProps> = ({
  iconName,
  seeMoreLink,
  title,
  children,
}) => {
  const width = useWindowSize();
  return (
    <Box my="4rem" mx={width < 900 && width > 600 ? '1rem' : '0.5rem'}>
      <Container pb="1rem">
        {title && (
          <CategorySectionHeader
            title={title}
            seeMoreLink={seeMoreLink}
            iconName={iconName}
          />
        )}

        {children}
      </Container>
    </Box>
  );
};

export default CategorySectionCreator;
