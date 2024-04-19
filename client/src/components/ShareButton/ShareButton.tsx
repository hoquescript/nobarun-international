import Box from '@component/Box';
import Button from '@component/buttons/Button';
import IconButton from '@component/buttons/IconButton';
import Card from '@component/Card';
import Carousel from '@component/carousel/Carousel';
import FlexBox from '@component/FlexBox';
import Icon from '@component/icon/Icon';
import Modal from '@component/modal/Modal';
import Typography, { H3 } from '@component/Typography';
import useWindowSize from '@hook/useWindowSize';
import React, { useEffect, useRef, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

interface ShareButtonProps {
  title: string;
  description: string;
  featured: string;
  hashtags: string[];
}
const ShareButton = (props: ShareButtonProps) => {
  const { title, description, featured, hashtags } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const width = useWindowSize();

  useEffect(() => {
    setUrl(window.location.href);
  });

  const clipboardHandler = () => {
    const copyText = inputRef?.current;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    setIsCopied(true);
  };

  return (
    <>
      <button className="share" onClick={() => setModalOpen(true)}>
        <Icon size="1.78rem" mr="1rem">
          share-solid
        </Icon>
        <Typography fontSize="20px" fontWeight="400">
          Share
        </Typography>
      </button>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsCopied(false);
        }}
      >
        <Card px="2rem" py="2rem" position="relative" className="share__modal">
          <IconButton
            className="product__review_image-close"
            onClick={() => {
              setModalOpen(false);
              setIsCopied(false);
            }}
          >
            <Icon>close</Icon>
          </IconButton>
          <H3 fontFamily="inherit">Share</H3>
          <Box py="2rem" mt="1rem" px="1rem">
            <Carousel
              totalSlides={9}
              visibleSlides={width < 500 ? 4 : 5}
              arrowButtonClass="collection-arrow"
            >
              <FacebookShareButton
                url={url}
                quote={description}
                hashtag={`#${hashtags && hashtags[0]}`}
              >
                <FacebookIcon />
              </FacebookShareButton>
              <FacebookMessengerShareButton appId="4408949989215502" url={url}>
                <FacebookMessengerIcon />
              </FacebookMessengerShareButton>
              <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon />
              </WhatsappShareButton>
              <ViberShareButton url={url} title={title}>
                <ViberIcon />
              </ViberShareButton>
              <TelegramShareButton url={url} title={title}>
                <TelegramIcon />
              </TelegramShareButton>
              <LineShareButton url={url} title={title}>
                <LineIcon />
              </LineShareButton>
              <TwitterShareButton url={url} title={title} hashtags={hashtags}>
                <TwitterIcon />
              </TwitterShareButton>
              <PinterestShareButton
                media={featured}
                description={description}
                url={url}
              >
                <PinterestIcon />
              </PinterestShareButton>
              <EmailShareButton url={url} subject={title} body={description}>
                <EmailIcon />
              </EmailShareButton>
            </Carousel>
          </Box>
          <FlexBox onClick={clipboardHandler}>
            <input
              ref={inputRef}
              disabled
              defaultValue={url}
              className="share__clipboard"
            />
            <Button color="error">{isCopied ? 'Copied' : 'Copy'}</Button>
          </FlexBox>
        </Card>
      </Modal>
    </>
  );
};

export default ShareButton;
