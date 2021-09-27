import { format } from 'date-fns';
import React from 'react';
import { FaDownload } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

export const REVIEWS_COLUMNS = [
  {
    Header: 'Date',
    // Footer: 'Date',
    accessor: 'createdAt',
    // Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy'),
  },
  {
    Header: 'SKU',
    accessor: 'SKU',
    sticky: 'left',
  },
  {
    Header: 'Review Title',
    accessor: 'title',
    sticky: 'left',
  },
  {
    Header: 'Rating',
    accessor: 'rating',
    sticky: 'left',
    Cell: (props) => (
      <StarRatings
        rating={props.value}
        numberOfStars={5}
        name="rating"
        starDimension="30px"
        starRatedColor="#F4643A"
        starHoverColor="#F4643A"
        starEmptyColor="#946557"
      />
    ),
  },
  {
    Header: 'Message',
    accessor: 'reviewText',
  },
  {
    Header: 'Attachment',
    accessor: 'images',
    Cell: ({ value }) => (
      <span className="flex">
        {value.length} Image{' '}
        <FaDownload
          className="ml-10"
          style={{ height: '2.5rem', width: '2.5rem', color: '#777' }}
        />
      </span>
    ),
  },
];
