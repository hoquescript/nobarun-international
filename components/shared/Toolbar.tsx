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
import { FaPlus, FaSlack, FaTimes, FaVideo } from 'react-icons/fa';

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
import fuzzyMatch from '../../helpers/fuzzySearch';

const baseUrl =
  'https://xwkodx6vi3.execute-api.ap-south-1.amazonaws.com/v1?extension=';
const objectBaseUrl =
  'https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com';

const ADD_NEW_MEDIA = gql`
  mutation addImage($data: GalleryInput!) {
    addImagesAndVideosTOGallery(data: $data)
  }
`;
const ADD_HALLMARK_IMAGE = gql`
  mutation hallmarkImage($data: Hallmark!) {
    uploadImageinS3withHallmark(data: $data)
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
  const shouldHallmark = useTypedSelector((state) => state.ui.shouldHallmark);

  const router = useRouter();

  const [addMedia] = useMutation(ADD_NEW_MEDIA);
  const [addHallmark] = useMutation(ADD_HALLMARK_IMAGE);
  const [deleteImage] = useMutation(DELETE_IMAGE);
  const [deleteVideo] = useMutation(DELETE_VIDEO);

  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [link, setLink] = useState('');
  const [isImageLoade, setImageLoaded] = useState(false);
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
        const fileName = imageFile[i].name;
        const extension = fileName.split('.').pop();

        if (imageFile[i].size > 2097152) {
          alert.error(`${fileName} is more than 2MB`);
          break;
        }
        const isDuplicate = images.some((image) => image.name === fileName);
        if (isDuplicate) {
          alert.error(`${fileName} was Already Uploaded`);
          break;
        }

        const response = await axios.get(`${baseUrl}${extension}`);
        const { obj_location, fields, upload_url } = response.data;
        const formData = new FormData();
        formData.append('key', fields?.key);
        formData.append('policy', fields?.policy);
        formData.append('x-amz-algorithm', fields['x-amz-algorithm']);
        formData.append('x-amz-credential', fields['x-amz-credential']);
        formData.append('x-amz-date', fields['x-amz-date']);
        formData.append('x-amz-security-token', fields['x-amz-security-token']);
        formData.append('x-amz-signature', fields['x-amz-signature']);
        formData.append('file', imageFile[i]);
        await axios.post(upload_url, formData);

        const fileType = ['mp4', 'mov', 'wmv', 'avi', 'mkv']?.includes(
          extension!?.toLowerCase(),
        )
          ? 'video'
          : 'image';

        dispatch(
          addImage({
            src: obj_location,
            name: fileName,
            type: fileType,
          }),
        );

        // setImageLoaded(true);

        addMedia({
          variables: {
            data: {
              images: [
                {
                  src: obj_location,
                  name: fileName,
                  genre: fileType,
                },
              ],
              videos: [],
            },
          },
        });

        if (shouldHallmark) {
          addHallmark({
            variables: {
              data: {
                key: obj_location.replace('media/', ''),
                url: `${objectBaseUrl}/${obj_location}`,
              },
            },
          });
        }
      }
    }
  };

  const deleteHandler = async (
    name: string,
    url: string,
    type: 'image' | 'video' | 'youtube',
  ) => {
    dispatch(deleteMediaGallery({ src: url, type }));
    if (type === 'image' || type === 'video') {
      await axios.delete(
        `https://xwkodx6vi3.execute-api.ap-south-1.amazonaws.com/signature?object_path=${url}`,
      );

      await deleteImage({
        variables: {
          data: {
            name,
            src: url,
            genre: type,
          },
        },
      });
    }
    if (type === 'youtube')
      deleteVideo({
        variables: {
          data: {
            name,
            src: url,
            genre: type,
          },
        },
      });
  };

  const youtubeLinkHandler = () => {
    dispatch(
      addYoutubeLink({
        name: 'Tube-1',
        src: link,
        genre: 'youtube',
      }),
    );
    addMedia({
      variables: {
        data: {
          images: [],
          videos: [
            {
              name: 'Tube-1',
              src: link,
              genre: 'youtube',
            },
          ],
        },
      },
    });
    setLink('');
  };

  const selectImageHandler = (imageSrc, evt) => {
    if (!evt.target) {
      evt.target = evt.srcElement; //extend target property for IE
    }
    if (['BUTTON', 'svg', 'path'].includes(evt.target.tagName)) return;

    if (imageSelector) {
      imageSelector(imageSrc);
    } else {
      dispatch(selectImage({ src: imageSrc, path: router.asPath }));
    }
  };

  const selectVideoHandler = (videoSrc, evt) => {
    if (!evt.target) {
      evt.target = evt.srcElement; //extend target property for IE
    }
    if (['BUTTON', 'svg', 'path'].includes(evt.target.tagName)) return;

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
                style={{ width: '90%' }}
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
                    fuzzyMatch(image.name, imageSearch.toLowerCase()),
                  )
                  .map((image, idx) => {
                    let name: string;
                    if (image.name?.length > 20)
                      name = image.name.substring(0, 20).concat('...');
                    else name = image.name;
                    const searchRegex = new RegExp(imageSearch, 'gim');
                    const matched = name.match(searchRegex);
                    const imgURL = `${objectBaseUrl}/${image.src}`;
                    return (
                      <div className="col-4">
                        <div
                          key={image.name + idx}
                          className="images-gallery__image"
                          onClick={(e) => selectImageHandler(image.src, e)}
                        >
                          <button
                            onClick={() =>
                              deleteHandler(image.name, image.src, 'image')
                            }
                          >
                            <FaTimes />
                          </button>
                          {image.genre === 'video' ? (
                            <figure className="gallery-video">
                              <FaVideo />
                              <video
                                src={imgURL}
                                controls={false}
                                autoPlay={false}
                                muted
                                style={{ height: '7.5rem', width: '7.5rem' }}
                              >
                                Your browser does not support the video tag.
                              </video>
                            </figure>
                          ) : (
                            <figure>
                              <img src={imgURL} alt={image.name} />
                            </figure>
                          )}
                          <h5
                            ref={fileName}
                            style={{ wordWrap: 'break-word' }}
                            dangerouslySetInnerHTML={{
                              __html: name.replace(
                                searchRegex,
                                `<strong>${
                                  matched && matched.length > 0
                                    ? matched[0]
                                    : ''
                                }</strong>`,
                              ) as string,
                            }}
                          />
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
                      onClick={(e) => selectVideoHandler(link.src, e)}
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
