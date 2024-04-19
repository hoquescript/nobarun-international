import Alert from '@component/alert/alert';
import Box from '@component/Box';
import Button from '@component/buttons/Button';
import IconButton from '@component/buttons/IconButton';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import Grid from '@component/grid/Grid';
import Icon from '@component/icon/Icon';
import Modal from '@component/modal/Modal';
import TextField from '@component/text-field/TextField';
import TextArea from '@component/textarea/TextArea';
import { H1, SemiSpan } from '@component/Typography';
import axios from 'axios';
import Client from 'config/GraphQLRequest';
import { gql } from 'graphql-request';
import Link from 'next/link';
import React, { useState } from 'react';

const baseUrl =
  'https://xwkodx6vi3.execute-api.ap-south-1.amazonaws.com/v1?extension=';

interface AddQueryProps {
  isOpen: boolean;
  setIsOpen: any;
  id: string;
  // productId: string;
  productName: string;
  productCode: string;
  contact: any;
}

const ADD_NEW_QUERY = gql`
  mutation addNewQuery($data: AddQueryUserInput!) {
    addNewQueryUserByUser(data: $data) {
      name
    }
  }
`;

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

const AddQuery = (props: AddQueryProps) => {
  // const { isOpen, setIsOpen, productId, productName, productCode, contact } = props;
  // const { isOpen, setIsOpen,productName, productCode, contact } = props;
  const { isOpen, setIsOpen, productCode,} = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [file, setFile] = useState<any>({});
  const [state, setState] = useState({
    fullName: '',
    mobileNo: '',
    email: '',
    company: '',
    address: '',
    attachment: '',
    message: '',
  });

  const onCloseHandler = () => {
    setIsOpen(false);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    if (name === 'email') {
      if (validateEmail(value)) setShowEmailError(false);
      else setShowEmailError(true);
    }
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const onSubmit = async () => {
    if (!isAgreed) {
      return setShowMessage(true);
    }
    if (isAgreed) {
      setShowMessage(false);
    }

    if (showEmailError) return;
    if (state.email === '' || state.mobileNo === '') return;
    //
    const fileName = file.name;
    //
    let query = {
      // productId:productId,
      // productName:productName,
      company: state.company,
      email: state.email,
      name: state.fullName,
      message: state.message,
      notes: '',
      phone: state.mobileNo,
      address: state.address,
      productCode: productCode,
      attachment: "",
    };
    if(fileName){
      const extension = fileName.split('.').pop();
      const response = await axios.get(`${baseUrl}${extension}`);
      const { obj_location, fields, upload_url } = response.data;
      //
      const formData = new FormData();
      formData.append('key', fields?.key);
      formData.append('policy', fields?.policy);
      formData.append('x-amz-algorithm', fields['x-amz-algorithm']);
      formData.append('x-amz-credential', fields['x-amz-credential']);
      formData.append('x-amz-date', fields['x-amz-date']);
      formData.append('x-amz-security-token', fields['x-amz-security-token']);
      formData.append('x-amz-signature', fields['x-amz-signature']);
      formData.append('file', file);
      //
      await axios.post(upload_url, formData);
      //
      query.attachment=obj_location
    }
    //
    try {
      await Client.request(ADD_NEW_QUERY, { data: query });
      setState({
        fullName: '',
        mobileNo: '',
        email: '',
        company: '',
        address: '',
        attachment: '',
        message: '',
      });
      setIsOpen(false);
      setModalOpen(true);
      /*
      const data = await Client.request(ADD_NEW_QUERY, { data: query });
      if (data) {
        fetch(`https://formsubmit.co/ajax/${contact?.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            'Product Name': productName,
            'Product Code': productCode,
            'Full Name': state.fullName,
            'Mobile Number': state.mobileNo,
            'Email Address': state.email,
            'Company Name': state.company,
            Address: state.address,
            Attachment: '',
            Message: state.message,
          }),
        })
          .then((response) => response.json())
          .then(() => {
            setState({
              fullName: '',
              mobileNo: '',
              email: '',
              company: '',
              address: '',
              attachment: '',
              message: '',
            });
            setIsOpen(false);
            setModalOpen(true);
          })
          .catch((error) => console.error(JSON.stringify(error, undefined, 2)));
      }
      */
    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2));
    }
  };
  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Alert
        modalOpen={modalOpen}
        onClose={onClose}
        message="Thanks for sending us Quotation. We will get back to you soon."
      />
      <Modal open={isOpen} onClose={onCloseHandler}>
        <Card className="query" position="relative">
          <Box maxWidth="809px">
            <Box textAlign="center" className="query__header">
              <H1>Product Enquiry</H1>
              <SemiSpan>We will contact you within short time</SemiSpan>
            </Box>
            <IconButton
              style={{ position: 'absolute', right: '15px', top: '15px' }}
              onClick={onCloseHandler}
            >
              <Icon>close</Icon>
            </IconButton>
            <div>
              <div className="query__hero-wrapper">
                <img src="/Review.png" className="query__hero" />
              </div>
              <Box className="query__form">
                <Grid container spacing={5}>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullwidth
                      name="fullName"
                      label="Your Full Name"
                      value={state.fullName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullwidth
                      name="mobileNo"
                      label="Your Mobile No"
                      value={state.mobileNo}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullwidth
                      name="email"
                      label="Your Email Address"
                      value={state.email}
                      errorText={showEmailError && 'Email is wrong'}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullwidth
                      name="company"
                      label="Company Name"
                      value={state.company}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      fullwidth
                      name="address"
                      label="Full Address"
                      value={state.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12} alignItems="center">
                    <label htmlFor="attachment" className="query__file">
                      <input
                        type="file"
                        name="attachment"
                        id="attachment"
                        onChange={handleFileChange}
                      />
                      <FlexBox alignItems="center">
                        {/*
                          // @ts-ignore */}
                        <Icon size="5rem" color="#16ACEC" mr="1rem">
                          uploadQuery
                        </Icon>
                        Upload Attachment:{' '}
                        <strong
                          style={{ marginLeft: '.5rem', color: '#16ACEC' }}
                        >
                          {file?.name?.length > 5
                            ? file?.name?.slice(0, 5).concat('..')
                            : file?.name}
                        </strong>
                      </FlexBox>
                    </label>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextArea
                      name="message"
                      label="Write your Details Message"
                      labelColor="warn"
                      rows={8}
                      className="query__textarea"
                      value={state.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FlexBox alignItems="center">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        defaultChecked={isAgreed}
                        onChange={(e) => {
                          setIsAgreed(e.target.checked);
                        }}
                      />
                      <label htmlFor="terms" className="query__terms">
                        I agree to the{' '}
                        <Link href="/terms">
                          <a
                            style={{
                              color: '#16ACEC',
                              textDecoration: 'underline',
                            }}
                          >
                            terms and conditions
                          </a>
                        </Link>
                      </label>
                    </FlexBox>
                    {showMessage && (
                      <SemiSpan style={{ color: 'red' }}>
                        ***You must agree to the terms and condition
                      </SemiSpan>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="large"
                      px="4rem"
                      fullwidth
                      style={{
                        backgroundColor: '#EC1C24',
                        color: '#fff',
                        maxWidth: '30rem',
                        margin: 'auto',
                      }}
                      onClick={onSubmit}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default AddQuery;
