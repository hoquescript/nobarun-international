import React from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import getYoutubeId from '../../helpers/getYoutubeId';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import { deleteBlogMedia, featuredBlogMedia } from '../../store/slices/blogs';
import {
  deleteProductMedia,
  featuredProductMedia,
} from '../../store/slices/products';
import {
  deleteContactImage,
  deleteMedia,
  featuredMedia,
  setGlobalPage,
  toggleToolbar,
} from '../../store/slices/ui';
const objectBaseUrl =
  'https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com';

interface FileButtonProps {
  showMedia?: boolean;
  setPage?: any;
  postKey?: string | number;
  setPostSectionKey?: any;
  page:
    | ''
    | 'product'
    | 'blog'
    | 'review'
    | 'query'
    | 'client'
    | 'contact'
    | 'contactLogo'
    | 'pMain'
    | 'pKeypoint'
    | 'pCategory'
    | 'pCategoryFeatured'
    | 'pCollection'
    | 'bCategory'
    | 'bPostSection'
    | 'pCategoryIcon'
    | 'bMain';
}

const FileButton = (props: FileButtonProps) => {
  const { page, setPage, showMedia, postKey, setPostSectionKey } = props;

  const dispatch = useTypedDispatch();

  let media: any;
  if (page === 'product')
    media = useTypedSelector((state) => state.ui.productMedia);
  if (page === 'review')
    media = useTypedSelector((state) => state.ui.reviewMedia);
  if (page === 'query')
    media = useTypedSelector((state) => state.ui.queryMedia);
  if (page === 'client')
    media = useTypedSelector((state) => state.ui.clientMedia);
  if (page === 'pCategory')
    media = useTypedSelector((state) => state.ui.productCategoryMedia);
  if (page === 'pCategoryFeatured')
    media = useTypedSelector((state) => state.ui.productCategoryCoverMedia);
  if (page === 'pCollection')
    media = useTypedSelector((state) => state.ui.productCollectionMedia);
  if (page === 'bCategory')
    media = useTypedSelector((state) => state.ui.blogCategoryMedia);
  if (page === 'bMain')
    media = useTypedSelector((state) => state.blogs.blogsMedia.main);
  if (page === 'bPostSection')
    media = useTypedSelector(
      (state) => state.blogs.blogsMedia.postSection[postKey as string],
    );
  if (page === 'pMain')
    media = useTypedSelector((state) => state.products.productMedia.main);
  if (page === 'pKeypoint')
    media = useTypedSelector(
      (state) =>
        state.products.productMedia.keyPoints &&
        state.products.productMedia.keyPoints[postKey as string],
    );
  if (page === 'contact')
    media = useTypedSelector(
      (state) =>
        state.ui.contactsMedia && state.ui.contactsMedia[postKey as string],
    );

  if (page === 'contactLogo')
    media = useTypedSelector((state) => state.ui.contactLogoMedia);

  const featureImageHandler = (page, src) => {
    if (['pMain'].includes(page)) {
      dispatch(featuredProductMedia({ page, src, key: postKey }));
    } else if (['bMain'].includes(page)) {
      dispatch(featuredBlogMedia({ page, src, key: postKey }));
    } else {
      dispatch(featuredMedia({ page, src, key: postKey }));
    }
  };
  const deleteImageHandler = (type, page, index) => {
    if (['pMain', 'pKeypoint'].includes(page)) {
      dispatch(deleteProductMedia({ type, page, index, key: postKey }));
    } else if (['bMain', 'bPostSection'].includes(page)) {
      dispatch(deleteBlogMedia({ type, page, index, key: postKey }));
    } else if (page === 'contact') {
      dispatch(deleteContactImage({ type, page, index, key: postKey }));
    } else {
      dispatch(deleteMedia({ type, page, index, key: postKey }));
    }
  };
  return (
    <div className="product-images">
      {showMedia &&
        media &&
        media.images &&
        media.images.map((src, idx) => (
          <figure
            key={src + idx}
            className={`${media.featured === src ? 'isFeatured' : ''} ${
              ![
                'pCollection',
                'pKeypoint',
                'bPostSection',
                'bCategory',
                'client',
                'contact',
                'query',
                'contactLogo',
              ].includes(page)
                ? ''
                : 'hideFeaturedOption'
            } ${page === 'contact' ? 'contact__figure' : ''}
            `}
          >
            <button
              type="button"
              className="featured-image"
              onClick={() => featureImageHandler(page, src)}
            >
              <FaCheck />
            </button>
            <button
              type="button"
              className="remove-image"
              onClick={() => deleteImageHandler('images', page, idx)}
            >
              <FaTimes />
            </button>
            <img src={`${objectBaseUrl}/${src}`} alt="" />
          </figure>
        ))}
      {showMedia &&
        media &&
        media.videos &&
        media.videos.map((src, idx) => {
          const id = getYoutubeId(src);
          return (
            <figure
              key={id + idx}
              className={`${media.featured === src ? 'isFeatured' : ''} ${
                ![
                  'pCollection',
                  'pKeypoint',
                  'bPostSection',
                  'bCategory',
                  'client',
                  'contact',
                  'query',
                ].includes(page)
                  ? ''
                  : 'hideFeaturedOption'
              } 
              `}
            >
              <button
                type="button"
                className="featured-image"
                onClick={() => featureImageHandler(page, src)}
              >
                <FaCheck />
              </button>
              <button
                type="button"
                className="remove-image"
                onClick={() => deleteImageHandler('videos', page, idx)}
              >
                <FaTimes />
              </button>
              <img
                src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                alt=""
              />
            </figure>
          );
        })}
      {([
        'pKeypoint',
        'pCollection',
        'bPostSection',
        'pCategoryFeatured',
        'bCategory',
        'client',
        'contact',
        'contactLogo',
      ].includes(page) &&
        media &&
        media.images &&
        media.images.length === 1) ||
      (page === 'pCategory' &&
        media &&
        media.images &&
        media.images.length === 2) ? (
        ''
      ) : (
        <button
          className="add-new-image"
          style={{ height: '71px', background: '#fff', cursor: 'pointer' }}
          onClick={() => {
            setPage && setPage(page);
            setPostSectionKey && setPostSectionKey(postKey);
            if (page === 'pCategoryFeatured') {
              dispatch(setGlobalPage(page));
            } else {
              dispatch(setGlobalPage(''));
            }
            dispatch(toggleToolbar());
          }}
        >
          <FaPlus />
        </button>
      )}
    </div>
  );
};

export default FileButton;
