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
  toggleToolbar,
} from '../../store/slices/ui';

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
    | 'pMain'
    | 'pKeypoint'
    | 'pCategory'
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
                'review',
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
              onClick={() => deleteImageHandler('images', page, idx)}
            >
              <FaTimes />
            </button>
            <img src={src} alt="" />
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
                  'pCategory',
                  'pCollection',
                  'pKeypoint',
                  'bPostSection',
                  'bCategory',
                  'client',
                  'contact',
                  'review',
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
      {
        // (page === 'pKeypoint' &&
        //   media &&
        //   media.images &&
        //   media.images.length + media.videos.length === 2) ||
        // (page === 'bPostSection' &&
        //   media &&
        //   media.images &&
        //   media.images.length + media.videos.length === 2) ||
        // (page === 'pCategory' &&
        //   media &&
        //   media.images &&
        //   media.images.length + media.videos.length === 2) ||
        [
          'pKeypoint',
          'pCollection',
          'bPostSection',
          'pCategory',
          'bCategory',
          'client',
          'contact',
        ].includes(page) &&
        media &&
        media.images &&
        media.images.length === 1 ? (
          ''
        ) : (
          <button
            className="add-new-image"
            style={{ height: '71px', background: '#fff', cursor: 'pointer' }}
            onClick={() => {
              // console.log('I was clicked' + postKey);
              setPage && setPage(page);
              setPostSectionKey && setPostSectionKey(postKey);
              dispatch(toggleToolbar());
            }}
          >
            <FaPlus />
          </button>
        )
      }
    </div>
  );
};

export default FileButton;
