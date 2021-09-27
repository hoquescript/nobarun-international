import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import PostSection, { IPostSection } from '../../components/blogs/PostSection';
import { gql, useMutation } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import Checkbox from '../../components/controls/checkbox';
import Chip from '../../components/controls/chip';
import Chipfield from '../../components/controls/chipfield';
import Combobox from '../../components/controls/combobox';
import FileButton from '../../components/controls/file';
import Togglebar from '../../components/controls/togglebar';
import TextEditor from '../../components/shared/TextEditor';
import Toolbar from '../../components/shared/Toolbar';
import useBlogInfo from '../../hooks/Blogs/useBlogInfo';

import { useTypedSelector } from '../../hooks/useTypedSelector';

const ADD_NEW_BLOG = gql`
  mutation addNewBlog($data: CreateNewBlogInput!) {
    createNewBlog(data: $data) {
      id
    }
  }
`;

const AddNewPost = () => {
  const methods = useForm();
  const [tags, setTags] = useState<string[]>([]);
  const [addNewBlog] = useMutation(ADD_NEW_BLOG);
  const PostSectionState = useState<IPostSection[]>([
    {
      id: '',
      title: '',
      content: '',
      images: [],
    },
  ]);
  const [info, setInfo] = useState<{ [k: string]: any }>({});

  useEffect(() => {
    useBlogInfo().then((data) => {
      setInfo(data);
    });
  }, []);

  const blogImages = useTypedSelector((state) => state.ui.blogsImage);

  const postBlogHandler = (data) => {
    console.log({ ...data, sections: PostSectionState[0], tags });
    const post = {
      ...data,
      images: blogImages,
      sections: PostSectionState[0],
      tags,
    };
    addNewBlog({
      variables: {
        data: post,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Toolbar />
      <div className="container center">
        <div className="main__content__header mb-40">
          <h2 className="page-title">Post Editor</h2>
          <div>
            <Togglebar name="isPublished">Publish</Togglebar>
            <button type="button" className="btn-icon-white ml-20">
              <FaEye />
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
                    name="collectionName"
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

              <div className="grid two">
                <div className="mt-50 mb-20 flex">
                  <h4 className="heading-tertiary mr-20">Featured Post</h4>
                  <Checkbox name="isFeatured" />
                </div>
                <div className="product-images mt-50">
                  {blogImages.map((src) => (
                    <figure>
                      <button type="button" className="remove-image">
                        <i className="times-icon"></i>
                      </button>
                      <img src={src} alt="" />
                    </figure>
                  ))}
                  <FileButton />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="wrapper-section center">
            <div className="wrapper-section__title flex sb">
              <input
                className="custom-input large"
                placeholder="Title of the Post"
              />
              <div className="flex">
                <div className="product-images">
                  {blogImages.map((src) => (
                    <figure>
                      <button type="button" className="remove-image">
                        <i className="times-icon"></i>
                      </button>
                      <img src={src} alt="" />
                    </figure>
                  ))}
                  <FileButton />
                </div>
              </div>
            </div>

            <div className="wrapper-section__content">
              <div className="field mt-20">
                <TextEditor setValue={setSpecification} />
              </div>
            </div>
            <button type="button" className="btn-outline-green mt-20 mb-20">
              <FaPlusCircle className="btn-icon-small" />
              Add New Section
            </button>
          </div> */}
          <PostSection keyPointState={PostSectionState} />
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
