import Box from '@component/Box';
import Tags from '@component/Product/Tags';
import { useRouter } from 'next/router';
import React from 'react';
import Accordion from '../accordion/Accordion';
import AccordionHeader from '../accordion/AccordionHeader';
import Card from '../Card';
import { H6, Paragraph, SemiSpan } from '../Typography';

const BlogFilterCard = ({ slug, categories, showTags, tags }) => {
  const router = useRouter();
  const selectCategory = (name) => {
    router.push(`/blogs?category=${name}`);
  };
  return (
    <>
      <Card p="18px 27px" elevation={5}>
        <H6 fontSize="24px" mb="10px">
          Categories
        </H6>
        {categories?.map((item) =>
          item?.children.length > 0 ? (
            <Accordion key={item?.name} expanded>
              <AccordionHeader
                px="0px"
                py="6px"
                color="text.muted"
                // justifyContent="flex-start"
              >
                <SemiSpan
                  className="cursor-pointer"
                  mr="9px"
                  color={slug === item?.name ? 'red' : 'text.muted'}
                  onClick={() => selectCategory(item?.name)}
                >
                  {item?.name}
                </SemiSpan>
              </AccordionHeader>
              {item?.children?.map((subChild) => (
                <Paragraph
                  className="cursor-pointer"
                  fontSize="14px"
                  color={slug === subChild?.name ? 'red' : 'text.muted'}
                  pl="22px"
                  py="6px"
                  key={subChild.name}
                  onClick={() => selectCategory(subChild?.name)}
                >
                  {subChild.name}
                </Paragraph>
              ))}
            </Accordion>
          ) : (
            <Paragraph
              className="cursor-pointer"
              fontFamily="'SolaimanLipi', sans-serif"
              fontSize="18px"
              color={slug === item?.name ? 'red' : 'text.muted'}
              py="6px"
              key={item?.name}
              onClick={() => selectCategory(item?.name)}
            >
              {item?.name}
            </Paragraph>
          ),
        )}
      </Card>
      {showTags && (
        <Box mt="4rem">
          <Tags chips={tags} />
        </Box>
      )}
    </>
  );
};

export default BlogFilterCard;
