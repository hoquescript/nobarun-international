import React, { useState, useMemo, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai';

import Toolbar from '../../components/shared/Toolbar';

import Textarea from '../../components/controls/textarea';
import Textfield from '../../components/controls/textfield';

import Togglebar from '../../components/controls/togglebar';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import FileButton from '../../components/controls/file';
import ProductCode from '../../components/shared/ProductCode';
import { resetMediaSelection, setMedia } from '../../store/slices/ui';
import useReviewById from '../../hooks/Review/useReviewById';

const CREATE_REVIEW = gql`
  mutation createReview($data: CreateNewReview!) {
    createReview(data: $data) {
      id
    }
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
  const router = useRouter();
  const rid = router.query.rid;
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [rating, setRating] = useState(0);

  const [createReview] = useMutation(CREATE_REVIEW);

  const dispatch = useTypedDispatch();
  const reviewMedia = useTypedSelector((state) => state.ui.reviewMedia);

  const addNewReview = (data) => {
    const review = {
      ...data,
      createdAt: new Date(data.createdAt),
      rating,
      productCode: data.productCode,
      reviewMedia,
    };
    console.log(review);
    methods.reset(defaultValues);
    dispatch(resetMediaSelection());
    setRating(0);

    createReview({
      variables: {
        data: review,
      },
    });
  };
  const token = useTypedSelector((state) => state.ui.token);
  useEffect(() => {
    if (rid !== 'add-new-review') {
      setIsEditMode(true);
      useReviewById(rid, token).then((data) => {
        methods.reset(data);
        console.log(data);
        // @ts-ignore
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
                <button type="button" className="btn-icon-white ml-20">
                  <AiOutlineClose />
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
                    <Textfield name="title" label="Company Name" />
                  </div>
                  <div className="col-6 mb-20">
                    <Textfield name="name" label="Your Name" />
                  </div>
                  <div className="col-6 mb-10">
                    <Textfield name="email" label="Your e-Mail Address" />
                  </div>
                  <div className="col-6 mb-20">
                    <Textfield
                      type="date"
                      name="createdAt"
                      label="Review Date"
                    />
                  </div>
                  <div className="col-6 mb-20">
                    <ProductCode />
                  </div>
                  <div className="col-12 mb-10">
                    <Textarea name="reviewText" label="Your Reviews" />
                  </div>
                  <FileButton showMedia page="review" />
                </div>
                <p className="mt-20 flex">
                  <AiOutlineWarning
                    className="mr-10"
                    style={{ height: 25, width: 25, color: 'red' }}
                  />
                  Allowed file types:
                  <strong className="ml-10">jpg, gif, png</strong>, max total
                  size of files: <strong className="ml-10">24MB</strong>, max
                  number of files:
                  <strong className="ml-10">8</strong>
                </p>
                <div className="center mt-30">
                  <button
                    className="btn-green"
                    onClick={methods.handleSubmit(addNewReview)}
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
