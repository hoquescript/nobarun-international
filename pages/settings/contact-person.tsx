import React from 'react';
import {
  FaEllipsisH,
  FaLocationArrow,
  FaMailBulk,
  FaPen,
  FaPlusCircle,
  FaTrash,
  FaUpload,
  FaUser,
  FaWhatsapp,
} from 'react-icons/fa';
import Textfield from '../../components/controls/textfield';
import Textarea from '../../components/controls/textarea';

const ContactPerson = () => {
  return (
    <div className="container center">
      <div className="flex sb">
        <h1 className="heading-primary mt-40 mb-40">Contact Person</h1>
        <div>
          <button type="button" className="btn-outline-green mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Contact
          </button>
        </div>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__content">
          <div className="grid three mb-0">
            <div className="field video" style={{ position: 'relative' }}>
              <label>Name</label>
              <FaUser
                className="video__icon"
                style={{ transform: 'translate(2rem, 1.7rem)' }}
              />
              <input
                type="text"
                className="custom-input video__input mt--30"
                placeholder="Name"
              />
            </div>
            <div className="field video" style={{ position: 'relative' }}>
              <label>Whats App</label>
              <FaWhatsapp
                className="video__icon"
                style={{ transform: 'translate(2rem, 1.7rem)' }}
              />
              <input
                type="text"
                className="custom-input video__input  mt--30"
                placeholder="Whatsapp Number"
              />
            </div>
            <div className="field video" style={{ position: 'relative' }}>
              <label>Upload</label>
              <FaUpload
                className="video__icon"
                style={{ transform: 'translate(2rem, 1.7rem)' }}
              />
              <input
                type="file"
                className="custom-input video__input mt--30"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="grid three mt-20">
            <div className="field video" style={{ position: 'relative' }}>
              <label>Whats App</label>
              <FaMailBulk
                className="video__icon"
                style={{ transform: 'translate(2rem, 1.7rem)' }}
              />
              <input
                type="text"
                className="custom-input video__input mt--30"
                placeholder="Whatsapp Number"
              />
            </div>
            <div className="field video" style={{ position: 'relative' }}>
              <label>Meta Description</label>
              <FaLocationArrow
                className="video__icon"
                style={{ transform: 'translate(2rem, 1.7rem)' }}
              />
              <textarea
                className="custom-input video__input mt--30"
                placeholder="Enter Meta Description"
              />
            </div>
            <div>
              <label htmlFor="publish" className="custom-switch">
                <input type="checkbox" id="publish" />
                <span>&nbsp;</span>
              </label>
              <span
                className="table__icon menu"
                style={{ marginLeft: '3rem', visibility: 'visible' }}
              >
                <FaEllipsisH />
                <div className="table__action_menu">
                  <button>
                    <FaTrash />
                  </button>
                  <button>
                    <FaPen />
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPerson;
