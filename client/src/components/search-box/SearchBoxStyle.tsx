import styled from 'styled-components';
import { getTheme } from '../../utils/utils';

const StyledSearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    max-width: 80%;
    margin: auto;
  }
  @media only screen and (max-width: 1200px) {
    max-width: 100%;
    margin: 0;
  }
  .search-icon {
    position: absolute;
    color: ${getTheme('colors.text.hint')};
    left: 1rem;
    z-index: 1;
  }

  .search-field {
    flex: 1 1 0;
    padding-left: 3rem;
    padding-right: 11.5rem;
    height: 44px;
    background-color: #fff !important;
    border: 1px solid #ddd;
    font-size: 1.8rem;
  }

  .search-btn {
    background-color: #0082c9 !important;
    color: #fff !important;
    position: absolute;
    right: 0;
  }

  .search-button {
    position: absolute;
    height: 100%;
    right: 0px;
    padding-left: 55px;
    padding-right: 55px;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }

  .category-dropdown {
    position: absolute;
    right: 0px;
    color: ${getTheme('colors.text.hint')};
  }
  .dropdown-handler {
    height: 40px;
    cursor: pointer;
    min-width: 90px;
    padding-left: 1.25rem;
    padding-right: 1rem;
    border-left: 1px solid ${getTheme('colors.text.disabled')};
    span {
      margin-right: 0.75rem;
    }
  }
  .menu-button {
    display: none;
  }
  @media only screen and (max-width: 900px) {
    .category-dropdown {
      display: none;
    }
    .search-icon {
      left: 1rem;
    }
    .search-field {
      height: 40px;
      padding-left: 2.75rem;
      padding-right: 3.5rem;
    }
    .search-button {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }
    .menu-button {
      display: unset;
    }
  }
`;

export default StyledSearchBox;
