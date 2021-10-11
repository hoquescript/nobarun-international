import React from 'react';
import { FaPlus } from 'react-icons/fa';
import getYoutubeId from '../../helpers/getYoutubeId';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import { toggleToolbar } from '../../store/slices/ui';
import Toolbar from '../shared/Toolbar';

const FileButton = (props: {
  showMedia?: boolean;
  setPage?: any;
  postKey?: string | number;
  setPostSectionKey?: any;
  page:
    | ''
    | 'product'
    | 'blog'
    | 'review'
    | 'client'
    | 'contact'
    | 'pMain'
    | 'pKeypoint'
    | 'pCategory'
    | 'pCollection'
    | 'bCategory'
    | 'bPostSection'
    | 'bMain';
}) => {
  const { page, setPage, showMedia, postKey, setPostSectionKey } = props;

  const dispatch = useTypedDispatch();

  let media: any;
  if (page === 'product')
    media = useTypedSelector((state) => state.ui.productMedia);
  if (page === 'review')
    media = useTypedSelector((state) => state.ui.reviewMedia);
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

  return (
    <div className="product-images">
      {showMedia &&
        media &&
        media.images &&
        media.images.map((src, idx) => (
          <figure key={src + idx}>
            <button type="button" className="remove-image">
              <i className="times-icon"></i>
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
            <figure key={id + idx}>
              <button type="button" className="remove-image">
                <i className="times-icon"></i>
              </button>
              <img
                src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                alt=""
              />
            </figure>
          );
        })}
      {(page === 'pKeypoint' &&
        media &&
        media.images &&
        media.images.length + media.videos.length === 2) ||
      (page === 'bPostSection' &&
        media &&
        media.images &&
        media.images.length + media.videos.length === 2) ? (
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
      )}
    </div>
  );
};

export default FileButton;
