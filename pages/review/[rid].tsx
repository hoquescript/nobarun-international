import React, { useState, useMemo, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import StarRatings from 'react-star-ratings';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';

import Toolbar from '../../components/shared/Toolbar';
import Textarea from '../../components/controls/textarea';
import Textfield from '../../components/controls/textfield';
import Togglebar from '../../components/controls/togglebar';
import FileButton from '../../components/controls/file';
import ProductCode from '../../components/shared/ProductCode';

import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import useReviewById from '../../hooks/Review/useReviewById';
import { resetMediaSelection, setMedia } from '../../store/slices/ui';

const CREATE_REVIEW = gql`
  mutation createReview($data: CreateNewReview!) {
    createReview(data: $data) {
      id
    }
  }
`;
const EDIT_REVIEW = gql`
  mutation editReview($data: EditReview!) {
    editReview(data: $data)
  }
`;

const defaultValues = {
  name: '',
  email: '',
  reviewText: '',
  title: '',
  createdAt: '',
  productCode: '',
  isPublished: false,
};

const AddReview = () => {
  const alert = useAlert();
  const router = useRouter();
  const rid = router.query.rid;
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [productCode, setProductCode] = useState('');

  const [createReview, createState] = useMutation(CREATE_REVIEW);
  const [editReview, editState] = useMutation(EDIT_REVIEW);

  const dispatch = useTypedDispatch();
  const featuredImage = useTypedSelector(
    (state) => state.ui.reviewMedia.featured,
  );
  const images = useTypedSelector((state) => state.ui.reviewMedia.images);
  const videos = useTypedSelector((state) => state.ui.reviewMedia.videos);

  const addNewReview = async (data) => {
    if (rating === 0) {
      alert.error('You must give Rating Stars');
    }
    if (productCode === '') {
      alert.error('You must select a relevant Product');
    }

    const review = {
      ...data,
      createdAt: new Date(data.createdAt),
      rating,
      productCode: productCode,
      reviewMedia: {
        images,
        videos,
      },
      featuredImage,
    };

    // if (!data.createdAt) {
    //   delete review.createdAt;
    // }

    if (isEditMode) {
      try {
        await editReview({
          variables: {
            data: {
              editId: rid,
              editableObject: review,
            },
          },
        });
        if (!editState.error) {
          alert.info('Edited Review Successfully');
        } else {
          throw editState.error.message;
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.info('Edited Review Successfully');
        }
      }
    } else {
      try {
        await createReview({
          variables: {
            data: review,
          },
        });
        if (!createState.error) {
          alert.success('Posted Review Successfully');

          //Resetting
          methods.reset(defaultValues);
          dispatch(resetMediaSelection());
          setRating(0);
          setProductCode('');
        } else {
          throw createState.error.message;
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.success('Posted Review Successfully');

          //Resetting
          methods.reset(defaultValues);
          dispatch(resetMediaSelection());
          setRating(0);
          setProductCode('');
        }
      }
    }
  };

  const handleError = (error) => {
    if (rating === 0) {
      alert.error('You must give Rating Stars');
    }
    if (productCode === '') {
      alert.error('You must select a relevant Product');
    }

    Object.values(error).forEach((err) => {
      // @ts-ignore
      alert.error(err.message);
    });
  };

  const token = useTypedSelector((state) => state.ui.token);
  useEffect(() => {
    if (rid !== 'add-new-review') {
      setIsEditMode(true);
      useReviewById(rid, token).then((data: any) => {
        methods.reset(data);
        setProductCode(data.productCode);
        setRating(data.rating);
        dispatch(setMedia({ path: router.asPath, src: data.reviewMedia }));
      });
    }
  }, [token]);

  return (
    <FormProvider {...methods}>
      <Toolbar />
      <div className="container center">
        <div className="row">
          <div className="col-xl-9">
            {/* <div className="container"> */}
            <div className="main__content__header mb-40">
              <h2 className="page-title">Add Review</h2>
              <div>
                <Togglebar name="isPublished">Publish</Togglebar>
                <button
                  type="button"
                  className="btn-icon-white ml-20"
                  onClick={methods.handleSubmit(addNewReview, handleError)}
                >
                  <FaSave />
                </button>

                <button
                  type="button"
                  className="btn-icon-white ml-20"
                  onClick={() => router.push('/review/add-new-review')}
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  className="btn-icon-white ml-20"
                  onClick={() => router.push('/review/reviews')}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="wrapper-section">
              <div className="wrapper-section__content">
                <div className="row">
                  <div className="col-12">
                    <div className="flex mb-30">
                      <h4 className="heading-tertiary mr-30 ">
                        Review Rating
                        <sup style={{ color: 'red' }}>*</sup>
                      </h4>
                      <StarRatings
                        rating={rating}
                        changeRating={(stars: number) => setRating(stars)}
                        numberOfStars={5}
                        name="rating"
                        starDimension="30px"
                        starRatedColor="#F4643A"
                        starHoverColor="#F4643A"
                        starEmptyColor="#946557"
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-20">
                    <Textfield name="title" label="Company Name" required />
                  </div>
                  <div className="col-6 mb-20">
                    <Textfield name="name" label="Your Name" required />
                  </div>
                  <div className="col-6 mb-10">
                    <Textfield
                      name="email"
                      label="Your e-Mail Address"
                      required
                    />
                  </div>
                  <div className="col-6 mb-20">
                    <Textfield
                      type="date"
                      name="createdAt"
                      // value="2021-11-29"
                      label="Review Date"
                    />
                  </div>
                  <div className="col-6 mb-20">
                    <ProductCode
                      required
                      productCode={productCode}
                      setProductCode={setProductCode}
                    />
                  </div>
                  <div className="col-12 mb-10">
                    <Textarea name="reviewText" label="Your Reviews" required />
                  </div>
                  <FileButton showMedia page="review" />
                </div>
                <div className="center mt-30">
                  <button
                    className="btn-green"
                    onClick={methods.handleSubmit(addNewReview, handleError)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
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

export default AddReview;
