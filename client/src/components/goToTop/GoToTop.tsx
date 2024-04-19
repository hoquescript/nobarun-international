import IconButton from '@component/buttons/IconButton';
import Icon from '@component/icon/Icon';
import useWindowSize from '@hook/useWindowSize';
import React, { useEffect, useState } from 'react';

const GoToTop = ({ showBelow }) => {
  const [show, setShow] = useState(false);
  const width = useWindowSize();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > showBelow) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    if (showBelow) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleClick = () => {
    window['scrollTo']({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      {show && (
        <IconButton size="small" className="goto" onClick={handleClick}>
          <Icon size={width > 900 ? '4rem' : '3rem'}>up-arrow</Icon>
        </IconButton>
      )}
    </>
  );
};

export default GoToTop;
