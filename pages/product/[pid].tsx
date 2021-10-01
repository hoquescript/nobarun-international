import React, { useState, useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useAlert } from 'react-alert';
import { gql, useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FaSave, FaTimes } from 'react-icons/fa';
import Togglebar from '../../components/controls/togglebar';
import { v4 as uuid } from 'uuid';

import { IKeyPoints } from '../../components/products/AddProduct/KeyPoints';
import { IQuestions } from '../../components/products/AddProduct/Questions';
import Description from '../../components/products/tab/description';
import SEO from '../../components/products/tab/seo';
import { TabContent, TabMenu } from '../../components/shared/Tabmenu';
import Toolbar from '../../components/shared/Toolbar';
import useProductInfo from '../../hooks/Products/useProductInfo';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedSelector';
import {
  resetBlogMedia,
  selectProductImage,
  selectProductVideo,
  setProductMedia,
} from '../../store/slices/products';
import useProductById from '../../hooks/Products/useProductById';
import { useRouter } from 'next/router';

const CREATE_NEW_PRODUCTS = gql`
  mutation addProduct($data: CreateNewProduct!) {
    createNewProduct(data: $data) {
      id
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation editProduct($data: EditProductInput!) {
    updateProductById(data: $data)
  }
`;

const defaultValues = {
  isPublished: false,
  productName: '',
  price: '',
  originalPrice: '',
  discount: '',
  productCode: '',
  category: '',
  collectionName: '',
  stockStatus: '',
  contactPerson: '',
  SeoTitle: '',
  title: '',
  slug: '',
  url: '',
  siteMap: '',
};

const defaultKeypoints = {
  [uuid()]: {
    id: '',
    title: '',
    content: '',
    images: [] as string[],
    videos: [] as string[],
  },
};

const defaultQuestions = [
  {
    id: '',
    title: '',
    question: '',
    isCollapsed: false,
    isDisabled: false,
  },
];

const AddProduct = () => {
  const alert = useAlert();
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });
  const router = useRouter();
  const pid = router.query.pid;

  const [isEditMode, setIsEditMode] = useState(false);
  const [tabValue, setTabValue] = useState('description');
  const [info, setInfo] = useState({});

  const [createNewProduct, createState] = useMutation(CREATE_NEW_PRODUCTS);
  const [editProduct, editState] = useMutation(EDIT_PRODUCT);

  // Getting Category | Collection | Contact | Stock
  useEffect(() => {
    useProductInfo().then((data) => {
      setInfo(data);
    });
  }, []);

  const KeyPoint = useState<{ [k: string]: IKeyPoints }>(defaultKeypoints);
  const question = useState<IQuestions[]>(defaultQuestions);

  const [page, setPage] = useState('');
  const [postSectionKey, setPostSectionKey] = useState('');

  const [features, setFeatures] = useState('');
  const [specification, setSpecification] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const tagState = useState<string[]>([]);

  const dispatch = useTypedDispatch();
  const productMedia = useTypedSelector(
    (state) => state.products.productMedia.main,
  );
  const productKeypoints = useTypedSelector(
    (state) => state.products.productMedia.keyPoints,
  );

  const handleAddProduct = (data: any) => {
    const keyPoints = Object.keys(KeyPoint[0]).map((key) => {
      const keypoint = KeyPoint[0][key];
      return {
        id: key,
        title: keypoint.title,
        content: keypoint.content,
        images: productKeypoints[key] && productKeypoints[key].images,
        videos: productKeypoints[key] && productKeypoints[key].videos,
      };
    });

    const product = {
      ...data,
      price: +data.price,
      originalPrice: +data.price,
      discount: +data.discount,
      relatedProducts,
      images: productMedia.images,
      videos: productMedia.videos,
      keyPoints,
      features,
      specification,
      questions: question[0],
      tags: tagState[0],
      keywords,
    };

    //Form Reset
    methods.reset(defaultValues);
    KeyPoint[1](defaultKeypoints);
    question[1](defaultQuestions);
    setFeatures('');
    setSpecification('');
    setRelatedProducts([]);
    setKeywords([]);
    tagState[1]([]);
    dispatch(resetBlogMedia());

    if (isEditMode) {
      editProduct({
        variables: {
          data: {
            editId: pid,
            editableObject: product,
          },
        },
      });
      setTabValue('description');
      if (!editState.error) {
        alert.info('Edited Review Successfully');
      } else {
        alert.error(editState.error.message);
      }
    } else {
      createNewProduct({
        variables: {
          data: product,
        },
      });
      setTabValue('description');
      if (!createState.error) {
        alert.success('Posted Query Successfully');
      } else {
        alert.error(createState.error.message);
      }
    }
  };

  useEffect(() => {
    if (pid !== 'add-new-product') {
      setIsEditMode(true);
      useProductById(pid).then((data) => {
        methods.reset(data.mainContent);
        KeyPoint[1](data.keyPoints.contents);
        dispatch(
          setProductMedia({
            main: data.main,
            keypoint: data.keyPoints.media,
          }),
        );
        // console.log(data.questions);
        question[1](data.questions);
        setFeatures(data.features);
        setSpecification(data.specification);
        setRelatedProducts(data.relatedProducts);
        setKeywords(data.keywords);
        tagState[1](data.tags);
      });
    }
  }, []);

  const selectImageHandler = (imageSrc) => {
    dispatch(selectProductImage({ page, src: imageSrc, key: postSectionKey }));
  };
  const selectVideoHandler = (imageSrc) => {
    dispatch(selectProductVideo({ page, src: imageSrc, key: postSectionKey }));
  };
  return (
    <div className="container ml-50" style={{ maxWidth: '120rem' }}>
      <Toolbar
        imageSelector={selectImageHandler}
        videoSelector={selectVideoHandler}
      />
      <FormProvider {...methods}>
        <div>
          <div
            className="main__content__header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 className="page-title">Product Editor</h2>
            <div>
              <Togglebar name="isPublished">Publish</Togglebar>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={methods.handleSubmit(handleAddProduct)}
              >
                <FaSave />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={() => router.push('/product/products')}
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
              <Description
                register={methods.register}
                control={methods.control}
                setValue={methods.setValue}
                keyPointState={KeyPoint}
                question={question}
                tagState={tagState}
                features={features}
                setFeatures={setFeatures}
                specification={specification}
                setSpecification={setSpecification}
                setTabValue={setTabValue}
                info={info}
                relatedProducts={relatedProducts}
                setRelatedProducts={setRelatedProducts}
                setPage={setPage}
                setPostSectionKey={setPostSectionKey}
                // fileBtn={fileBtn}
                // setFileBtn={setFileBtn}
              />
            </TabContent>
            <TabContent id="seo" value={tabValue}>
              <SEO
                register={methods.register}
                control={methods.control}
                setValue={methods.setValue}
                chips={keywords}
                setChips={setKeywords}
                handleAddProduct={methods.handleSubmit(handleAddProduct)}
              />
            </TabContent>
          </TabMenu>
        </div>
      </FormProvider>
    </div>
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

export default AddProduct;
