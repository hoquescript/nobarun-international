import React, { useRef } from 'react';
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
  page:
    | 'product'
    | 'blog'
    | 'review'
    | 'pCategory'
    | 'pCollection'
    | 'bCategory';
}) => {
  const { page, showMedia } = props;

  const ref = useRef();
  const dispatch = useTypedDispatch();

  let media: any;
  if (page === 'product')
    media = useTypedSelector((state) => state.ui.productMedia);
  if (page === 'review')
    media = useTypedSelector((state) => state.ui.reviewMedia);
  if (page === 'pCategory')
    media = useTypedSelector((state) => state.ui.productCategoryMedia);
  if (page === 'pCollection')
    media = useTypedSelector((state) => state.ui.productCollectionMedia);
  if (page === 'bCategory')
    media = useTypedSelector((state) => state.ui.blogCategoryMedia);

  return (
    <div className="product-images">
      {showMedia &&
        media.images.map((src) => (
          <figure>
            <button type="button" className="remove-image">
              <i className="times-icon"></i>
            </button>
            <img src={src} alt="" />
          </figure>
        ))}
      {showMedia &&
        media.videos.map((src) => {
          const id = getYoutubeId(src);
          return (
            <figure>
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

      <button
        className="add-new-image"
        style={{ height: '71px', background: '#fff', cursor: 'pointer' }}
        onClick={() => {
          dispatch(toggleToolbar());
        }}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default FileButton;
