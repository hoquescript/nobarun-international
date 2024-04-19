import React, { useState, useEffect, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAlert } from 'react-alert';
import { FaPlus, FaTimes, FaVideo } from 'react-icons/fa';
import axios from 'axios';
import Search from '../../components/controls/search';
import Loader from '../../components/shared/Loader';
import useAllMedia from '../../hooks/Appearance/useAllMedia';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import {
  addImage,
  deleteMediaGallery,
  fetchMedia,
} from '../../store/slices/ui';
import fuzzyMatch from '../../helpers/fuzzySearch';

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

const baseUrl =
  'https://xwkodx6vi3.execute-api.ap-south-1.amazonaws.com/v1?extension=';
const objectBaseUrl =
  'https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com';

const Images = () => {
  const alert = useAlert();

  const images = useTypedSelector((state) => state.ui.images);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  const [addMedia] = useMutation(ADD_NEW_MEDIA);
  const [deleteImage] = useMutation(DELETE_IMAGE);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    setLoading(true);
    useAllMedia().then((media) => {
      dispatch(fetchMedia(media));
      setLoading(false);
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
          alert.error(`${imageFile[i].name} is more than 2MB`);
          break;
        }
        const isDuplicate = images.some(
          (image) => image.name === imageFile[i].name,
        );
        if (isDuplicate) {
          alert.error(`${imageFile[i].name} was Already Uploaded`);
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

        await addMedia({
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
      }
    }
  };

  useEffect(() => {
    uploadImages();
  }, [imageFile]);

  const deleteHandler = async (name: string, url: string, type: string) => {
    dispatch(deleteMediaGallery({ src: url, type }));
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
  };

  const fileName = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const text = fileName.current?.innerText;
    console.log('Media', text);
    if (text && fileName.current && text?.length > 20) {
      const value = text.substring(0, 20).concat('...');
      console.log(value);
      fileName.current.innerText = value;
    }
  }, [images]);

  return (
    <div className="container-fluid">
      {loading && <Loader />}
      <div className="row mb-60">
        <div className="col-6">
          <h1 className="heading-primary">Image Gallery ({images.length})</h1>
        </div>
        <div className="col-5">
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="col-1">
          <div className="product-images">
            <input
              type="file"
              id="product"
              accept="image/*, video/*"
              multiple
              style={{ display: 'none', height: '71px' }}
              onChange={(e) => imageUploadHandler(e)}
            />

            <label className="upload-image" htmlFor="product">
              <FaPlus className="mr-10" />
              Upload
            </label>
          </div>
        </div>
      </div>

      <div className="images-gallery" style={{ maxHeight: 'max-content' }}>
        {[...images]
          .reverse()
          .filter((image) => fuzzyMatch(image.name, search.toLowerCase()))
          .map((image, idx) => {
            let name: string;
            if (image.name?.length > 20)
              name = image.name.substring(0, 20).concat('...');
            else name = image.name;
            const searchRegex = new RegExp(search, 'gim');
            const matched = name.match(searchRegex);
            const imgURL = `${objectBaseUrl}/${image.src}`;
            return (
              <div key={image.name + idx} className="images-gallery__image">
                <button
                  onClick={() => deleteHandler(image.name, image.src, 'image')}
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
                        matched && matched.length > 0 ? matched[0] : ''
                      }</strong>`,
                    ) as string,
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Images;
