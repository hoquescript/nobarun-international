export const COLUMNS = [
  {
    Header: 'Client Name',
    accessor: 'clientName',
    sticky: 'left',
  },
  {
    Header: 'Category',
    accessor: 'categoryName',
    sticky: 'left',
    Cell: ({ value }) => {
      let categories = '';
      value.forEach((v) => {
        categories = categories.concat(v).concat(', ');
      });
      return categories;
    },
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => (value ? value.substring(0, 30).concat('...') : ''),
  },
  {
    Header: 'Attachment',
    accessor: 'logo',
    Cell: ({ value }) => (
      <img style={{ textAlign: 'center' }} src={value} height={50} width={50} />
    ),
  },
];
