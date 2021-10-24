import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import getYoutubeId from '../../helpers/getYoutubeId';
import useAllMedia from '../../hooks/Appearance/useAllMedia';

import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import { fetchMedia } from '../../store/slices/ui';
import images from './images';

const Videos = () => {
  const links = useTypedSelector((state) => state.ui.links);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (links.length === 0) {
      useAllMedia().then((media) => {
        dispatch(fetchMedia(media));
      });
    }
  }, [links]);

  return (
    <div className="container-fluid">
      <div
        className="youtube__thumbnails"
        style={{ maxHeight: 'max-content', overflow: 'hidden' }}
      >
        {[...links].reverse().map((link, idx) => {
          const id = getYoutubeId(link.src);
          return (
            <div
              key={link.src + idx}
              className="youtube__thumbnail mr-10"
              style={{ height: '13rem', width: '17rem' }}
              // onClick={() => selectVideoHandler(link.src)}
            >
              <div className="youtube__thumbnail_remove">
                <FaTimes />
              </div>
              <figure>
                <img
                  src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                  alt=""
                />
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Videos;
