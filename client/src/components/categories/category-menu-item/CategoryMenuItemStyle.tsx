import styled from 'styled-components';
import { getTheme } from '../../../utils/utils';

export const StyledCategoryMenuItem = styled.div`
  .category-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    height: 4.5rem;
    min-width: 30rem;
    white-space: pre;
    transition: all 250ms ease-in-out;

    .title {
      padding-left: 1.5rem;
      flex-grow: 1;
      font-size: 1.6rem;
    }
  }

  :hover {
    & > .category-dropdown-link {
      color: ${getTheme('colors.primary.main')};
      background: ${getTheme('colors.primary.light')};
    }

    & > .mega-menu {
      display: block;
    }
  }
`;
