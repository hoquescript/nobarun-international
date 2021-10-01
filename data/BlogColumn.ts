import { format } from 'date-fns';

export const BLOG_COLUMNS = [
  {
    Header: 'Post Title',
    accessor: 'postTitle',
    sticky: 'left',
  },
  {
    Header: 'Contact',
    accessor: 'contact',
    sticky: 'left',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Status',
    accessor: 'isPublished',
    Cell: ({ value }) => (value ? 'Published' : 'Draft'),
  },
  {
    Header: 'Published On',
    accessor: 'createdAt',
    Cell: ({ value }) => format(new Date(value), 'do MMMM, yyyy'),
  },
  {
    Header: 'Published By',
    accessor: 'author',
  },
];
