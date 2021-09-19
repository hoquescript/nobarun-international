import React, { useState } from 'react';

const Menu = {
  Dashboard: {
    view: false,
    edit: false,
    delete: false,
  },
  Product: {
    view: false,
    edit: false,
    delete: false,
  },
  Blogs: {
    view: false,
    edit: false,
    delete: false,
  },
  Review: {
    view: false,
    edit: false,
    delete: false,
  },
  Appearance: {
    view: false,
    edit: false,
    delete: false,
  },
  Settings: {
    view: false,
    edit: false,
    delete: false,
  },
};
const AccountAccess = () => {
  const [permission, setPermission] = useState(Menu);

  const onSelectAllChange = (e) => {
    const allPermission = { ...permission };
    Object.keys(allPermission).forEach((key) => {
      const menu = permission[key];
      menu.view = e.target.checked;
      menu.edit = e.target.checked;
      menu.delete = e.target.checked;
    });
    setPermission(allPermission);
  };

  const onPermissionChange = (e, key) => {
    const { name, checked } = e.target;
    const menu = permission[key];
    if (name === 'checkAll') {
      menu.view = checked;
      menu.edit = checked;
      menu.delete = checked;
    } else {
      menu[name] = checked;
    }
    setPermission({ ...permission, [key]: menu });
  };

  console.log(permission);
  return (
    <div className="mt-50 mb-50">
      <table className="table center" style={{ maxWidth: '120rem' }}>
        <thead>
          <tr>
            <th className="center">Permission</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
            <th style={{ maxWidth: '7rem' }}>
              Select All
              <input
                className="ml-20"
                type="checkbox"
                name="selectAll"
                onChange={onSelectAllChange}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(permission).map((menu) => (
            <tr key={menu}>
              <td className="center">{menu}</td>
              <td>
                <input
                  type="checkbox"
                  name="view"
                  checked={permission[menu].view}
                  onChange={(e) => onPermissionChange(e, menu)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="edit"
                  checked={permission[menu].edit}
                  onChange={(e) => onPermissionChange(e, menu)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="delete"
                  checked={permission[menu].delete}
                  onChange={(e) => onPermissionChange(e, menu)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="checkAll"
                  checked={
                    permission[menu].view &&
                    permission[menu].edit &&
                    permission[menu].delete
                  }
                  onChange={(e) => onPermissionChange(e, menu)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountAccess;
