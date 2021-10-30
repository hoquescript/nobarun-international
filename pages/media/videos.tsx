import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AiFillYoutube } from 'react-icons/ai';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Loader from '../../components/shared/Loader';
import getYoutubeId from '../../helpers/getYoutubeId';
import useAllMedia from '../../hooks/Appearance/useAllMedia';

import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import {
  addYoutubeLink,
  deleteMediaGallery,
  fetchMedia,
} from '../../store/slices/ui';

const ADD_NEW_MEDIA = gql`
  mutation addImage($data: GalleryInput!) {
    addImagesAndVideosTOGallery(data: $data)
  }
`;
const DELETE_VIDEO = gql`
  mutation deleteVideo($data: StaticInput!) {
    removeVideo(data: $data)
  }
`;

const Videos = () => {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');

  const links = useTypedSelector((state) => state.ui.links);

  const [addMedia] = useMutation(ADD_NEW_MEDIA);
  const [deleteVideo] = useMutation(DELETE_VIDEO);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (links.length === 0) {
      setLoading(true);
      useAllMedia().then((media) => {
        dispatch(fetchMedia(media));
        setLoading(false);
      });
    }
  }, [links]);

  const youtubeLinkHandler = () => {
    dispatch(addYoutubeLink(link));
    addMedia({
      variables: {
        data: {
          images: [],
          videos: [
            {
              name: 'Tube-1',
              src: link,
            },
          ],
        },
      },
    });
    setLink('');
  };

  const deleteHandler = async (name: string, url: string, type: string) => {
    dispatch(deleteMediaGallery({ src: url, type }));
    if (type === 'video')
      deleteVideo({
        variables: {
          data: {
            name,
            src: url,
          },
        },
      });
  };

  return (
    <div className="container-fluid">
      {loading && <Loader />}
      <div className="row mb-60">
        <div className="col-6">
          <h1 className="heading-primary">Video Gallery</h1>
        </div>
        <div className="col-6">
          <div
            className="field youtube custom_youtube"
            style={{ border: '1px solid #dbdbdb;' }}
          >
            <AiFillYoutube className="youtube__icon" />
            <input
              type="text"
              className={`custom-input youtube__youtube `}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Post Your Youtube Link"
            />
            <button className="youtube__add" onClick={youtubeLinkHandler}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      <div
        className="youtube__thumbnails"
        style={{ maxHeight: 'max-content', overflow: 'hidden' }}
      >
        {[...links].reverse().map((link, idx) => {
          const id = getYoutubeId(link.src);
          return (
            <div
              key={link.src + idx}
              className="youtube__thumbnail"
              style={{ height: '13rem', width: '17rem' }}
              // onClick={() => selectVideoHandler(link.src)}
            >
              <div
                className="youtube__thumbnail_remove"
                onClick={() => deleteHandler(link.name, link.src, 'video')}
              >
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
