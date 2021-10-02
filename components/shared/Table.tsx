import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useFlexLayout,
} from 'react-table';
import {
  FaGripVertical,
  FaEllipsisH,
  FaSortUp,
  FaSortDown,
  FaTrash,
  FaPen,
  FaBackward,
  FaFastBackward,
  FaForward,
  FaFastForward,
} from 'react-icons/fa';

import Modal from './Modal';

interface TableProps {
  pageName: 'account' | 'query' | 'blog' | 'product';
  title?: string;
  columns: any[];
  data: any[];
  editHandler?: any;
  deleteHandler: any;
  filter?: {
    search: string;
    range: any;
    sortBy?: string;
  };
  globalFilterFn?: any;
}

const Table = (props: TableProps) => {
  const { pageName, columns, data, deleteHandler, filter, globalFilterFn } =
    props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    [],
  );

  // @ts-ignore
  const tableInstance = useTable(
    { columns, data, defaultColumn, globalFilter: globalFilterFn },
    useGlobalFilter,
    useSortBy,
    useFlexLayout,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousePage,
    prepareRow,
    setPageSize,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
  } = tableInstance;

  // @ts-ignore
  const { pageIndex, pageSize } = state;
  useEffect(() => {
    setGlobalFilter(filter); // Set the Global Filter to the filter prop.
  }, [filter, setGlobalFilter]);
  return (
    <div>
      <div className="table__wrapper">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>&nbsp;</th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortUp style={{ transform: 'translateY(7px)' }} />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      ''
                    )}
                  </th>
                ))}
                <th>&nbsp;</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, idx) => {
              prepareRow(row);
              let editLink: string;
              if (pageName === 'account') editLink = 'settings/accounts';
              if (pageName === 'query') editLink = 'query-report';
              if (pageName === 'blog') editLink = 'blogs';
              if (pageName === 'product') editLink = 'product';
              return (
                <tr {...row.getRowProps()}>
                  <td>
                    <span className="table__icon grip">
                      <FaGripVertical />
                    </span>
                  </td>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                  <td>
                    <span className="table__icon menu">
                      <FaEllipsisH />
                      <div
                        className={`table__action_menu ${
                          idx + 1 === page.length ? 'last' : ''
                        }`}
                      >
                        <Modal
                          title="Contact Person"
                          modalIsOpen={showDeleteModal}
                          setIsOpen={setShowDeleteModal}
                          confirmHandler={() => {
                            // @ts-ignore
                            row.original.id &&
                              // @ts-ignore
                              deleteHandler(row.original.id, row.index);
                          }}
                        />
                        <button
                          onClick={() => {
                            setShowDeleteModal(true);
                          }}
                        >
                          <FaTrash />
                        </button>
                        <Link
                          // @ts-ignore
                          href={`/${editLink}/${
                            // @ts-ignore
                            row.original && row.original?.id
                          }`}
                        >
                          <a>
                            <FaPen />
                          </a>
                        </Link>
                        {/* </button> */}
                      </div>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="pagination__noOfRow">
          <h4 className="heading-tertiary mr-20">Rows Per Page</h4>
          <select
            className="custom-input"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="pagination__page">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            className="pagination__page-button"
            onClick={() => gotoPage(0)}
          >
            <FaFastBackward />
          </button>
          <button
            className="pagination__page-button"
            disabled={canPreviousePage === false}
            onClick={() => previousPage()}
          >
            <FaBackward />
          </button>
          <input
            type="text"
            className="custom-input"
            placeholder="Goto"
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) : 0;
              gotoPage(pageNumber);
            }}
          />
          <button
            className="pagination__page-button"
            disabled={canNextPage === false}
            onClick={nextPage}
          >
            <FaForward />
          </button>
          <button
            className="pagination__page-button"
            onClick={() => gotoPage(pageCount - 1)}
          >
            <FaFastForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
