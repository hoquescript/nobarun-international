import BlogCard from '@component/blog/BlogCard';
import Box from '@component/Box';
import Grid from '@component/grid/Grid';
import OtherLayout from '@component/layout/OtherLayout';
import { H1 } from '@component/Typography';
import useAllBlogs from '@hook/Blogs/useAllBlogs';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import useProductCount from '@hook/useNoOfProduct';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const BlogsList = ({ blogs }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (router.query?.category) {
      setSelectedCategory(router.query?.category as string);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>
          ব্লগঃ প্রোডাক্ট কেনার আগে বিস্তারিত জেনে নিন আর্টিকেল পড়ে।
        </title>
        <meta
          name="description"
          content="নবারুন ইন্টারন্যাশনাল এর সকল প্রকার প্রোডাক্ট সম্পর্কে আলোচনা করার জন্যই মুলত ব্লগটা চালু করা হয়েছে।আম্রা ধীরে ধীরে নতুন নতুন প্রোডাক্ট যুক্ত করবো ইনশাল্লাহ।"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
         @font-face {
          font-family: 'SolaimanLipi';
          src: url('/SolaimanLipi.woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }`,
          }}
        />
      </Head>
      <Box p="20px" mb="70px">
        <Box textAlign="center" mt="1rem" mb="4.5rem">
          <H1 fontSize="5rem" fontWeight="600">
            Our Blog
          </H1>
        </Box>
        {blogs.length > 0 && (
          <Grid container spacing={10}>
            {blogs
              .filter((blog) => {
                return selectedCategory === ''
                  ? blog
                  : blog.category === selectedCategory;
              })
              .map((blog) => (
                <Grid item lg={4} md={6} xs={12} key={blog.postTitle}>
                  <BlogCard {...blog} />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

BlogsList.layout = OtherLayout;

export async function getStaticProps() {
  let blogs=[];
  let categories=[];
  let count=null;
  try {
    blogs = await useAllBlogs();
  }
  catch (e) {

  }
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
        blogs,
        categories,
        count,
      },
      revalidate: 30,
    };
  }
}

export default BlogsList;