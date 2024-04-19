import React from 'react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaGripVertical, FaSortDown } from 'react-icons/fa';
import Nestable from 'react-nestable';

import 'react-nestable/dist/styles/index.css';
import Textfield from '../controls/textfield';

const renderItem = (props, menus, setState, methods) => {
  const { item, index, collapseIcon, handler } = props;

  const itemId = item.id;
  const accordionHandler = () => {
    const menuList = [...menus];
    let menuItem;
    menuList.forEach((menu) => {
      if (menu.id === itemId) {
        menuItem = menu;
        return;
      } else {
        if (menu.children) {
          menuItem = menu.children.find(
            (childMenu) => childMenu.id === item.id,
          );
        } else return;
      }
    });
    menuItem.isOpen = !menuItem.isOpen;
    setState(menuList);
  };
  return (
    <div className="row mr-20">
      <div className="col-1" style={{ cursor: 'move', padding: '1.5rem 0' }}>
        <FaGripVertical />
      </div>
      <div className="col-11">
        <div className="menu-accordion">
          <div
            className="menu-accordion__title active"
            onClick={accordionHandler}
          >
            <h4>{item.label}</h4>
            <FaSortDown />
          </div>
          <div
            className={`menu-accordion__content ${item.isOpen ? 'active' : ''}`}
          >
            <FormProvider {...methods}>
              <Textfield
                name="url"
                label="URL"
                className="menu-accordion__input"
              />
              <Textfield
                name="label"
                label="Navigation Label"
                className="menu-accordion__input"
              />
              <div className="menu-accordion__btn_wrapper">
                <button>Remove</button>
                <div className="menu-accordion__btn_seperator" />
                <button>Cancel</button>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MenuDraggerProps {
  items: {
    id: any;
    label: string;
    url: string;
    isOpen: boolean;
    isHeader: boolean;
    isFooter: boolean;
    children?: {
      id: any;
      label: string;
      url: string;
      isOpen: boolean;
    }[];
  }[];
  setItems: any;
}
const MenuDragger = (props: MenuDraggerProps) => {
  const { items, setItems } = props;
  const methods = useForm();

  return (
    <Nestable
      items={items}
      threshold={10}
      renderItem={(props) => renderItem(props, items, setItems, methods)}
      onChange={(items) => {
        console.log(items);
      }}
    />
  );
};

export default MenuDragger;
