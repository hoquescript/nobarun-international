import React, { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { FaEdit, FaMinus, FaPlus, FaPlusCircle, FaSave } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import TextEditor from '../../shared/TextEditor';
import FileButton from '../../controls/file';
import formatText from '../../../helpers/formatText';
import SunEditorCore from 'suneditor/src/lib/core';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../../hooks/useTypedSelector';
import { setKeypoints } from '../../../store/slices/products';

export interface IKeyPoints {
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
  const editor = useRef<SunEditorCore>();

  const dispatch = useTypedDispatch();
  const points = useTypedSelector((state) => state.products.productKeypoints);

  const onKeyPointsContentChange = (
    idx: string,
    key: 'title' | 'content',
    value: string,
  ) => {
    const newKPoints = { ...keyPoints };
    const newPoint = newKPoints[idx];
    if (key === 'title') {
      newPoint.title = value;
    }
    newKPoints[idx] = newPoint;
    setKeyPoints(newKPoints);
  };

  const addKeyPoints = () => {
    const modifiedKeyPoint = { ...keyPoints };
    Object.values(modifiedKeyPoint).forEach(
      //@ts-ignore
      (point) => (point.isCollapsed = true),
    );
    setKeyPoints({
      ...modifiedKeyPoint,
      [uuid()]: {
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
    console.log(keyPointsArr[idx].content);
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
          <div className="form_accordion__title flex sb">
            <input
              className="custom-input large"
              style={{ height: '5rem', width: '50rem' }}
              disabled={keyPoints[point].isDisabled}
              placeholder="Key Points of Product"
              value={keyPoints[point].title}
              onChange={(e) =>
                onKeyPointsContentChange(point, 'title', e.target.value)
              }
            />
            <div className="flex">
              <FileButton
                page="pKeypoint"
                setPage={setPage}
                showMedia
                postKey={point}
                setPostSectionKey={setPostSectionKey}
              />
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

          <div
            className={`form_accordion__content ${
              !keyPoints[point].isCollapsed ? 'active' : ''
            }`}
          >
            <TextEditor
              ref={editor}
              name={point}
              value={points[point]}
              multiple
              disabled={keyPoints[point].isDisabled}
              onChange={(content: string) => {
                dispatch(setKeypoints({ id: point, content }));
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyPoints;
