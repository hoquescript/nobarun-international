import React from 'react';
import { FaEdit, FaMinus, FaPlus, FaPlusCircle, FaSave } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import TextEditor from '../../shared/TextEditor';

export interface IKeyPoints {
  id: string;
  title: string;
  content: string;
  images: string[];
  isCollapsed?: boolean;
  isDisabled?: boolean;
}

interface KeyPointsProps {
  keyPointState: [
    IKeyPoints[],
    React.Dispatch<React.SetStateAction<IKeyPoints[]>>,
  ];
}

const KeyPoints = (props: KeyPointsProps) => {
  const {
    keyPointState: [keyPoints, setKeyPoints],
  } = props;

  const onKeyPointsContentChange = (
    idx: number,
    key: 'title' | 'content',
    value: string,
  ) => {
    const points = [...keyPoints];
    points[idx][key] = value;
    setKeyPoints(points);
  };

  const addKeyPoints = () => {
    setKeyPoints([
      ...keyPoints,
      {
        id: '',
        title: '',
        content: '',
        images: [],
        isCollapsed: false,
      },
    ]);
  };
  const saveEditKeyPoints = (idx) => {
    const keyPointsArr = [...keyPoints];
    keyPointsArr[idx].isDisabled = !keyPointsArr[idx].isDisabled;
    setKeyPoints(keyPointsArr);
  };
  const deleteKeyPoints = (idx) => {
    if (keyPoints.length > 1) {
      const keyPointsArr = [...keyPoints];
      keyPointsArr.splice(idx, 1);
      setKeyPoints(keyPointsArr);
    }
  };
  const collapseKeyPoints = (idx) => {
    const keyPointsArr = [...keyPoints];
    keyPointsArr[idx].isCollapsed = !keyPointsArr[idx].isCollapsed;
    setKeyPoints(keyPointsArr);
  };

  return (
    <div className="wrapper-section">
      {keyPoints.map((point, idx) => (
        <div className="form_accordion" key={idx}>
          <div className="form_accordion__title flex sb">
            <input
              className="custom-input large"
              disabled={point.isDisabled}
              placeholder="Key Points of Product"
              onChange={(e) =>
                onKeyPointsContentChange(idx, 'title', e.target.value)
              }
            />
            <div className="flex">
              <div className="product-images">
                <input
                  type="file"
                  id="product"
                  accept="image/*, video/*"
                  style={{ display: 'none', height: '71px' }}
                  // onChange={(e) => imageUploadHandler(e)}
                />
                <label
                  className="add-new-image"
                  htmlFor="product"
                  style={{ height: '71px' }}
                >
                  <FaPlus />
                </label>
              </div>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={addKeyPoints}
              >
                <FaPlus />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={() => deleteKeyPoints(idx)}
              >
                <FaMinus />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={() => saveEditKeyPoints(idx)}
              >
                {point.isDisabled ? <FaEdit /> : <FaSave />}
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={() => collapseKeyPoints(idx)}
              >
                <MdKeyboardArrowDown
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </button>
            </div>
          </div>
          <div
            className={`form_accordion__content ${
              !point.isCollapsed ? 'active' : ''
            }`}
          >
            <TextEditor
              multiple
              disabled={point.isDisabled}
              onChange={(content: string) =>
                onKeyPointsContentChange(idx, 'content', content)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyPoints;
