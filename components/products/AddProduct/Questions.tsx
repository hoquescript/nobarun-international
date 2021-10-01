import React from 'react';
import { FaPlus, FaMinus, FaSave, FaEdit } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import TextEditor from '../../shared/TextEditor';

export interface IQuestions {
  id: string;
  title: string;
  question: string;
  isCollapsed?: boolean;
  isDisabled?: boolean;
}
interface QuestionsProps {
  question: [IQuestions[], React.Dispatch<React.SetStateAction<IQuestions[]>>];
}
const Questions = (props: QuestionsProps) => {
  const {
    question: [questions, setQuestions],
  } = props;
  console.log(questions);
  const onQuestionsChange = (
    idx: number,
    key: 'title' | 'question',
    value: string,
  ) => {
    const questionArr = [...questions];
    questionArr[idx][key] = value;
    setQuestions(questionArr);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: '',
        title: '',
        question: '',
        isCollapsed: false,
        isDisabled: false,
      },
    ]);
  };

  const saveEditQuestion = (idx) => {
    const questionArr = [...questions];
    questionArr[idx].isDisabled = !questionArr[idx].isDisabled;
    setQuestions(questionArr);
  };
  const deleteQuestion = (idx) => {
    if (questions.length > 1) {
      const questionArr = [...questions];
      questionArr.splice(idx, 1);
      setQuestions(questionArr);
    }
  };
  const collapseQuestion = (idx) => {
    const questionArr = [...questions];
    questionArr[idx].isCollapsed = !questionArr[idx].isCollapsed;
    setQuestions(questionArr);
  };

  // console.log(questions);

  return (
    <div className="wrapper-section">
      {questions.map((question, idx) => (
        <div className="form_accordion" key={idx}>
          <div className="form_accordion__title flex sb">
            <input
              className="custom-input large"
              disabled={question.isDisabled}
              placeholder="Question Title"
              value={question.title}
              onChange={(e) => onQuestionsChange(idx, 'title', e.target.value)}
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
                onClick={() => deleteQuestion(idx)}
              >
                <FaMinus />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={() => saveEditQuestion(idx)}
              >
                {question.isDisabled ? <FaEdit /> : <FaSave />}
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                style={{ transform: 'translateY(.7rem)' }}
                onClick={() => collapseQuestion(idx)}
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
              !question.isCollapsed ? 'active' : ''
            }`}
          >
            <TextEditor
              value={question.question}
              disabled={question.isDisabled}
              onChange={(content: string) => {
                // console.log(content);
                onQuestionsChange(idx, 'question', content);
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
