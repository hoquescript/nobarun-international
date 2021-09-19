import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { useForm, FormProvider } from 'react-hook-form';
import { FaRemoveFormat } from 'react-icons/fa';
import Textarea from '../../components/controls/textarea';
import Textfield from '../../components/controls/textfield';

const AddReview = () => {
  const methods = useForm();
  const [rating, setRating] = useState(2);
  return (
    <FormProvider {...methods}>
      <div className="flex" style={{ alignItems: 'start' }}>
        <div className="container">
          <div className="main__content__header mb-40">
            <h2 className="page-title">Post Editor</h2>
            <div>
              <label htmlFor="publish" className="custom-switch ml-auto">
                <input type="checkbox" id="publish" />
                <span>Publish</span>
              </label>
              <button type="button" className="btn-icon-white ml-20">
                <FaRemoveFormat />
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
                      starRatedColor="#B94E2D"
                      starHoverColor="#B94E2D"
                      starEmptyColor="#F4643A"
                    />
                  </div>
                </div>
                <div className="col-12 mb-10">
                  <Textfield name="title" label="Title of the Review" />
                </div>
                <div className="col-6 mb-10">
                  <Textfield name="name" label="Your Name" />
                </div>
                <div className="col-6 mb-10">
                  <Textfield name="name" label="Your e-Mail Address" />
                </div>
                <div className="col-12 mb-10">
                  <Textarea name="review" label="Your Reviews" />
                </div>
                <div className="col-4">
                  <Textfield
                    label="Add Images to your Review"
                    type="file"
                    name="file"
                  />
                </div>
                <div className="col-8 flex">
                  <p className="center">
                    Allowed file types: <strong>jpg, gif, png</strong>, max
                    total size of files: <strong>24MB</strong>, max number of
                    files:
                    <strong> 8</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-60 ml-10" style={{ maxWidth: '20rem' }}>
          <div className="row">
            <div className="col-12">
              <img src="/images/blender.png" />
            </div>
            <div className="col-12">
              <img src="/images/blender.png" />
            </div>
            <div className="col-12">
              <img src="/images/blender.png" />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddReview;
