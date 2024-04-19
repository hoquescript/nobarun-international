import React, { ButtonHTMLAttributes } from 'react';
import { SpaceProps } from 'styled-system';
import StyledIcon from './IconStyle';

export interface IconProps {
  size?: string;
  children: string;
  transform?: string;
  variant?: 'small' | 'medium' | 'large';
  color?: string;
  defaultcolor?: string;
}

const Icon: React.FC<
  IconProps & SpaceProps & ButtonHTMLAttributes<IconProps>
> = ({ children, ...props }: IconProps) => {
  return (
    <StyledIcon
      src={`/assets/images/icons/${children}.svg`}
      fallback={() => <span>{children?.trim()}</span>}
      {...props}
    />
  );
};

Icon.defaultProps = {
  variant: 'medium',
  defaultcolor: 'currentColor',
};

export default Icon;
