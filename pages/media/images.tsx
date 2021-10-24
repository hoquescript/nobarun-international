import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import useAllMedia from '../../hooks/Appearance/useAllMedia';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import { fetchMedia } from '../../store/slices/ui';

const Images = () => {
  const images = useTypedSelector((state) => state.ui.images);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (images.length === 0) {
      useAllMedia().then((media) => {
        dispatch(fetchMedia(media));
      });
    }
  }, [images]);

  return (
    <div className="container-fluid">
      <div className="images-gallery" style={{ maxHeight: 'max-content' }}>
        {[...images]
          .reverse()
          // .filter((image) =>
          //   image.name.toLowerCase().startsWith(imageSearch.toLowerCase()),
          // )
          .map((image, idx) => {
            let name: string;
            if (image.name?.length > 20)
              name = image.name.substring(0, 20).concat('...');
            else name = image.name;
            return (
              <div
                key={image.name + idx}
                className="images-gallery__image"
                // onClick={() => selectImageHandler(image.src)}
              >
                <button className="images-gallery__rmvBtn">
                  <FaTimes
                  // onClick={() => deleteImageHandler(image.src)}
                  />
                </button>
                <figure>
                  <img src={image.src} alt="" />
                </figure>
                <h5
                  style={{ wordWrap: 'break-word' }}
                  // ref={fileName}
                >
                  {name}
                </h5>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Images;
