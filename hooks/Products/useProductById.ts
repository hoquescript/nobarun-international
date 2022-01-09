import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: String!) {
    getProductById(productId: $id) {
      id
      productName
      category
      stockStatus
      contactPerson
      price
      originalPrice
      discount
      productCode
      featured
      images
      videos
      banglaVersionLink
      document
      keyPoints {
        id
        title
        content
        images
        videos
      }
      features
      specification
      questions {
        id
        title
        question
      }
      keywords
      collectionName
      tags
      isPublished
      SeoTitle
      title
      slug
      url
      siteMap
      populatedCategories {
        value: id
        id: name
      }
      populatedRelatedProducts {
        value: id
        id: productName
      }
      relatedClients {
        value: id
        id: clientName
      }
      createdAt
    }
  }
`;

const useProductById = async (catid) => {
  const data = await Client.request(GET_PRODUCT_BY_ID, { id: catid });
  const productById = data.getProductById;
  const media = {};
  const contents = {};
  const points = {};
  const questions = {};
  productById.keyPoints.forEach((keyPoint) => {
    media[keyPoint.id] = {
      images: keyPoint.images,
      videos: keyPoint.videos,
    };
    contents[keyPoint.id] = {
      title: keyPoint.title,
      content: keyPoint.content,
    };
    points[keyPoint.id] = keyPoint.content;
  });
  productById.questions.forEach((keyPoint) => {
    questions[keyPoint.id] = {
      title: keyPoint.title,
      content: keyPoint.content,
    };
  });
  const product = {
    mainContent: {
      id: productById.id,
      isPublished: productById.isPublished,
      productName: productById.productName,
      banglaVersionLink: productById.banglaVersionLink,
      document: productById.document,
      price: productById.price,
      originalPrice: productById.originalPrice,
      discount: productById.discount,
      productCode: productById.productCode,
      category: productById.category,
      collectionName: productById.collectionName,
      stockStatus: productById.stockStatus,
      contactPerson: productById.contactPerson,
      SeoTitle: productById.SeoTitle,
      title: productById.title,
      slug: productById.slug,
      url: productById.url,
      siteMap: productById.siteMap,
      viewCount: productById.viewCount,
    },
    main: {
      featured: productById.featured,
      images: productById.images,
      videos: productById.videos,
    },
    keyPoints: {
      media,
      contents,
      points,
    },
    tags: productById.tags,
    questions: productById.questions,
    specification: productById.specification,
    keywords: productById.keywords,
    features: productById.features,
    relatedCategories: productById.populatedCategories,
    relatedProducts: productById.populatedRelatedProducts,
    relatedClients: productById.relatedClients,
    createdAt: productById.createdAt,
  };
  return product;
};

export default useProductById;
