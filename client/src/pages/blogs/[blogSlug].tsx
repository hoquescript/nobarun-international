import BlogContact from '@component/blog/BlogContact';
import Box from '@component/Box';
import Grid from '@component/grid/Grid';
import OtherLayout from '@component/layout/OtherLayout';
import BlogFilterCard from '@component/products/BlogFilterCard';
import ShareButton from '@component/ShareButton/ShareButton';
import { H1, H3 } from '@component/Typography';
import useBlogCategoriesTree from '@hook/Blogs/useAllBlogCategory';
import useBlogBySlug from '@hook/Blogs/useBlogBySlug';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react';

const BlogDetails = ({ blogSlug, blog, blogCategories }) => {
  return (
    <Fragment>
      <Head>
        <title>{blog.SeoTitle}</title>
        <meta name="description" content={blog.description} />
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
      {/* <ProductHead product={product} /> */}
      <div className="hero">
        <h2 className="hero__title" style={{ marginBottom: '6rem' }}>
          Our Blog
        </h2>
      </div>
      <Grid container spacing={10}>
        <Grid item md={8} sm={12} xs={12} className="blog">
          <H1 className="blog__title">{blog?.blogTitle}</H1>
          <div className="blog__hero">
            <img
              src={process.env.NEXT_PUBLIC_IMAGE_URL + blog?.featured}
              alt={blog?.SeoTitle}
            />
            <ShareButton
              title={blog?.blogTitle}
              description={blog?.SeoTitle}
              featured={blog?.featured}
              hashtags={blog?.tags}
            />
          </div>
          {blog?.sections?.map((section) => (
            <Box key={section.id} className="blog__section">
              <H3>{section.title}</H3>
              <div
                dangerouslySetInnerHTML={{
                  __html: section.content,
                }}
              />
            </Box>
          ))}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <BlogContact slug={blogSlug} contact={blog?.contactPerson} />
          <BlogFilterCard
            slug={blog?.populatedCategory?.name}
            categories={blogCategories}
            showTags
            tags={blog.tags}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

BlogDetails.layout = OtherLayout;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const blogSlug = context.params.blogSlug;
  try {
    const data = await useBlogBySlug(blogSlug);
    const blogCategories = await useBlogCategoriesTree();
    const categories = await useAllProductCategories();

    return {
      props: {
        blogSlug,
        blog: { ...data },
        categories,
        blogCategories,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default BlogDetails;
