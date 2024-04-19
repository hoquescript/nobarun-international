import Head from 'next/head';
import React from 'react';

const ProductHead = ({ product, schema }: { product: any; schema: any }) => {
  return (
    <Head>
      <title>{product?.seo?.title || 'Nobarun - Product Details'}</title>
      <meta name="description" content={product?.seo?.description} />
      <meta name="keywords" content={product?.seo?.keywords.join(', ')} />
      <meta property="og:title" content={product?.seo?.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.nobarunbd.com/" />
      <meta
        property="og:image:url"
        content={
          process.env.NEXT_PUBLIC_IMAGE_URL + product?.intro?.featuredImage?.src
        }
      />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />
      <meta property="og:description" content={product?.seo?.description} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default ProductHead;
