import React, { useEffect, useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { useForm, FormProvider } from 'react-hook-form';
import { FaEye, FaSave, FaTimes } from 'react-icons/fa';
import PostSection, { IPostSection } from '../../components/blogs/PostSection';
import { gql, useMutation } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useAlert } from 'react-alert';

import Checkbox from '../../components/controls/checkbox';
import Chip from '../../components/controls/chip';
import Combobox from '../../components/controls/combobox';
import FileButton from '../../components/controls/file';
import Togglebar from '../../components/controls/togglebar';
import Toolbar from '../../components/shared/Toolbar';
import useBlogInfo from '../../hooks/Blogs/useBlogInfo';

import {
  useTypedSelector,
  useTypedDispatch,
} from '../../hooks/useTypedSelector';
import {
  resetBlogMedia,
  selectBlogImage,
  selectBlogVideo,
  setBlogMedia,
} from '../../store/slices/blogs';
import useBlogById from '../../hooks/Blogs/useBlogById';
import { useRouter } from 'next/router';

const ADD_NEW_BLOG = gql`
  mutation addNewBlog($data: CreateNewBlogInput!) {
    createNewBlog(data: $data) {
      id
    }
  }
`;

const EDIT_BLOG = gql`
  mutation editBlog($data: EditBlog!) {
    editBlog(data: $data)
  }
`;

const defaultValues = {
  blogTitle: '',
  isPublished: false,
  category: '',
  relatedProduct: '',
  contactPerson: '',
  isFeatured: false,
};

const defaultPostSection = {
  [uuid()]: {
    id: '',
    title: '',
    content: '',
    images: [],
    videos: [],
  },
};

const AddNewPost = () => {
  const alert = useAlert();
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });
  const router = useRouter();
  const bid = router.query.bid;

  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState('');
  const [postSectionKey, setPostSectionKey] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const PostSectionState =
    useState<{ [k: string]: IPostSection }>(defaultPostSection);
  const [info, setInfo] = useState<{ [k: string]: any }>({});

  useEffect(() => {
    useBlogInfo().then((data) => {
      setInfo(data);
    });
  }, []);

  const [addBlog, createState] = useMutation(ADD_NEW_BLOG);
  const [editBlog, editState] = useMutation(EDIT_BLOG);

  const dispatch = useTypedDispatch();
  const blogMedia = useTypedSelector((state) => state.blogs.blogsMedia.main);
  const userId = useTypedSelector((state) => state.profile.userId);
  const blogPostSections = useTypedSelector(
    (state) => state.blogs.blogsMedia.postSection,
  );
  const postBlogHandler = (data) => {
    const sections = Object.keys(PostSectionState[0]).map((key) => {
      const section = PostSectionState[0][key];
      return {
        id: key,
        title: section.title,
        content: section.content,
        images: blogPostSections[key] && blogPostSections[key].images,
        videos: blogPostSections[key] && blogPostSections[key].videos,
      };
    });
    const post = {
      ...data,
      images: blogMedia.images,
      videos: blogMedia.videos,
      sections,
      tags,
      author: userId,
    };
    methods.reset(defaultValues);
    dispatch(resetBlogMedia());
    setTags([]);
    PostSectionState[1](defaultPostSection);

    if (isEditMode) {
      editBlog({
        variables: {
          data: {
            editId: bid,
            editableObject: post,
          },
        },
      });
      if (!editState.error) {
        alert.info('Edited Query Successfully');
      } else {
        alert.error(editState.error.message);
      }
    } else {
      addBlog({
        variables: {
          data: post,
        },
      });
      if (!createState.error) {
        alert.success('Posted Query Successfully');
      } else {
        alert.error(createState.error.message);
      }
    }
  };

  useEffect(() => {
    if (bid !== 'add-new-post') {
      setIsEditMode(true);
      useBlogById(bid).then((data) => {
        // console.log(data.postSection.contents);
        methods.reset(data.mainContent);
        setTags(data.tags);
        PostSectionState[1](data.postSection.contents);
        dispatch(
          setBlogMedia({
            main: data.main,
            postSection: data.postSection.media,
          }),
        );
      });
    }
  }, []);

  const selectImageHandler = (imageSrc) => {
    dispatch(selectBlogImage({ page, src: imageSrc, key: postSectionKey }));
  };
  const selectVideoHandler = (imageSrc) => {
    dispatch(selectBlogVideo({ page, src: imageSrc, key: postSectionKey }));
  };
  return (
    <FormProvider {...methods}>
      <Toolbar
        imageSelector={selectImageHandler}
        videoSelector={selectVideoHandler}
      />
      <div className="container center">
        <div className="main__content__header mb-40">
          <h2 className="page-title">Post Editor</h2>
          <div>
            <Togglebar name="isPublished">Publish</Togglebar>
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={methods.handleSubmit(postBlogHandler)}
            >
              <FaSave />
            </button>

            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={() => router.push('/blogs/blog-post')}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div id="description">
          <div className="wrapper-section">
            <div className="wrapper-section__title">
              <input
                className="page-headline-input mb-20"
                placeholder="Title of the Blog Post"
                {...methods.register('blogTitle')}
              />
            </div>
            <div className="wrapper-section__content">
              <div className="row mb-60">
                <div className="col-4">
                  <Combobox
                    name="category"
                    label="Category"
                    options={info.categories || []}
                  />
                </div>
                <div className="col-4">
                  <Combobox
                    name="relatedProduct"
                    label="Related Product Category"
                    options={info.relatedCategories || []}
                  />
                </div>
                <div className="col-4">
                  <Combobox
                    name="contactPerson"
                    label="Contact Person"
                    options={info.contacts || []}
                  />
                </div>
              </div>
              <div className="row" style={{ alignItems: 'baseline' }}>
                <div className="col-5">
                  <div className="mt-50 mb-20 flex">
                    <h4 className="heading-tertiary mr-20">Featured Post</h4>
                    <Checkbox name="isFeatured" />
                  </div>
                </div>
                <div className="col-7">
                  <FileButton page={'bMain'} showMedia setPage={setPage} />
                </div>
              </div>
            </div>
          </div>
          <PostSection
            keyPointState={PostSectionState}
            setPage={setPage}
            setPostSectionKey={setPostSectionKey}
          />
          {/* <RichEditor /> */}
          <div className="wrapper-section">
            <div className="wrapper-section__title flex sb">
              <h3 className="heading-secondary">Post Tags</h3>
            </div>
            <div className="wrapper-section__content">
              <div className="field mt-20">
                <Chip chips={tags} setChips={setTags} />
              </div>
            </div>
          </div>
          <div className="center mt-40 mb-30">
            <button
              className="btn-green"
              onClick={methods.handleSubmit(postBlogHandler)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default AddNewPost;
