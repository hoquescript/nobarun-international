import Image from 'next/image';

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
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => value.substring(0, 30).concat('...'),
  },
  {
    Header: 'Attachment',
    accessor: 'logo',
    Cell: ({ value }) => <Image src={value} height={80} width={80} />,
  },
];
