import React, { useState, useMemo, useEffect } from 'react';
import { sub, format } from 'date-fns';
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
  FaPlusCircle,
  FaEye,
  FaEdit,
} from 'react-icons/fa';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';

import tableData from '../../data/tableData.json';
import { COLUMNS } from '../../data/column';

import styles from '../../styles/pages/query-report.module.scss';
import useAllReviews from '../../hooks/Review/useAllReview';

const formatIsPublished = (data) => {
  const reviews = {};
  data.forEach((review) => {
    reviews[review.id] = Boolean(review.isPublished);
  });
  return reviews;
};

const Reviews = () => {
  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );

  const [reviews, setReviews] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => reviews, []);

  useEffect(() => {
    useAllReviews().then((reviews) => setReviews(reviews));
  }, []);

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

  const { pageIndex, pageSize } = state;

  const [isPublished, setIsPublished] = useState({});

  useEffect(() => {
    setIsPublished(formatIsPublished(data));
  }, []);

  const isPublishedHandler = (id, event) => {
    const newIsPublished = { ...isPublished, [id]: event.target.checked };
    setIsPublished(newIsPublished);
  };

  return (
    <div className={styles.query}>
      <div className="row">
        <div className="col-6">
          <Search />
        </div>
        <div className="col-2">
          <TimePeriod period={period} setPeriod={setPeriod} />
        </div>
      </div>
      <div className={styles.query__btnWrapper}>
        <h1 className="heading-primary mt-40 mb-40">Reviews (51 Result)</h1>
        <div>
          <button type="button" className="btn-outline-green mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Review
          </button>
        </div>
      </div>
      <div style={{ paddingBottom: 50 }}>
        <div className="table__wrapper">
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <th>&nbsp;</th>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
                  <th>Action</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    <td style={{ padding: '0.5rem' }}>
                      <span className="table__icon grip">
                        <FaGripVertical />
                      </span>
                    </td>
                    {row.cells.map((cell, index) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                    <td>
                      <div className="actions" style={{ padding: '0.5rem' }}>
                        <div>
                          <span>
                            <FaEye />
                          </span>
                          <span>
                            <FaEdit />
                          </span>
                        </div>
                        <label id={row.id} className="custom-switch">
                          <input
                            type="checkbox"
                            id={row.id}
                            checked={isPublished[row.id] || false}
                            onChange={(e) => isPublishedHandler(row.id, e)}
                          />
                          <span>&nbsp;</span>
                        </label>
                      </div>
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
    </div>
  );
};

export default Reviews;
