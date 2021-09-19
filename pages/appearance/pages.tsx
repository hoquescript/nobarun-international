import React from 'react';
import { FaSave, FaDownload, FaEye, FaRegTrashAlt } from 'react-icons/fa';
import TextEditor from '../../components/shared/TextEditor';

const Pages = () => {
  return (
    <div className="container center">
      <div className="main__content__header mb-40">
        <h2 className="page-title">Static Page</h2>
        <div>
          <button type="button" className="btn-icon-white ml-10">
            <FaEye />
          </button>
          <button type="button" className="btn-icon-white ml-10">
            <FaDownload />
          </button>
          <button type="button" className="btn-icon-white ml-10">
            <FaRegTrashAlt />
          </button>

          <label htmlFor="publish" className="custom-switch ml-20">
            <input type="checkbox" id="publish" />
            <span>Publish</span>
          </label>
        </div>
      </div>
      <input
        className="page-headline-input  mb-20"
        placeholder="Title of the Page"
        // value="Plastic Aluminum Solar Reflective Motorway Road Studs"
      />
      <TextEditor bodyClass="editor__body-large" />
    </div>
  );
};

export default Pages;
