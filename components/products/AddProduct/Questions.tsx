import React from 'react';
import { FaPlus, FaMinus, FaSave, FaEdit } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import { MdKeyboardArrowDown } from 'react-icons/md';
import TextEditor from '../../shared/TextEditor';

export interface IQuestions {
  title: string;
  question: string;
  isCollapsed?: boolean;
  isDisabled?: boolean;
}
interface QuestionsProps {
  question: [{ [k: string]: IQuestions }, any];
}
const Questions = (props: QuestionsProps) => {
  const {
    question: [questions, setQuestions],
  } = props;

  const onQuestionsChange = (
    idx: string,
    key: 'title' | 'question',
    value: string,
  ) => {
    const questionArr = { ...questions };
    if (questionArr[idx]) {
      questionArr[idx][key] = value;
    }
    setQuestions(questionArr);
  };

  const addQuestion = () => {
    const modifiedQuestions = { ...questions };
    Object.values(modifiedQuestions).forEach(
      //@ts-ignore
      (question) => (question.isCollapsed = true),
    );
    setQuestions({
      ...questions,
      [uuid()]: {
        title: '',
        question: '',
        isCollapsed: false,
        isDisabled: false,
      },
    });
  };

  // console.log('questions', questions);

  const saveEditQuestion = (idx) => {
    const questionArr = { ...questions };
    questionArr[idx].isDisabled = !questionArr[idx].isDisabled;
    setQuestions(questionArr);
  };

  const deleteQuestion = (idx) => {
    if (Object.keys(questions).length > 1) {
      const questionArr = { ...questions };
      delete questionArr[idx];

      setQuestions(questionArr);
    }
  };

  const collapseQuestion = (idx) => {
    const questionArr = { ...questions };
    questionArr[idx].isCollapsed = !questionArr[idx].isCollapsed;
    setQuestions(questionArr);
  };

  return (
    <div className="wrapper-section">
      {Object.keys(questions).map((key) => (
        <div className="form_accordion" key={key}>
          <div className="form_accordion__title flex sb">
            <input
              className="custom-input large"
              disabled={questions[key].isDisabled}
              placeholder="Question Title"
              value={questions[key].title}
              onChange={(e) => onQuestionsChange(key, 'title', e.target.value)}
            />
            <div>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={addQuestion}
              >
                <FaPlus />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={() => deleteQuestion(key)}
              >
                <FaMinus />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={() => saveEditQuestion(key)}
              >
                {questions[key].isDisabled ? <FaEdit /> : <FaSave />}
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                style={{ transform: 'translateY(.7rem)' }}
                onClick={() => collapseQuestion(key)}
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
              !questions[key].isCollapsed ? 'active' : ''
            }`}
          >
            <TextEditor
              value={questions[key].question}
              disabled={questions[key].isDisabled}
              onChange={(content: string) => {
                // console.log(content);
                onQuestionsChange(key, 'question', content);
                // console.log('I was clicked');
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
