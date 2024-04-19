import { gql } from 'graphql-request';
import getYoutubeId from 'helpers/getYoutubeId';
import Client from '../../config/GraphQLRequest';

const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: String!) {
    getPopulatedProductBySlug(slug: $id) {
      productData {
        product {
          id
          productName
          productCode
          price
          originalPrice
          featured
          imageObject {
            name
            src
          }
          videos
          banglaVersionLink
          document
          stockStatus {
            title
          }
          keyPoints {
            title
            content
            images
          }
          features
          specification
          questions {
            title
            question
          }
          tags
          contactPerson {
            companyLogo
            name
            whatsAppNumber
            email
            address
            maps
            amenities {
              title
              image
            }
          }
          seoTitle: SeoTitle
          description: title
          keywords
          relatedClients {
            title: clientName
            imgUrl: logo
          }
        }
        reviewCount
        ratingAverage
      }
      populatedRelatedProducts {
        name: productName
        image: featured
        slug
        ratingAverage
        totalReviewCount
      }
      populatedReviews {
        id
        title
        name
        rating
        createdAt
        featuredImage
        reviewText
        reviewMedia {
          images
          videos
        }
      }
    }
  }
`;

const useProductById = async (pid) => {
  try {
    const data = await Client.request(GET_PRODUCT_BY_ID, { id: pid });
    const productById = data?.getPopulatedProductBySlug?.productData;
    // console.log(data?.getPopulatedProductBySlug);
    const product = {
      intro: {
        id: productById && productById.product && productById.product.id ? productById.product.id:null ,
        productName: productById?.product?.productName,
        price: productById?.product?.price,
        originalPrice: productById?.product?.originalPrice,
        review: productById?.reviewCount,
        rating: productById?.ratingAverage,
        productCode: productById?.product?.productCode,
        stockStatus: productById && productById.product && productById.product.stockStatus && productById.product.stockStatus.title ? productById.product.stockStatus.title:null ,
        featuredImage: productById?.product?.imageObject?.find(
          (img) => img.src === productById?.product?.featured,
        ) || { name: '', src: '' },
        images: productById?.product?.imageObject,
        banglaVersionLink: productById?.product?.banglaVersionLink,
        document: productById?.product?.document,
        videos: productById?.product?.videos?.map((video) => {
          const id = getYoutubeId(video);
          return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
        }),
      },
      seo: {
        title: productById?.product?.seoTitle,
        description: productById?.product?.description,
        keywords: productById?.product?.keywords,
      },
      clients: productById?.product?.relatedClients,
      keyPoints: productById?.product?.keyPoints,
      features: productById?.product?.features,
      specifications: productById?.product?.specification,
      questions: productById?.product?.questions,
      tags: productById?.product?.tags,
      reviews: data?.getPopulatedProductBySlug?.populatedReviews,
      relatedProducts: data?.getPopulatedProductBySlug?.populatedRelatedProducts,
      contact: productById?.product?.contactPerson,
    };
    return product;
  }
  catch (e) {
    throw e
  }
};

export default useProductById;
