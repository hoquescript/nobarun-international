import React from 'react';
import { FaPlus } from 'react-icons/fa';
import getYoutubeId from '../../helpers/getYoutubeId';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import { toggleToolbar } from '../../store/slices/ui';

const FileButton = (props: { showMedia: boolean }) => {
  const { showMedia } = props;
  const dispatch = useTypedDispatch();
  const reviewMedia = useTypedSelector((state) => state.ui.reviewMedia);
  return (
    <div className="product-images">
      {showMedia &&
        reviewMedia.images.map((src) => (
          <figure>
            <button type="button" className="remove-image">
              <i className="times-icon"></i>
            </button>
            <img src={src} alt="" />
          </figure>
        ))}
      {showMedia &&
        reviewMedia.videos.map((src) => {
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
