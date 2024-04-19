import IconButton from '@component/buttons/IconButton';
import Card from '@component/Card';
import Carousel from '@component/carousel/Carousel';
import Modal from '@component/modal/Modal';
import ShareButton from '@component/ShareButton/ShareButton';
import Spinner from '@component/Spinner';
import useWindowSize from '@hook/useWindowSize';
import getYoutubeId from 'helpers/getYoutubeId';
import React, { useEffect, useState } from 'react';
import Avatar from '../avatar/Avatar';
import Box from '../Box';
import FlexBox from '../FlexBox';
import Grid from '../grid/Grid';
import Icon from '../icon/Icon';
import Rating from '../rating/Rating';
import Typography, { H1, H4, Span } from '../Typography';

export interface ProductIntroProps {
  data?: any;
  imgUrl?: string[];
  title?: string;
  price?: number;
  id?: string | number;
}

const getHallmarkImage = (imageObj: any) => {
  const { name, src: image } = imageObj;
  const imagePath = image.slice(0, 16);
  const imageName = imagePath.replace('media/', '');
  const src = `${process.env.NEXT_PUBLIC_IMAGE_URL}media/hallmark-${imageName}.png`;
  return { name, src };
};

const ProductIntro: React.FC<ProductIntroProps> = ({ data }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState({ name: '', src: '' });
  const [isVideo, setIsVideo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const width = useWindowSize();
  const isPhone = width < 660;
  const isSmall = (width > 380 && width < 450) || (width > 230 && width < 330);

  useEffect(() => {
    if(data && data.featuredImage){
      setSelectedImage(getHallmarkImage(data?.featuredImage));
      setIsLoading(false);
    }
  }, [data?.images[0]]);

  const handleImageClick = (ind, type) => () => {
    if (type === 'image') {
      setSelectedImage(getHallmarkImage(ind));
      setIsVideo(false);
    }
    if (type === 'video') {
      setSelectedImage({ name: '', src: ind });
      setIsVideo(true);
      setModalOpen(true);
    }
  };

  const images = data ? (
    data?.images.map((url, ind) => (
      <Grid item xs={6} key={url + ind}>
        <Box
          size={isSmall ? 60 : 80}
          minWidth={isSmall ? 60 : 80}
          mb=".5rem"
          bg="white"
          borderRadius="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          border="1px solid"
          key={ind}
          borderColor={selectedImage === ind ? 'primary.main' : 'gray.400'}
          onClick={handleImageClick(url, 'image')}
        >
          <Avatar
            src={process.env.NEXT_PUBLIC_IMAGE_URL + url.src}
            borderRadius="10px"
            size={isSmall ? 50 : 65}
          />
        </Box>
      </Grid>
    ))
  ) : (
    <Grid item xs={6}>
      &nbsp;
    </Grid>
  );

  const videos = data ? (
    data?.videos?.map((url, ind) => (
      <Grid item xs={6} key={url + ind}>
        <Box
          key={ind}
          size={isSmall ? 60 : 80}
          minWidth={isSmall ? 60 : 80}
          mb=".5rem"
          bg="white"
          borderRadius="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          border="1px solid"
          borderColor={selectedImage === ind ? 'primary.main' : 'gray.400'}
          position="relative"
          onClick={handleImageClick(url, 'video')}
        >
          <Avatar
            src="/file-video-icon.png"
            borderRadius="10px"
            size={isSmall ? 50 : 65}
          />
        </Box>
      </Grid>
    ))
  ) : (
    <Grid item xs={6}>
      &nbsp;
    </Grid>
  );

  const banglaVersionHTML =
    data?.banglaVersionLink !== '' ? (
      <a
        href={data?.banglaVersionLink}
        className="product__hero-btn"
        target="_blank"
      >
        বাংলা ব্লগ পড়ুন
      </a>
    ) : (
      ''
    );
  const documentDownload = data?.document && (
    <a
      href={data?.document}
      className="product__intro-attachment"
      target="_blank"
    >
      <span>Document</span>
    </a>
  );
  return (
    <Card position="relative">
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsVideo(false);
          setSelectedImage(getHallmarkImage(data?.featuredImage));
        }}
      >
        <Card
          px="2rem"
          py="2rem"
          position="relative"
          className="product__intro-video-modal"
        >
          <IconButton
            className="product__review_image-close"
            onClick={() => {
              setModalOpen(false);
              setIsVideo(false);
              setSelectedImage(getHallmarkImage(data?.featuredImage));
            }}
          >
            <Icon>close</Icon>
          </IconButton>
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId(
              selectedImage.src,
            )}?autoplay=1`}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Card>
      </Modal>
      {data && data.stockStatus && <Box className="product__stock-status">{data.stockStatus}</Box>}
      <Box overflow="hidden" px="15px" py="5px">
        <H1 fontSize={width > 660 ? '32px' : '24px'}>{data?.productName}</H1>
        <FlexBox justifyContent="space-between" mb="1.1em">
          <Box width={isPhone ? '100%' : ''}>
            {!isPhone && (
              <Typography fontSize="18px" lineHeight="1" mb="0.7rem">
                Product Code: {data?.productCode}
              </Typography>
            )}
            <FlexBox
              flexDirection={width > 660 ? 'row' : 'column'}
              alignItems={width > 660 ? 'center' : 'flex-start'}
              flexWrap="nowrap"
            >
              {isPhone && (
                <FlexBox
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box>
                    <Typography fontSize="18px" lineHeight="1">
                      Product Code: {data?.productCode}
                    </Typography>
                    {data?.price ? (
                      <H4
                        mr={data?.price ? '1em' : '0'}
                        color="#EC1C24"
                        fontSize="20px"
                        fontWeight="600"
                      >
                        Price: {data?.price.toLocaleString('en-IN')} Taka
                        {data?.originalPrice > 0 &&
                          data?.originalPrice !== data?.price &&
                          data?.originalPrice > data?.price && (
                            <span
                              style={{
                                textDecoration: 'line-through',
                                margin: '0 .5rem',
                              }}
                            >
                              {data?.originalPrice.toLocaleString('en-IN')} Taka
                            </span>
                          )}
                      </H4>
                    ) : (
                      ''
                    )}
                  </Box>
                  {isPhone && banglaVersionHTML}
                </FlexBox>
              )}

              {!isPhone && data?.price ? (
                <H4
                  mr={data?.price ? '1em' : '0'}
                  color="#EC1C24"
                  fontSize="20px"
                  fontWeight="600"
                >
                  Price: {data?.price.toLocaleString('en-IN')} Taka
                  {data?.originalPrice > 0 && (
                    <span
                      style={{
                        textDecoration: 'line-through',
                        marginLeft: '.5rem',
                      }}
                    >
                      {data?.originalPrice.toLocaleString('en-IN')} Taka
                    </span>
                  )}
                </H4>
              ) : (
                ''
              )}
              {data?.review > 0 && (
                <FlexBox>
                  <Rating
                    outof={5}
                    value={data?.rating}
                    color="warn"
                    size="medium"
                    style={{ margin: '5px 0' }}
                  />
                  <a href="#reviews" style={{ marginTop: '0.25rem' }}>
                    <Span
                      ml="1rem"
                      color="#0082C9"
                      fontSize="16px"
                      fontWeight="600"
                    >
                      {data?.review} Real Customer Reviews
                    </Span>
                  </a>
                </FlexBox>
              )}
            </FlexBox>
          </Box>
          {!isPhone && banglaVersionHTML}
        </FlexBox>
        <FlexBox flexDirection={width > 900 ? 'row' : 'column'}>
          <FlexBox justifyContent="center" className="product__intro-main">
            {isLoading ? (
              <Spinner />
            ) : (
              !isVideo && (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.name}
                  loading="eager"
                  className="product__hero-image"
                  // objectFit="contain"
                />
              )
            )}
          </FlexBox>
          <Box className="product__hero-slider">
            {width > 900 ? (
              <Grid container>
                {videos}
                {images}
                <Grid item xs={12}>
                  {documentDownload}
                </Grid>
              </Grid>
            ) : (
              <div style={{ width: '100%' }}>
                <Carousel
                  autoPlay={false}
                  infinite
                  showArrow={false}
                  totalSlides={data?.images?.length + data?.videos?.length}
                  visibleSlides={width < 650 ? 5 : 6}
                >
                  {videos}
                  {images}
                  <Box
                    size={isSmall ? 60 : 80}
                    minWidth={isSmall ? 60 : 80}
                    mb=".5rem"
                    bg="white"
                    borderRadius="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    border="1px solid"
                    borderColor="gray.400"
                  >
                    <a href={data?.document} target="_blank">
                      <Avatar
                        src="/pdf.png"
                        borderRadius="10px"
                        size={isSmall ? 50 : 65}
                      />
                    </a>
                  </Box>
                </Carousel>
              </div>
            )}
          </Box>
        </FlexBox>
        <ShareButton
          title={data?.productName}
          description={data?.productName}
          featured={data?.featuredImage.src}
          hashtags={[]}
        />
      </Box>
    </Card>
  );
};

export default ProductIntro;
