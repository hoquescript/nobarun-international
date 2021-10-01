import React from 'react';
import { v4 as uuid } from 'uuid';
import { FaEdit, FaMinus, FaPlus, FaPlusCircle, FaSave } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import TextEditor from '../../shared/TextEditor';
import FileButton from '../../controls/file';

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
  setPage: any;
  setPostSectionKey: any;
}

const KeyPoints = (props: KeyPointsProps) => {
  const {
    keyPointState: [keyPoints, setKeyPoints],
    setPage,
    setPostSectionKey,
  } = props;

  const onKeyPointsContentChange = (
    idx: string,
    key: 'title' | 'content',
    value: string,
  ) => {
    const points = { ...keyPoints };
    points[idx][key] = value;
    setKeyPoints(points);
  };

  const addKeyPoints = () => {
    setKeyPoints({
      ...keyPoints,
      [uuid()]: {
        id: '',
        title: '',
        content: '',
        images: [],
        videos: [],
        isCollapsed: false,
      },
    });
  };
  const saveEditKeyPoints = (idx) => {
    const keyPointsArr = { ...keyPoints };
    keyPointsArr[idx].isDisabled = !keyPointsArr[idx].isDisabled;
    setKeyPoints(keyPointsArr);
  };
  const deleteKeyPoints = (idx) => {
    if (Object.keys(keyPoints).length > 1) {
      const keyPointsArr = { ...keyPoints };
      delete keyPointsArr[idx];
      setKeyPoints(keyPointsArr);
    }
  };
  const collapseKeyPoints = (idx) => {
    const keyPointsArr = { ...keyPoints };
    keyPointsArr[idx].isCollapsed = !keyPointsArr[idx].isCollapsed;
    setKeyPoints(keyPointsArr);
  };

  return (
    <div className="wrapper-section">
      {Object.keys(keyPoints).map((point) => (
        <div className="form_accordion" key={point}>
          <div className="form_accordion__title flex">
            <input
              className="custom-input large"
              disabled={keyPoints[point].isDisabled}
              placeholder="Key Points of Product"
              value={keyPoints[point].title}
              onChange={(e) =>
                onKeyPointsContentChange(point, 'title', e.target.value)
              }
            />
            <div className="row ml-30">
              <div className="col-5">
                <FileButton
                  page="pKeypoint"
                  setPage={setPage}
                  showMedia
                  postKey={point}
                  setPostSectionKey={setPostSectionKey}
                />
              </div>
              <div className="col-6 flex">
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
                  onClick={() => deleteKeyPoints(point)}
                >
                  <FaMinus />
                </button>
                <button
                  type="button"
                  className="btn-icon-white ml-20"
                  onClick={() => saveEditKeyPoints(point)}
                >
                  {keyPoints[point].isDisabled ? <FaEdit /> : <FaSave />}
                </button>
                <button
                  type="button"
                  className="btn-icon-white ml-20"
                  onClick={() => collapseKeyPoints(point)}
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
          </div>

          <div
            className={`form_accordion__content ${
              !keyPoints[point].isCollapsed ? 'active' : ''
            }`}
          >
            <TextEditor
              value={keyPoints[point].content}
              multiple
              disabled={keyPoints[point].isDisabled}
              onChange={(content: string) =>
                onKeyPointsContentChange(point, 'content', content)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyPoints;
