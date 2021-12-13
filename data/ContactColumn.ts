export const CONTACT_COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name',
    sticky: 'left',
  },
  {
    Header: 'Email ID',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'whatsapp',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Active',
    accessor: 'isPublished',
    Cell: ({ value }) => (value ? 'Active' : 'Inactive'),
  },
];
