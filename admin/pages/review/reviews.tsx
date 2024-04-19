import React, { useState, useMemo, useEffect } from 'react';
import { sub, format, isWithinInterval } from 'date-fns';
import { useAlert } from 'react-alert';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { gql, useMutation } from '@apollo/client';

import {
  FaGripVertical,
  FaSortUp,
  FaSortDown,
  FaBackward,
  FaFastBackward,
  FaForward,
  FaFastForward,
  FaPlusCircle,
  FaTrash,
  FaEdit,
} from 'react-icons/fa';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import useAllReviews from '../../hooks/Review/useAllReview';

import styles from '../../styles/pages/query-report.module.scss';
import { REVIEWS_COLUMNS } from '../../data/ReviewsColumn';
import Loader from '../../components/shared/Loader';
import Modal from '../../components/shared/Modal';

const DELETE_REVIEW = gql`
  mutation deleteReviewById($id: String!) {
    removeSingleReview(reviewId: $id)
  }
`;

const EDIT_REVIEW = gql`
  mutation editReview($data: EditReview!) {
    editReview(data: $data)
  }
`;

const formatIsPublished = (data) => {
  const reviews = {};
  data.forEach((review) => {
    reviews[review.id] = Boolean(review.isPublished);
  });
  console.log(reviews);
  return reviews;
};

const Reviews = () => {
  const alert = useAlert();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteKey, setDeleteKey] = useState('');
  const [deleteIdx, setDeleteIdx] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPublished, setIsPublished] = useState({});

  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: sub(new Date(), { months: 6 }),
      endDate: new Date(),
      key: 'Periods',
    },
  ]);

  const [editReview, editState] = useMutation(EDIT_REVIEW);
  const [deleteReview, deleteState] = useMutation(DELETE_REVIEW);

  const [reviews, setReviews] = useState<any[]>([]);
  const columns = useMemo(() => REVIEWS_COLUMNS, []);

  const token = useTypedSelector((state) => state.ui.token);
  useEffect(() => {
    useAllReviews(token).then((reviews) => {
      // console.log(reviews);
      setReviews(reviews);
      setIsPublished(formatIsPublished(reviews));
      setLoading(false);
    });
  }, [token]);

  const filterData = (rows, ids, query) => {
    const param = query.search.toLowerCase();
    return rows.filter((row) => {
      return (
        (row.values?.title.toLowerCase().includes(param) ||
          row.values?.name.toLowerCase().includes(param)) &&
        isWithinInterval(new Date(row.values?.createdAt), {
          start: query.range.startDate,
          end: query.range.endDate,
        })
      );
    });
  };

  // @ts-ignore
  const tableInstance = useTable(
    { columns, data: reviews, globalFilter: filterData },
    useGlobalFilter,
    useSortBy,
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

  const { pageIndex, pageSize } = state;

  useEffect(() => {
    setGlobalFilter({
      search,
      range: selectionRange[0],
    }); // Set the Global Filter to the filter prop.
  }, [search, selectionRange, setGlobalFilter]);

  const isPublishedHandler = async (id, event) => {
    const newIsPublished = { ...isPublished, [id]: event.target.checked };
    await editReview({
      variables: {
        data: {
          editId: id,
          editableObject: {
            isPublished: event.target.checked,
          },
        },
      },
    });
    setIsPublished(newIsPublished);
  };

  return (
    <div className={styles.query}>
      {loading && <Loader />}
      <div className="row">
        <div className="col-6">
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="col-2">
          <TimePeriod
            period={period}
            setPeriod={setPeriod}
            selectionRange={selectionRange}
            setSelectionRange={setSelectionRange}
          />
        </div>
      </div>
      <div className={styles.query__btnWrapper}>
        <h1 className="heading-primary mt-40 mb-40">
          Reviews ({reviews.length} Result)
        </h1>
        <div>
          <Link href="/review/add-new-review">
            <a className="btn-outline-green small mr-20">
              <FaPlusCircle className="btn-icon-small" />
              Add Review
            </a>
          </Link>
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
              {page.reverse().map((row: any) => {
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
                          <Modal
                            title="Confirmation Alert"
                            modalIsOpen={showDeleteModal}
                            setIsOpen={setShowDeleteModal}
                            confirmHandler={async () => {
                              //@ts-ignore
                              if (row.original.id) {
                                const modifiedData = [...reviews];
                                modifiedData.splice(deleteIdx, 1);
                                setReviews(modifiedData);

                                await deleteReview({
                                  variables: {
                                    id: deleteKey,
                                  },
                                });

                                if (!deleteState.error) {
                                  alert.error('Deleted Review Successfully');
                                } else {
                                  alert.error(deleteState.error.message);
                                }
                              }
                            }}
                          />

                          <span
                            onClick={() => {
                              setShowDeleteModal(true);
                              // @ts-ignore
                              setDeleteKey(row.original?.id);
                              setDeleteIdx(row.index);
                            }}
                          >
                            <FaTrash />
                          </span>
                          <span>
                            <Link
                              // @ts-ignore
                              href={`/review/${
                                // @ts-ignore
                                row.original && row.original?.id
                              }`}
                            >
                              <a>
                                <FaEdit />
                              </a>
                            </Link>
                          </span>
                        </div>
                        <label id={row.id} className="custom-switch">
                          <input
                            type="checkbox"
                            id={row.id}
                            checked={
                              isPublished[row.original && row.original.id] ||
                              false
                            }
                            onChange={async (e) => {
                              isPublishedHandler(row.original.id, e);
                            }}
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Reviews;
