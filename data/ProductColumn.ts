import { format } from 'date-fns';

export const PRODUCT_COLUMNS = [
  {
    Header: 'Product Name',
    accessor: 'productName',
    sticky: 'left',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Published Date',
    accessor: 'createdAt',
    Cell: ({ value }) => format(new Date(value), 'do MMMM, yyyy'),
  },
  {
    Header: 'Price',
    accessor: 'price',
    sticky: 'left',
  },
  {
    Header: 'Assignee',
    accessor: 'specification',
    sticky: 'left',
    Cell: 2078,
  },
  {
    Header: 'Stock',
    accessor: 'productCode',
    sticky: 'left',
    Cell: 209,
  },
  {
    Header: 'Status',
    accessor: 'isPublished',
    Cell: ({ value }) => (value ? 'Published' : 'Draft'),
  },
];
