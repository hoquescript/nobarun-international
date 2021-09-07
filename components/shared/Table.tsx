import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import {
  FaGripVertical,
  FaEllipsisH,
  FaSortUp,
  FaSortDown,
  FaSortAmountUpAlt,
  FaTrash,
  FaPen,
  FaBackward,
  FaFastBackward,
  FaForward,
  FaFastForward,
} from 'react-icons/fa';

import tableData from '../../data/tableData.json';
import { COLUMNS } from '../../data/column';

const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);

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

  const { pageIndex, pageSize } = state;

  return (
    <div style={{ paddingBottom: 50 }}>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
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
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  const grip = index === 0 && (
                    <span
                      className="table__icon grip"
                      style={{ marginRight: '2rem' }}
                    >
                      <FaGripVertical />
                    </span>
                  );
                  const menu = index === row.cells.length - 1 && (
                    <>
                      <span
                        className="table__icon menu"
                        style={{ marginLeft: '3rem' }}
                      >
                        <FaEllipsisH />
                        <div className="table__action_menu">
                          <button>
                            <FaTrash />
                          </button>
                          <button>
                            <FaPen />
                          </button>
                        </div>
                      </span>
                    </>
                  );
                  return (
                    <td {...cell.getCellProps()}>
                      {grip}
                      {cell.render('Cell')}
                      {menu}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
