import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import { useAlert } from 'react-alert';
import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';
import { FaPlus, FaSlack, FaTimes } from 'react-icons/fa';

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
  deleteMediaGallery,
} from '../../store/slices/ui';

const baseUrl =
  'https://eyeb3obcg1.execute-api.us-east-2.amazonaws.com/default/uploadAnyTypeMedia';
const objectBaseUrl = 'https://nobarun.s3.us-east-2.amazonaws.com';

const ADD_NEW_MEDIA = gql`
  mutation addImage($data: GalleryInput!) {
    addImagesAndVideosTOGallery(data: $data)
  }
`;
const DELETE_IMAGE = gql`
  mutation deleteImage($data: StaticInput!) {
    removeImage(data: $data)
  }
`;
const DELETE_VIDEO = gql`
  mutation deleteVideo($data: StaticInput!) {
    removeVideo(data: $data)
  }
`;

interface ToolbarProps {
  imageSelector?: any;
  videoSelector?: any;
}
const Toolbar = forwardRef((props: ToolbarProps, ref) => {
  const alert = useAlert();

  const { imageSelector, videoSelector } = props;
  const show = useTypedSelector((state) => state.ui.showToolbar);
  const images = useTypedSelector((state) => state.ui.images);
  const links = useTypedSelector((state) => state.ui.links);
  const router = useRouter();

  const [addMedia] = useMutation(ADD_NEW_MEDIA);
  const [deleteImage] = useMutation(DELETE_IMAGE);
  const [deleteVideo] = useMutation(DELETE_VIDEO);

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
        if (imageFile[i].size > 2097152) {
          alert.error(`${imageFile[i].name} is more than 2MB`);
          break;
        }
        const { Key, uploadURL } = await (await axios.get(baseUrl)).data;
        const { url } = await (await axios.put(uploadURL, imageFile[i])).config;
        console.log(url, Key);
        const objectUrl = `${objectBaseUrl}/${Key}`;
        const dummy = await axios.get(baseUrl, {
          params: {
            url: objectUrl,
            key: objectUrl.replace(
              'https://nobarun.s3.us-east-2.amazonaws.com/',
              '',
            ),
          },
        });
        console.log(dummy);

        console.log(objectUrl);
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

  const deleteHandler = async (name: string, url: string, type: string) => {
    dispatch(deleteMediaGallery({ src: url, type }));
    if (type === 'image') {
      const dummy = await axios.get(baseUrl, {
        params: {
          key: url.replace('https://nobarun.s3.us-east-2.amazonaws.com/', ''),
        },
      });

      await deleteImage({
        variables: {
          data: {
            name,
            src: url,
          },
        },
      });
    }
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
        // show &&
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
    if (text && fileName.current && text?.length > 20) {
      const value = text.substring(0, 20).concat('...');
      fileName.current.innerText = value;
    }
  }, [images]);

  const [imageSearch, setImageSearch] = useState('');
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
                onChange={(e) => {
                  setImageSearch(e.target.value);
                }}
              />
            </div>
            <div className="toolbar_images">
              <div className="row">
                {[...images]
                  .reverse()
                  .filter((image) =>
                    image.name
                      .toLowerCase()
                      .startsWith(imageSearch.toLowerCase()),
                  )
                  .map((image, idx) => {
                    let name: string;
                    if (image.name?.length > 20)
                      name = image.name.substring(0, 20).concat('...');
                    else name = image.name;
                    return (
                      <div className="col-4">
                        <div
                          key={image.name + idx}
                          className="images-gallery__image"
                          onClick={() => selectImageHandler(image.src)}
                        >
                          <button
                            onClick={() =>
                              deleteHandler(image.name, image.src, 'image')
                            }
                          >
                            <FaTimes />
                          </button>
                          <figure>
                            <img src={image.src} alt="" />
                          </figure>
                          <h5 ref={fileName} style={{ wordWrap: 'break-word' }}>
                            {name}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
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
          <div className="toolbar_images">
            <div className="row">
              {[...links].reverse().map((link, idx) => {
                const id = getYoutubeId(link.src);
                return (
                  <div className="col-4">
                    <div
                      key={link.src + idx}
                      className="youtube__thumbnail"
                      onClick={() => selectVideoHandler(link.src)}
                    >
                      <div
                        className="youtube__thumbnail_remove"
                        onClick={() =>
                          deleteHandler(link.name, link.src, 'video')
                        }
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Toolbar;
