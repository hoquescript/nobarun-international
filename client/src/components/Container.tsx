import styled from 'styled-components';
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

const Container = styled.div<
  LayoutProps & ColorProps & PositionProps & SpaceProps & FlexboxProps
>`
  max-width: 160rem;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 107em) {
    max-width: 145rem;
  }
  @media only screen and (max-width: 1399px) {
    max-width: 120rem;
  }
  @media only screen and (max-width: 1299px) {
    max-width: 114rem;
  }
  @media only screen and (max-width: 1199px) {
    max-width: 100rem;
  }
  @media only screen and (max-width: 1045px) {
    max-width: 90rem;
  }
  @media only screen and (max-width: 945px) {
    max-width: 75rem;
  }
  @media only screen and (max-width: 76rem) {
    max-width: 100%;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  @media only screen and (max-width: 37.5em) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  ${color}
  ${position}
  ${flexbox}
  ${layout}
  ${space}
`;

export default Container;
