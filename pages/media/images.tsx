import React, { useState, useEffect, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAlert } from 'react-alert';
import { FaPlus, FaTimes } from 'react-icons/fa';
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
  'https://eyeb3obcg1.execute-api.us-east-2.amazonaws.com/default/uploadAnyTypeMedia';
const objectBaseUrl = 'https://nobarun.s3.us-east-2.amazonaws.com';

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
    if (images.length === 0) {
      setLoading(true);
      useAllMedia().then((media) => {
        dispatch(fetchMedia(media));
        setLoading(false);
      });
    }
  }, [images]);

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
        console.log(imageFile[i]);
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

  useEffect(() => {
    uploadImages();
  }, [imageFile]);

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
          <h1 className="heading-primary">Image Gallery</h1>
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
                <button
                  onClick={() => deleteHandler(image.name, image.src, 'image')}
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
            );
          })}
      </div>
    </div>
  );
};

export default Images;
