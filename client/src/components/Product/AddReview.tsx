import Alert from '@component/alert/alert';
import Button from '@component/buttons/Button';
import IconButton from '@component/buttons/IconButton';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import Grid from '@component/grid/Grid';
import Icon from '@component/icon/Icon';
import Rating from '@component/rating/Rating';
import TextField from '@component/text-field/TextField';
import TextArea from '@component/textarea/TextArea';
import { H1, Paragraph, SemiSpan, Span } from '@component/Typography';
import useWindowSize from '@hook/useWindowSize';
import axios from 'axios';
import { gql } from 'graphql-request';
import React, { useState } from 'react';
import Client from '../../config/GraphQLRequest';

const baseUrl =
  'https://xwkodx6vi3.execute-api.ap-south-1.amazonaws.com/v1?extension=';

const defaultState = {
  name: '',
  company: '',
  email: '',
  location: '',
  review: '',
};

const CREATE_REVIEW = gql`
  mutation createReview($data: CreateNewReview!) {
    createReview(data: $data) {
      id
    }
  }
`;

const AddReview = ({ productCode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const width = useWindowSize();
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState(defaultState);
  const [medias, setMedias] = useState<any[]>([]);

  const postReviewHandler = async () => {
    if (rating === 0) {
      setModalOpen(true);
      setModalMessage('You must add the Rating, Star Rating Cannot be Empty');
      setModalType('error');
      return;
    }
    setModalOpen(true);
    setModalType('spinner');
    setModalMessage('Please wait for a while, We are posting your review');

    const uploadedImages: string[] = [];
    for (let i = 0; i < medias.length; i++) {
      const fileName = medias[i].name;
      const extension = fileName.split('.').pop();
      const response = await axios.get(`${baseUrl}${extension}`);
      const { obj_location, fields, upload_url } = response.data;

      const formData = new FormData();
      formData.append('key', fields?.key);
      formData.append('policy', fields?.policy);
      formData.append('x-amz-algorithm', fields['x-amz-algorithm']);
      formData.append('x-amz-credential', fields['x-amz-credential']);
      formData.append('x-amz-date', fields['x-amz-date']);
      formData.append('x-amz-security-token', fields['x-amz-security-token']);
      formData.append('x-amz-signature', fields['x-amz-signature']);
      formData.append('file', medias[i]);

      await axios.post(upload_url, formData);
      uploadedImages.push(obj_location);
    }

    const review = {
      data: {
        title: formData.company,
        name: formData.name,
        email: formData.email,
        rating: rating,
        reviewText: formData.review,
        productCode,
        reviewMedia: {
          images: uploadedImages,
          videos: [],
        },
        isPublished: false,
      },
    };

    try {
      const data = await Client.request(CREATE_REVIEW, review);
      if (data) {
        setRating(0);
        setFormData(defaultState);

        setMedias([]);

        setModalOpen(true);
        setModalType('success');
        setModalMessage(
          'Your Review is Pending. We will notify you when it is posted',
        );
      }
    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2));
    }
  };

  const addImageHandler = (e) => {
    const files = e.target.files;
    setMedias([...medias, ...files]);
  };

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onClose = () => {
    setModalOpen(false);
    setModalMessage('');
    setModalType('');
  };
  const removeHandler = (link) => {
    setMedias(medias.filter((media) => media.name !== link.name));
  };

  return (
    <Card px="3rem" py="4rem">
      <Alert
        modalOpen={modalOpen}
        onClose={onClose}
        message={modalMessage}
        type={modalType}
      />
      <H1 fontSize="3.4rem" fontWeight="600">
        Submit your review
      </H1>
      <SemiSpan my="0.8em" fontSize="1.8rem" color="#848484">
        Your email address will not be published. Required fields are marked
      </SemiSpan>
      <FlexBox alignItems="center" mt="1em" mb="3em">
        <Rating
          outof={5}
          color="warn"
          size="medium"
          readonly={false}
          value={rating}
          onChange={(value) => setRating(value)}
        />
        <Span ml="1em" fontSize="1.6rem" color="#848484">
          Review Rating
          <span style={{ color: 'red', fontSize: '2rem' }}>*</span>
        </Span>
      </FlexBox>
      <Grid container spacing={width > 767 ? 10 : 2}>
        <Grid item md={6} xs={12}>
          <TextField
            name="name"
            label="Your Name"
            value={formData?.name}
            onChange={formHandler}
            fullwidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="company"
            label="Your Company Name"
            value={formData?.company}
            onChange={formHandler}
            fullwidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={width > 767 ? 10 : 2}>
        <Grid item md={6} xs={12}>
          <TextField
            name="email"
            label="Your Email Address"
            value={formData?.email}
            onChange={formHandler}
            fullwidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="location"
            value={formData?.location}
            onChange={formHandler}
            label="Your Location"
            fullwidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <TextArea
            fullwidth
            label="Write your Review"
            name="review"
            value={formData?.review}
            onChange={formHandler}
            my="1.5rem"
            style={{ minHeight: '150px' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Paragraph
            fontWeight="600"
            fontSize="2rem"
            color="#4B566B"
            mb="1.5rem"
          >
            Add Images & Videos to your review
          </Paragraph>
          <div className="product-images">
            {medias.map((media, idx) => {
              return ['mp4', 'mov', 'wmv', 'avi', 'mkv']?.includes(
                media?.name?.split('.').pop()?.toLowerCase(),
              ) ? (
                <figure
                  key={idx}
                  style={{
                    backgroundColor: '#eee',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    className="remove-image"
                    onClick={() => removeHandler(media)}
                  >
                    <Icon size="1.5rem">close</Icon>
                  </IconButton>
                  <video
                    src={URL.createObjectURL(media)}
                    controls={false}
                    autoPlay
                    muted
                    style={{ height: '7.5rem', width: '7.5rem' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </figure>
              ) : (
                <figure key={idx}>
                  <IconButton
                    className="remove-image"
                    onClick={() => removeHandler(media)}
                  >
                    <Icon size="1.5rem">close</Icon>
                  </IconButton>
                  <img src={URL.createObjectURL(media)} alt="" />
                </figure>
              );
            })}
            <figure>
              <label className="add-new-image">
                <Icon>plus</Icon>
                <input
                  type="file"
                  multiple
                  onChange={addImageHandler}
                  style={{ display: 'none' }}
                />
              </label>
            </figure>
          </div>
          <Paragraph fontSize="1.6rem" mt="1rem" color="#4B566B">
            <strong>Allowed file types: </strong>jpg, gif, png,mp4,avi max total
            size of files: 100MB, max number of files: 8!
          </Paragraph>
        </Grid>
      </Grid>
      <FlexBox mt="3em" justifyContent="center">
        <Button
          color="primary"
          variant="contained"
          size="large"
          style={{ backgroundColor: '#EC1C24' }}
          onClick={postReviewHandler}
        >
          <Icon size="3rem" mr="1em">
            send-2 1
          </Icon>
          Submit Review
        </Button>
      </FlexBox>
    </Card>
  );
};

export default AddReview;
