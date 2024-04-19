import { deviceSize } from '@utils/constants';
import styled from 'styled-components';
import { getTheme } from '../../utils/utils';
import Card from '../Card';

export const StyledProductCard1 = styled(Card)`
  transition: height 1250ms ease-in-out;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 385px;
  max-width: 385px;
  &:hover {
    .details {
      height: 100%;
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }
  @media only screen and (max-width: 1600px) {
    width: 320px;
    .image-holder {
      img {
        height: 300px;
      }
    }
  }
  @media only screen and (max-width: 1400px) {
    width: 300px;
    .image-holder {
      img {
        height: 250px;
      }
    }
  }
  @media only screen and (max-width: 1300px) {
    width: 100%;
    .image-holder {
      img {
        height: 350px;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    .image-holder {
      img {
        height: 250px;
      }
    }
  }
  @media only screen and (max-width: 450px) {
    width: 100%;
    .image-holder {
      img {
        height: 200px;
      }
    }
  }

  .image-holder {
    position: relative;
    display: inline-block;
    text-align: center;
    img {
      /* height: 370px; */
      width: 100%;
      max-height: 385px;
      /* padding: 20px 10px; */
    }
    .extra-icons {
      display: none;
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      cursor: pointer;
      z-index: 2;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    h3.title {
      font-size: 18px;
      @media only screen and (max-width: 600px) {
        font-size: 16px;
      }
    }
    .icon-holder {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme('colors.text.hint')};
      }
    }
    .add-cart {
      display: none;
      flex-direction: column;
      align-items: center;
      margin-top: auto;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
      // .title {
      //   margin-top: 1rem;
      // }
    }
  }
`;

export const StyledProductCard12 = styled.div`
  margin-bottom: 2rem;
  & > h5 {
    background-image: ${getTheme('colors.default.gradient')};
    box-shadow: 0px 1px 3px rgb(3 0 71 / 9%);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: #fff;
    height: 54px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
