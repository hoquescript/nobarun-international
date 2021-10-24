import { format } from 'date-fns';

export const PRODUCT_COLUMNS = [
  {
    Header: 'Product Name',
    accessor: 'productName',
    sticky: 'left',
    width: 350,
    maxWidth: 350,
  },
  {
    Header: 'Category',
    accessor: 'category',
    width: 200,
  },
  {
    Header: 'Published Date',
    accessor: 'createdAt',
    Cell: ({ value }) => format(new Date(value), 'do MMMM, yyyy'),
    width: 120,
  },
  {
    Header: 'Assignee',
    accessor: 'contactPerson',
    sticky: 'left',
  },
  {
    Header: 'Price',
    accessor: 'price',
    sticky: 'left',
  },
  {
    Header: 'Views',
    accessor: 'productCode',
    sticky: 'left',
    Cell: 0,
  },
  {
    Header: 'Published By',
    accessor: 'author',
    sticky: 'left',
  },
  {
    Header: 'Status',
    accessor: 'isPublished',
    Cell: ({ value }) => (value ? 'Published' : 'Draft'),
  },
];
