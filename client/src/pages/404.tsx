import Button from '@component/buttons/Button';
import FlexBox from '@component/FlexBox';
import Image from '@component/Image';
import OtherLayout from '@component/layout/OtherLayout';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import useProductCount from '@hook/useNoOfProduct';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Error404 = () => {
  const router = useRouter();

  const handleGoBack = async () => {
    router.back();
  };

  return (
    <FlexBox
      flexDirection="column"
      minHeight="57.1vh"
      justifyContent="center"
      alignItems="center"
      px="1rem"
    >
      <Image
        src="/assets/images/illustrations/404.svg"
        maxWidth="320px"
        width="100%"
        mb="2rem"
      />
      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          m="0.5rem"
          onClick={handleGoBack}
        >
          Go Back
        </Button>
        <Link href="/">
          <Button variant="contained" color="primary" m="0.5rem">
            Go to Home
          </Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
};

Error404.layout = OtherLayout;

export async function getStaticProps() {
  let categories=[];
  let count=null;
  try {
    categories = await useAllProductCategories();
    categories=JSON.parse(JSON.stringify(categories));
  }
  catch (e) {

  }
  try {
    count = await useProductCount();
  }
  catch (e) {

  }
  finally {
    return {
      props: {
        categories,
        count,
      },
      revalidate: 30,
    };
  }
}

export default Error404;
