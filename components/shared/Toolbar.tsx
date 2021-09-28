import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
import { linkSync } from 'fs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillSetting, AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import getYoutubeId from '../../helpers/getYoutubeId';
import useAllMedia from '../../hooks/Appearance/useAllMedia';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import {
  addImage,
  addYoutubeLink,
  fetchMedia,
  selectImage,
  selectVideo,
  toggleToolbar,
} from '../../store/slices/ui';

const baseUrl =
  'https://eyeb3obcg1.execute-api.us-east-2.amazonaws.com/default/uploadAnyTypeMedia';
const objectBaseUrl = 'https://nobarun.s3.us-east-2.amazonaws.com';

const ADD_NEW_MEDIA = gql`
  mutation addImage($data: GalleryInput!) {
    addImagesAndVideosTOGallery(data: $data)
  }
`;

const Toolbar = () => {
  const show = useTypedSelector((state) => state.ui.showToolbar);
  const images = useTypedSelector((state) => state.ui.images);
  const links = useTypedSelector((state) => state.ui.links);
  const router = useRouter();
  const [addMedia] = useMutation(ADD_NEW_MEDIA);

  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [link, setLink] = useState('');
  const dispatch = useTypedDispatch();

  useEffect(() => {
    useAllMedia().then((media) => {
      dispatch(fetchMedia(media));
    });
  }, []);

  const imageUploadHandler = (e) => {
    const { files } = e.target;
    if (files) {
      setImageFile(files);
    }
  };

  const uploadImages = async () => {
    if (imageFile) {
      for (let i = 0; i < imageFile?.length; i++) {
        const { Key, uploadURL } = await (await axios.get(baseUrl)).data;
        const { url } = await (await axios.put(uploadURL, imageFile[i])).config;
        const objectUrl = `${objectBaseUrl}/${Key}`;
        dispatch(addImage({ src: objectUrl, name: imageFile[i].name }));
        addMedia({
          variables: {
            data: {
              images: [{ src: objectUrl, name: imageFile[i].name }],
              videos: [],
            },
          },
        });
      }
    }
  };

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

  const selectImageHandler = (imageSrc) => {
    dispatch(selectImage({ src: imageSrc, path: router.asPath }));
  };

  const selectVideoHandler = (videoSrc) => {
    dispatch(selectVideo({ src: videoSrc, path: router.asPath }));
  };

  useEffect(() => {
    uploadImages();
  }, [imageFile]);

  return (
    <div
      id="tools-panel"
      className={`side-panel side-panel--floated ${show ? 'active' : ''}`}
    >
      <button
        type="button"
        className="btn-icon-fade side-panel__toggle show-panel"
        data-target="#tools-panel"
        onClick={() => {
          dispatch(toggleToolbar());
        }}
      >
        <AiFillSetting />
      </button>
      <div className="side-panel__title">
        <h3>Tools</h3>
      </div>

      <div className="side-panel__content">
        <div className="accordion">
          <div className="accordion__title has-actions active flex sb">
            <h4>Media Gallery</h4>
            <div className="product-images">
              <input
                type="file"
                id="product"
                accept="image/*, video/*"
                style={{ display: 'none', height: '71px' }}
                onChange={(e) => imageUploadHandler(e)}
              />

              <label
                className="add-new-image"
                htmlFor="product"
                style={{ height: '71px' }}
              >
                <FaPlus />
              </label>
            </div>
          </div>
          <div
            className="accordion__content active"
            style={{ display: 'block' }}
          >
            <div className="search-input mb-30">
              <AiOutlineSearch className="search-icon" />
              <input
                type="text"
                className="custom-input"
                placeholder="Search"
              />
            </div>
            <div className="images-gallery">
              {images.map((image) => (
                <div
                  className="images-gallery__image"
                  onClick={() => selectImageHandler(image.src)}
                >
                  <i className="check-circle-icon selected-mark"></i>
                  <figure>
                    <img src={image.src} alt="" />
                  </figure>
                  <h5>{image.name}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="accordion">
          <div className="accordion__title">
            <h4>Video Gallery</h4>
          </div>
          <div
            className="accordion__content active"
            style={{ display: 'block' }}
          >
            <div className="field youtube">
              <AiFillYoutube className="youtube__icon" />
              <input
                type="text"
                className={`custom-input youtube__youtube`}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Post Your Youtube Link"
              />
              <button className="youtube__add" onClick={youtubeLinkHandler}>
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="youtube__thumbnails">
            {links.map((link) => {
              const id = getYoutubeId(link.src);
              return (
                <div
                  className="youtube__thumbnail"
                  onClick={() => selectVideoHandler(link.src)}
                >
                  <i className="check-circle-icon selected-mark"></i>
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
      </div>
    </div>
  );
};

export default Toolbar;
