import styled from "styled-components";
import {
  border,
  BorderProps,
  layout,
  LayoutProps,
  space,
  SpaceProps
} from "styled-system";

const Image = styled.img<SpaceProps & BorderProps & LayoutProps>`
  ${space}
  ${border}
  ${layout}
  max-height: 150px;
  max-width: 200px
`;

Image.defaultProps = {
  display: "block",
};

export default Image;
