import Box from '@component/Box';
import IconButton from '@component/buttons/IconButton';
import Card from '@component/Card';
import Carousel from '@component/carousel/Carousel';
import Icon from '@component/icon/Icon';
import Image from '@component/Image';
import Modal from '@component/modal/Modal';
import ProductCard12 from '@component/product-cards/HeadlineCard';
import getYoutubeId from 'helpers/getYoutubeId';
import React, { useState } from 'react';

const CustomerMedia = ({ reviews }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  let medias = [];
  reviews.forEach((review) => {
    medias = medias
      .concat(review?.reviewMedia.images)
      .concat(review?.reviewMedia.videos);
  });
  if (medias.length <= 0) {
    return <></>;
  }

  console.log(medias.length);
  return (
    <ProductCard12 title="Customer Submitted  Photos & Videos">
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Card className="product__review_image">
          <IconButton
            className="product__review_image-close"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Icon>close</Icon>
          </IconButton>
          <Carousel
            totalSlides={+medias.length}
            visibleSlides={1}
            currentSlide={currentSlide}
            infinite={true}
            autoPlay={false}
            showDots={false}
            showArrow={true}
            spacing="0px"
          >
            {medias.map((media: string, idx) => {
              if (media.includes('youtube')) {
                const id = media && getYoutubeId(media);
                return (
                  <div className="product__review_modal-image" key={idx + id}>
                    <iframe
                      src={`https://www.youtube.com/embed/${id}`}
                      title="YouTube video player"
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
              } else {
                if (
                  ['mp4', 'mov', 'wmv', 'avi', 'mkv']?.includes(
                    media!?.split('.')?.pop()?.toLowerCase(),
                  )
                ) {
                  return (
                    <div className="product__review_modal-image">
                      <video
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + media}
                        controls={true}
                        autoPlay={true}
                        muted
                        style={{ width: '98%', height: '98%' }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );
                } else {
                  return (
                    <div className="product__review_modal-image" key={media}>
                      <img
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + media}
                        alt=""
                      />
                    </div>
                  );
                }
              }
            })}
          </Carousel>
        </Card>
      </Modal>
      <Box flexWrap="wrap" className="product__review_media">
        {medias.map((media: string, idx) => {
          if (media.includes('youtube')) {
            const id = media && getYoutubeId(media);
            const link = `https://img.youtube.com/vi/${id}/sddefault.jpg`;
            return (
              <Box
                key={idx + id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsOpen(true);
                  setCurrentSlide(idx);
                }}
              >
                <Image
                  key={link}
                  src={link}
                  alt={media}
                  height="100"
                  width="100"
                />
              </Box>
            );
          } else {
            if (
              ['mp4', 'mov', 'wmv', 'avi', 'mkv']?.includes(
                media!?.split('.')?.pop()?.toLowerCase(),
              )
            ) {
              return (
                <Box
                  key={media}
                  style={{ cursor: 'pointer', position: 'relative' }}
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentSlide(idx);
                  }}
                >
                  <Icon
                    size="3rem"
                    className="product__intro-video-icon"
                    style={{ color: 'rgba(255,10,10,0.8)' }}
                  >
                    play-solid
                  </Icon>

                  <video
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + media}
                    controls={false}
                    autoPlay={false}
                    muted
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '0.8rem',
                      border: '1px solid #ddd',
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </Box>
              );
            } else {
              return (
                <Box
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentSlide(idx);
                  }}
                >
                  <Image
                    key={media}
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + media}
                    alt="Review Media"
                    height="100"
                    width="100"
                  />
                </Box>
              );
            }
          }
        })}
      </Box>
    </ProductCard12>
  );
};

export default CustomerMedia;
