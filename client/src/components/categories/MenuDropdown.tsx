import useAllProductCategories from '@hook/Home/useAllProductCategories';
import React from 'react';
import CategoryMenuItem from './category-menu-item/CategoryMenuItem';
import { StyledCategoryDropdown } from './CategoryDropdownStyle';
import MegaMenu from './mega-menu/MegaMenu2';

export interface CategoryDropdownProps {
  open: boolean;
  position?: 'absolute' | 'relative';
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  open,
  position,
}) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    useAllProductCategories().then((data) => {
      return setCategories(data);
    });
  }, []);

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {categories.length > 0 &&
        categories.map((item) => {
          return (
            <CategoryMenuItem
              title={item.name}
              href={`/product/search/bikes`}
              icon={item.image}
              caret={item.children}
              key={item.id}
            >
              <MegaMenu data={item.children || {}} />
            </CategoryMenuItem>
          );
        })}
    </StyledCategoryDropdown>
  );
};

CategoryDropdown.defaultProps = {
  position: 'absolute',
};

export default CategoryDropdown;
