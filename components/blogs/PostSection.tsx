import React from 'react';
import { v4 as uuid } from 'uuid';
import { FaEdit, FaMinus, FaPlus, FaSave } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FileButton from '../controls/file';
import TextEditor from '../shared/TextEditor';

export interface IPostSection {
  id?: string;
  title: string;
  content: string;
  images?: string[];
  isCollapsed?: boolean;
  isDisabled?: boolean;
}

interface PostSectionProps {
  keyPointState: [{ [k: string]: IPostSection }, any];
  setPage: any;
  setPostSectionKey: any;
}

const PostSection = (props: PostSectionProps) => {
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
    console.log('Changing');
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

  console.log(keyPoints);

  return (
    <div className="wrapper-section">
      {Object.keys(keyPoints).map((key) => (
        <div className="form_accordion" key={key}>
          <div className="form_accordion__title flex">
            <input
              className="custom-input large mr-60"
              disabled={keyPoints[key].isDisabled}
              placeholder="Title of the Post"
              value={keyPoints[key].title}
              onChange={(e) =>
                onKeyPointsContentChange(key, 'title', e.target.value)
              }
            />
            <div className="row ml-60">
              <div className="col-6">
                <FileButton
                  page="bPostSection"
                  setPage={setPage}
                  showMedia
                  postKey={key}
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
                  onClick={() => deleteKeyPoints(key)}
                >
                  <FaMinus />
                </button>
                <button
                  type="button"
                  className="btn-icon-white ml-20"
                  onClick={() => saveEditKeyPoints(key)}
                >
                  {keyPoints[key].isDisabled ? <FaEdit /> : <FaSave />}
                </button>
                <button
                  type="button"
                  className="btn-icon-white ml-20"
                  onClick={() => collapseKeyPoints(key)}
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
              !keyPoints[key].isCollapsed ? 'active' : ''
            }`}
          >
            <TextEditor
              multiple
              value={keyPoints[key].content}
              disabled={keyPoints[key].isDisabled}
              onChange={(content: string) =>
                onKeyPointsContentChange(key, 'content', content)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSection;
