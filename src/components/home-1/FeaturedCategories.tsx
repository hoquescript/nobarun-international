import Card from '@component/Card';
import HoverBox from '@component/HoverBox';
import { H4 } from '@component/Typography';
import useFeaturedCategories from '@hook/Home/useFeaturedCategories';
import Link from 'next/link';
import React from 'react';
import Box from '../Box';
import CategorySectionHeader from '../CategorySectionHeader';
import Container from '../Container';
import Grid from '../grid/Grid';

const Categories: React.FC = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  React.useEffect(() => {
    useFeaturedCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  return (
    <Box mb="10rem">
      <Container>
        <Box>
          <CategorySectionHeader
            iconName="Group"
            title="Featured Categories"
            seeMoreLink="#"
          />
          <Card p="1rem" mt="4rem" bg="transparent" boxShadow="none">
            <Grid container spacing={4}>
              {categories.map((item) => (
                <Grid
                  item
                  sm={3}
                  xs={6}
                  key={item.title}
                  className="featuredCategories"
                >
                  <Link href={item.productUrl}>
                    <a>
                      <Box>
                        <HoverBox
                          borderRadius={5}
                          mb="0.5rem"
                          className="featuredCategories__image"
                        >
                          <img
                            src={item.imgUrl}
                            // layout="responsive"
                            // objectFit="cover"
                            // alt={title}
                          />
                        </HoverBox>
                        <H4
                          fontSize="14px"
                          fontWeight="600"
                          className="featuredCategories__title"
                        >
                          {item.title}
                        </H4>
                      </Box>
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
