import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-size: 14px;
    background: #f5f5f5;
    color: ${({ theme }: any) => theme.colors.body.text};
    transition: all 0.50s linear;
    font-family: 'Titillium Web', sans-serif;
    -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    line-height: 1.5;
    overflow-x: hidden;
  }


  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: ${({ theme }: any) => theme.colors.body.text};
  }
  ul,ol{
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  button{
    font-family: 'Titillium Web', sans-serif;
  }

  #nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #E94560;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 3px;
  border-radius: 0px 4px 4px 0px;
  overflow: hidden;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${({ theme }: any) =>
    theme.colors.primary.main}, 0 0 5px ${({ theme }: any) =>
  theme.colors.primary.main};
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #E94560;
  border-left-color: #E94560;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
