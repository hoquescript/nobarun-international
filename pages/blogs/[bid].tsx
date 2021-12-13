import React, { useEffect, useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { useForm, FormProvider } from 'react-hook-form';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';
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
import SeoTab from '../../components/blogs/SeoTab';

import {
  useTypedSelector,
  useTypedDispatch,
} from '../../hooks/useTypedSelector';
import {
  resetBlogMedia,
  selectBlogImage,
  selectBlogVideo,
  setAllKeypoints,
  setBlogMedia,
} from '../../store/slices/blogs';
import useBlogById from '../../hooks/Blogs/useBlogById';
import { useRouter } from 'next/router';
import { TabMenu, TabContent } from '../../components/shared/Tabmenu';
import SlugGenerator from '../../components/blogs/SlugGenerator';

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
  slug: '',
  title: '',
  SeoTitle: '',
  url: '',
  siteMap: '',
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

  const [tabValue, setTabValue] = useState('description');
  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState('');
  const [postSectionKey, setPostSectionKey] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [info, setInfo] = useState<{ [k: string]: any }>({});
  const PostSectionState =
    useState<{ [k: string]: IPostSection }>(defaultPostSection);

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
  const points = useTypedSelector((state) => state.blogs.postSection);

  const formReset = () => {
    // Resetting
    setTabValue('description');
    methods.reset(defaultValues);
    dispatch(resetBlogMedia());
    setTags([]);
    setKeywords([]);
    PostSectionState[1](defaultPostSection);
  };
  const handlePostBlog = (data) => {
    if (!blogMedia.featured) {
      alert.error('Please set a Featured Blog Image');
      return;
    }

    const sections = Object.keys(PostSectionState[0]).map((key) => {
      const section = PostSectionState[0][key];
      return {
        id: key,
        title: section.title,
        content: points[key],
        images: blogPostSections[key] && blogPostSections[key].images,
        videos: blogPostSections[key] && blogPostSections[key].videos,
      };
    });
    const post = {
      ...data,
      keywords,
      featured: blogMedia.featured,
      images: blogMedia.images,
      videos: blogMedia.videos,
      sections,
      tags,
      author: userId,
    };

    if (data.stockStatus === '') delete post.stockStatus;
    if (data.contactPerson === '') delete post.contactPerson;

    if (isEditMode) {
      try {
        editBlog({
          variables: {
            data: {
              editId: bid,
              editableObject: post,
            },
          },
        });
        if (!editState.error) {
          alert.info('Edited Blog Post Successfully');
          setTabValue('description');
        } else {
          alert.error(editState.error.message);
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.info('Edited Blog Post Successfully');
          setTabValue('description');
        }
      }
    } else {
      try {
        addBlog({
          variables: {
            data: post,
          },
        });
        if (!createState.error) {
          alert.success('Created Blog Post Successfully');
          formReset();
        } else {
          throw createState.error.message;
        }
      } catch (error: any) {
        if (error.message) {
          alert.error(error.message);
        } else {
          alert.success('Created Blog Post Successfully');
          formReset();
        }
      }
    }
  };

  const handleError = (error) => {
    Object.values(error).forEach((err) => {
      // @ts-ignore
      alert.error(err.message);
    });
  };

  useEffect(() => {
    if (bid !== 'add-new-post') {
      setIsEditMode(true);
      useBlogById(bid).then((data) => {
        // console.log(data.postSection.contents);
        methods.reset(data.mainContent);
        setTags(data.tags);
        setKeywords(data.keywords);
        dispatch(setAllKeypoints(data.postSection.points));
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
      <div className="container">
        <div className="main__content__header mb-40">
          <h2 className="page-title">Post Editor</h2>
          <div>
            <Togglebar name="isPublished">Publish</Togglebar>
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={methods.handleSubmit(handlePostBlog, handleError)}
            >
              <FaSave />
            </button>
            <button
              type="button"
              className="btn-icon-white ml-20"
              onClick={() => {
                formReset();
                router.push('/blogs/add-new-post');
              }}
            >
              <FaPlus />
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
        <TabMenu
          menus={['Description', 'SEO']}
          value={tabValue}
          setTabValue={setTabValue}
        >
          <TabContent id="description" value={tabValue}>
            <div id="description">
              <div className="wrapper-section">
                <div className="wrapper-section__content">
                  <div className="row">
                    <SlugGenerator
                      // @ts-ignore
                      control={methods.control}
                      setValue={methods.setValue}
                    />
                  </div>
                  <div className="row mb-20">
                    <div className="col-4">
                      <Combobox
                        required
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
                      <div className="mb-20 flex">
                        <h4 className="heading-tertiary mr-20">
                          Featured Post
                        </h4>
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
                  onClick={methods.handleSubmit(handlePostBlog, handleError)}
                >
                  Post
                </button>
              </div>
            </div>
          </TabContent>
          <TabContent id="seo" value={tabValue}>
            <SeoTab
              register={methods.register}
              control={methods.control}
              setValue={methods.setValue}
              chips={keywords}
              setChips={setKeywords}
              handleAddProduct={methods.handleSubmit(
                handlePostBlog,
                handleError,
              )}
            />
          </TabContent>
        </TabMenu>
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
