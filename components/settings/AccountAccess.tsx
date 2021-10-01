import React from 'react';
import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useAlert } from 'react-alert';

interface PermissionProps {
  (key: string): {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
}

interface AccountAccessProps {
  accountId: string;
  images: string;
  permission: PermissionProps;
  setPermission: React.Dispatch<React.SetStateAction<PermissionProps>>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: any;
  setIsPasswordMatched: any;
  isEditMode: boolean;
  setTabValue: any;
  defaultValues: any;
  menu: any;
  reset: any;
  setImages: any;
}

const CREATE_ACCOUNT = gql`
  mutation addAdmin($data: SignUpInput!) {
    addNewAdmin(data: $data) {
      displayName
    }
  }
`;

const EDIT_ADMIN = gql`
  mutation editAdmin($data: EditAdmin!) {
    editAdmin(data: $data)
  }
`;

const AccountAccess = (props: AccountAccessProps) => {
  const {
    images,
    permission,
    setPermission,
    register,
    handleSubmit,
    isEditMode,
    accountId,
    setTabValue,
    defaultValues,
    menu,
    reset,
    setImages,
  } = props;

  const alert = useAlert();
  const [createAccount, createState] = useMutation(CREATE_ACCOUNT);
  const [editAccount, editState] = useMutation(EDIT_ADMIN);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setTabValue('information');
      return;
    }
    const account = {
      displayName: data.displayName,
      address: data.address,
      location: '',
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      notes: data.notes,
      number: data.number,
      permission: permission,
      image: images,
      sendMail: data.sendMail,
    };

    // Resetting
    reset(defaultValues);
    setPermission(menu);
    setImages('');

    // Posting
    if (isEditMode) {
      delete account.password;
      editAccount({
        variables: {
          data: {
            editId: accountId,
            editableObject: account,
          },
        },
      });
      if (!editState.error) {
        alert.info('Edited Admin Account Successfully');
      } else {
        alert.error(editState.error.message);
      }
    } else {
      createAccount({
        variables: {
          data: account,
        },
      });
      if (!createState.error) {
        alert.success('Created a New Admin Account Successfully');
      } else {
        alert.error(createState.error.message);
      }
    }
  };
  const onError = (error) => {
    alert.error('Please Fillup all the Required Fields(*)');
  };
  const onSelectAllChange = (e) => {
    const allPermission = { ...permission };
    Object.keys(allPermission).forEach((key) => {
      const menu = permission[key];
      menu.view = e.target.checked;
      menu.edit = e.target.checked;
      menu.delete = e.target.checked;
    });
    // @ts-ignorehandleSubmit
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
    // @ts-ignore
    setPermission({ ...permission, [key]: menu });
  };

  return (
    <div className="mt-50 mb-50">
      <table className="table">
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
          {permission &&
            Object.keys(permission).map((menu) => (
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
      <div className="center mt-50">
        <div className="fields">
          <div className="field field__term">
            <label className="custom-checkbox mb-30" htmlFor="terms-conditions">
              <input
                type="checkbox"
                id="terms-conditions"
                {...register('sendMail')}
              />
              <div className="content">
                Send the new user an email about their account.
              </div>
            </label>
          </div>
        </div>
        <button className="btn-green" onClick={handleSubmit(onSubmit, onError)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountAccess;
