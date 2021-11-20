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
      if (value.length === 1) categories = categories.replace(',', '');
      return categories;
    },
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => (value ? value.substring(0, 30).concat('...') : ''),
  },
  {
    Header: 'Featured',
    accessor: 'isFeatured',
    Cell: ({ value }) => (
      <label className={`custom-switch`}>
        <input type="checkbox" checked={value} />
        <span>&nbsp;</span>
      </label>
    ),
  },
  {
    Header: 'Attachment',
    accessor: 'logo',
    Cell: ({ value }) => (
      <img style={{ textAlign: 'center' }} src={value} height={50} width={50} />
    ),
  },
];
