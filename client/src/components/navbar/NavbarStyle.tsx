import styled from 'styled-components';
import { getTheme } from '../../utils/utils';

const StyledNavbar = styled.div`
  position: relative;
  background: linear-gradient(to right, #1ca346, #6fba1a);
  box-shadow: ${getTheme('shadows.regular')};
  max-height: 42px;
  .nav-link {
    font-size: 18px;
    font-weight: 600;
    margin-right: 32px;
    cursor: pointer;
    color: #fff;
    :hover {
      color: #87e35e !important;
    }
  }
  .nav-link:last-child {
    margin-right: 0px;
  }

  .root-child {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 5;
  }
  .root:hover {
    .root-child {
      display: block;
    }
  }

  .child {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 5;
  }
  .parent:hover > .child {
    display: block;
  }

  .dropdown-icon {
    color: ${getTheme('colors.text.muted')};
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export default StyledNavbar;
