import Card from '@component/Card';
import React from 'react';
import CategoryMenuItem from '../category-menu-item/CategoryMenuItem';
import { StyledMegaMenu1 } from './MegaMenuStyle';

export interface MegaMenu2Props {
  data: {
    [key: string]: any;
  }[];
}

const MegaMenu2: React.FC<MegaMenu2Props> = ({ data }) => {
  return (
    <StyledMegaMenu1 className="mega-menu">
      <Card ml="1rem" py="0.5rem" boxShadow="regular">
        {data?.map((item) => (
          <CategoryMenuItem
            title={item.name}
            href={item.slug}
            icon={item.image}
            caret={item.children}
            key={item.id}
          >
            {/* {item.child && <MegaMenu3 minWidth="560px" data={item.menuData} />} */}
          </CategoryMenuItem>
        ))}
      </Card>
    </StyledMegaMenu1>
  );
};

export default MegaMenu2;
