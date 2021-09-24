import React, { useMemo } from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  Column,
  TableInstance,
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

import tableData from '../../data/tableData.json';
import { COLUMNS } from '../../data/column';

interface TableProps {
  columns: any[];
  data: any[];
  editHandler: any;
  deleteHandler: any;
}

const Table = (props: TableProps) => {
  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => tableData, []);

  const { columns, data, editHandler, deleteHandler } = props;
  // console.log(data);
  // @ts-ignore
  const tableInstance = useTable({ columns, data }, useSortBy, usePagination);

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
  } = tableInstance;

  // @ts-ignore
  const { pageIndex, pageSize } = state;

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
              return (
                <tr {...row.getRowProps()}>
                  <td style={{ padding: '.5rem' }}>
                    <span className="table__icon grip">
                      <FaGripVertical />
                    </span>
                  </td>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                  <td style={{ padding: '.5rem' }}>
                    <span className="table__icon menu">
                      <FaEllipsisH />
                      <div
                        className={`table__action_menu ${
                          idx + 1 === page.length ? 'last' : ''
                        }`}
                      >
                        <button
                          // @ts-ignore
                          onClick={() => deleteHandler(row.original.name)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          // @ts-ignore
                          onClick={() => editHandler(row.original.name)}
                        >
                          <FaPen />
                        </button>
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
