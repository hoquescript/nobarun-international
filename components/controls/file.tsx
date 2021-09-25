import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useTypedDispatch } from '../../hooks/useTypedSelector';
import { showToolbar } from '../../store/slices/ui';

const FileButton = () => {
  const dispatch = useTypedDispatch();
  return (
    <div className="product-images">
      <button
        className="add-new-image"
        style={{ height: '71px', background: '#fff', cursor: 'pointer' }}
        onClick={() => {
          dispatch(showToolbar());
        }}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default FileButton;
