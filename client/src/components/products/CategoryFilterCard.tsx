import Link from 'next/link';
import React from 'react';
import Accordion from '../accordion/Accordion';
import AccordionHeader from '../accordion/AccordionHeader';
import Card from '../Card';
import CheckBox from '../CheckBox';
import Divider from '../Divider';
import { H6, Paragraph, SemiSpan } from '../Typography';

const CategoryFilterCard = ({
  slug,
  stockStatus,
  categories,
  filters,
  setFilters,
}) => {
  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px" fontSize="2.5rem">
        Categories
      </H6>

      {categories?.map((item,index) =>
        item?.children.length > 0 ? (
          <Accordion key={item?.name} expanded>
            <AccordionHeader
              px="0px"
              py="6px"
              color="text.muted"
              // justifyContent="flex-start"
            >
              <SemiSpan className="cursor-pointer" mr="9px" fontSize="18px" display={"flex"}>
                {item.icon && (
                  <img
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + item.icon}
                    alt={item?.name}
                    height="30"
                    width="30"
                    style={{ marginRight: '1.5rem' }}
                  />
                )}{item?.name}
              </SemiSpan>
            </AccordionHeader>
            {Object.keys(item.children).length ? Object.keys(item.children).map((key) => (
              <Paragraph
                className="cursor-pointer"
                fontSize="18px"
                color="text.muted"
                pl="22px"
                py="6px"
                key={key}>
                {item.children[key].name}
              </Paragraph>
            )):null}
          </Accordion>
        ) : (
          <Link key={index+1} href={`/category/${item.slug}`}>
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '3px',
              }}
            >
              {item.icon && (
                <img
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + item.icon}
                  alt={item?.name}
                  height="30"
                  width="30"
                  style={{ marginRight: '1.5rem' }}
                />
              )}
              <Paragraph
                className="cursor-pointer"
                fontSize="18px"
                color={slug === item?.slug ? 'red' : 'text.muted'}
                py="6px"
                key={item?.name}
              >
                {item?.name}
              </Paragraph>
            </a>
          </Link>
        ),
      )}

      <Divider my="24px" />

      <H6 mb="16px" fontSize="2.5rem">
        Stock Status
      </H6>
      {stockStatus?.map(
        (item) =>
          item.isPublished && (
            <CheckBox
              key={item.title}
              name={item.title}
              value={item.title}
              color="secondary"
              label={
                <SemiSpan color="inherit" fontSize="1.8rem">
                  {item.title}
                </SemiSpan>
              }
              my="10px"
              onChange={(e) => {
                if (e.target.checked) {
                  const newFilters = [...filters, item.title];
                  setFilters(newFilters);
                } else {
                  const index = filters.findIndex(
                    (filter) => filter === item.title,
                  );
                  const newFilters = [...filters];
                  if (index !== -1) {
                    newFilters.splice(index, 1);
                    setFilters(newFilters);
                  }
                }
              }}
            />
          ),
      )}
    </Card>
  );
};

export default CategoryFilterCard;
