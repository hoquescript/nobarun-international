import styled from 'styled-components';

export const StyledCarouselCard1 = styled.div`
  text-align: left;
  margin-left: 30rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1rem 0 0rem 0rem; */

  .title {
    font-size: 50px;
    margin-top: 0px;
    margin-bottom: 1.35rem;
    line-height: 1.2;
  }

  .image-holder {
    position: relative;
    /* height: 600px; */
    //   width: 50%;
    img {
      width: 100%;
      height: 58rem;
      @media only screen and (max-width: 1700px) {
        height: 52rem;
      }
      @media only screen and (max-width: 1400px) {
        height: 45rem;
      }
      @media only screen and (max-width: 1100px) {
        height: 40rem;
      }
      @media only screen and (max-width: 900px) {
        height: 100%;
      }
    }
  }

  @media only screen and (max-width: 900px) {
    margin-left: 0px;
    padding-left: 0px;

    .title {
      font-size: 32px;
    }
  }

  @media only screen and (max-width: 425px) {
    .title {
      font-size: 16px;
    }
    .title + * {
      font-size: 13px;
    }
    .button-link {
      padding: 0.66rem 0.95rem;
      font-size: 13px;
    }
  }
`;
