import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import HoverBox from '@component/HoverBox';
import { H4 } from '@component/Typography';
import useWindowSize from '@hook/useWindowSize';
import Link from 'next/link';
import React from 'react';
import Box from '../../Box';
import Container from '../../Container';
import Grid from '../../grid/Grid';
import CategorySectionHeader from './CategorySectionHeader';

interface CategoriesProps {
  categories: any[];
}
const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const width = useWindowSize();
  return (
    <Box mt="5rem" mb="5rem">
      <Container style={width < 600 ? { margin: '0rem' } : {}}>
        <Box>
          <CategorySectionHeader iconName="Group" title="Featured Categories" />
          <Card p="1rem" mt="4rem" bg="transparent" boxShadow="none">
            <Grid container spacing={4}>
              {categories.map((item) => (
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={6}
                  key={item.name}
                  className="featuredCategories"
                >
                  <Link href={`/category/${item.slug}`}>
                    <a>
                      <FlexBox
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <HoverBox
                          borderRadius={5}
                          mb="0.5rem"
                          className="featuredCategories__image"
                        >
                          <img
                            data-src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image}
                            alt={item.name}
                            style={{ height: '100%', width: '100%' }}
                            className="lazyload"
                          />
                        </HoverBox>
                        <H4
                          fontSize="18px"
                          fontWeight="600"
                          className="featuredCategories__title"
                        >
                          {item.name}
                        </H4>
                      </FlexBox>
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Categories;
