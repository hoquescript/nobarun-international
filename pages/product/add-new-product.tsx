import React, { useState, useEffect, useMemo } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FaEye, FaSave } from 'react-icons/fa';
import Togglebar from '../../components/controls/togglebar';
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
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { resetMediaSelection } from '../../store/slices/ui';

const CREATE_NEW_PRODUCTS = gql`
  mutation addProduct($data: CreateNewProduct!) {
    createNewProduct(data: $data) {
      id
    }
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

const defaultKeypoints = [
  {
    id: '',
    title: '',
    content: '',
    images: [],
  },
];

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
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const [tabValue, setTabValue] = useState('description');
  const [info, setInfo] = useState({});

  const [createNewProduct] = useMutation(CREATE_NEW_PRODUCTS);
  useEffect(() => {
    useProductInfo().then((data) => {
      setInfo(data);
    });
  }, []);

  const productMedia = useTypedSelector((state) => state.ui.productMedia);

  const KeyPoint = useState<IKeyPoints[]>(defaultKeypoints);
  const question = useState<IQuestions[]>(defaultQuestions);

  const [features, setFeatures] = useState('');
  const [specification, setSpecification] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const tagState = useState<string[]>([]);

  const dispatch = useTypedDispatch();
  const handleAddProduct = (data: any) => {
    const product = {
      ...data,
      price: +data.price,
      originalPrice: +data.price,
      discount: +data.discount,
      relatedProducts,
      images: productMedia.images,
      videos: productMedia.videos,
      keyPoints: KeyPoint[0],
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
    dispatch(resetMediaSelection());
    console.log(KeyPoint[0]);
    // createNewProduct({
    //   variables: {
    //     data: product,
    //   },
    // });
  };
  return (
    <div className="container ml-50" style={{ maxWidth: '120rem' }}>
      <Toolbar />
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
              <button type="button" className="btn-icon-white ml-20">
                <FaEye />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={methods.handleSubmit(handleAddProduct)}
              >
                <FaSave />
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
                keyPointState={KeyPoint}
                question={question}
                tagState={tagState}
                setFeatures={setFeatures}
                setSpecification={setSpecification}
                setTabValue={setTabValue}
                info={info}
                relatedProducts={relatedProducts}
                setRelatedProducts={setRelatedProducts}
              />
            </TabContent>
            <TabContent id="seo" value={tabValue}>
              <SEO
                register={methods.register}
                control={methods.control}
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
