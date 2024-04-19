import React, { useEffect, useRef, useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { StyledCategory } from './CategoryStyle';

export interface CategoriesProps {
  open?: boolean;
  children: React.ReactElement;
  menu?: any;
  isFixed?: boolean;
  height?: number;
  categories: any[];
}

const Categories: React.FC<CategoriesProps> = ({
  open: isOpen,
  menu,
  isFixed,
  children,
  height,
  categories,
}) => {
  const [open, setOpen] = useState(isOpen);
  const popoverRef = useRef(open);
  popoverRef.current = open;

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!isOpen) setOpen(!open);
  };
  /*
  const handleDocumentClick = () => {
    if (popoverRef.current && !isOpen) setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  */
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isFixed) {
          setOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <StyledCategory open={open}>
      {React.cloneElement(children, {
        open,
        className: `${children.props.className} cursor-pointer`,
        onClick: toggleMenu,
      })}
      <CategoryDropdown
        ref={ref}
        open={open}
        menu={menu}
        CONTAINER={height}
        categories={categories}
      />
    </StyledCategory>
  );
};

export default Categories;
