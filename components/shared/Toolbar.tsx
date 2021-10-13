import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';
import { FaPlus, FaSlack } from 'react-icons/fa';

import getYoutubeId from '../../helpers/getYoutubeId';
import useAllMedia from '../../hooks/Appearance/useAllMedia';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import {
  addImage,
  addYoutubeLink,
  closeToolbar,
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

interface ToolbarProps {
  imageSelector?: any;
  videoSelector?: any;
}
const Toolbar = forwardRef((props: ToolbarProps, ref) => {
  const { imageSelector, videoSelector } = props;
  const show = useTypedSelector((state) => state.ui.showToolbar);
  const images = useTypedSelector((state) => state.ui.images);
  const links = useTypedSelector((state) => state.ui.links);
  const router = useRouter();
  const [addMedia] = useMutation(ADD_NEW_MEDIA);

  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [link, setLink] = useState('');
  const dispatch = useTypedDispatch();

  useImperativeHandle(ref, () => ({
    mediaHandler(handler) {
      handler();
    },
  }));

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
    if (imageSelector) {
      imageSelector(imageSrc);
    } else {
      dispatch(selectImage({ src: imageSrc, path: router.asPath }));
    }
  };

  const selectVideoHandler = (videoSrc) => {
    if (videoSelector) {
      videoSelector(videoSrc);
    } else {
      dispatch(selectVideo({ src: videoSrc, path: router.asPath }));
    }
  };

  useEffect(() => {
    uploadImages();
  }, [imageFile]);

  const toolbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        show &&
        toolbarRef.current &&
        !toolbarRef?.current.contains(event.target)
      ) {
        dispatch(closeToolbar());
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const fileName = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const text = fileName.current?.innerText;
    console.log('Media', text);
    if (text && fileName.current && text?.length > 10) {
      const value = text.substring(0, 10).concat('...');
      fileName.current.innerText = value;
    }
  }, [images]);

  return (
    <div
      ref={toolbarRef}
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
        <FaSlack />
      </button>
      <div className="side-panel__content">
        <div className="accordion">
          <div className="accordion__title has-actions active flex sb">
            <h4>Media Gallery</h4>
            <div className="product-images">
              <input
                type="file"
                id="product"
                accept="image/*, video/*"
                multiple
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
              {images.map((image, idx) => {
                let name: string;
                if (image.name?.length > 10)
                  name = image.name.substring(0, 10).concat('...');
                else name = image.name;
                return (
                  <div
                    key={image.name + idx}
                    className="images-gallery__image"
                    onClick={() => selectImageHandler(image.src)}
                  >
                    <i className="check-circle-icon selected-mark"></i>
                    <figure>
                      <img src={image.src} alt="" />
                    </figure>
                    <h5 ref={fileName}>{name}</h5>
                  </div>
                );
              })}
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
            {links.map((link, idx) => {
              const id = getYoutubeId(link.src);
              return (
                <div
                  key={link.src + idx}
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
});

export default Toolbar;
