import React from 'react';

export const TabMenu = (props) => {
  const { children, menus, value, setTabValue } = props;
  return (
    <div className="custom-tabs mt-40 mb-20">
      <div className="custom-tabs__links">
        {menus.map((menu) => (
          <Tab
            key={menu}
            id={menu.toLowerCase()}
            value={value}
            changeHandler={() => {
              setTabValue(menu.toLowerCase());
            }}
          >
            {menu}
          </Tab>
        ))}
      </div>
      <div className="custom-tabs__content mt-30">{children}</div>
    </div>
  );
};

export const Tab = (props) => {
  const { children, id, value, changeHandler } = props;
  return (
    <a className={id === value ? 'active' : ''} onClick={changeHandler}>
      {children}
    </a>
  );
};

export const TabContent = (props) => {
  const { id, value, children } = props;
  return (
    <div id={id} style={{ display: id === value ? 'block' : 'none' }}>
      {children}
    </div>
  );
};
