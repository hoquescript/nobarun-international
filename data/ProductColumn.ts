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
    accessor: 'contactPerson',
    sticky: 'left',
  },
  {
    Header: 'Stock',
    accessor: 'productCode',
    sticky: 'left',
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
