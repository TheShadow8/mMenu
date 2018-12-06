import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

function Modal(props) {
  let modal;

  props.show
    ? (modal = (
        <div className="modal-box">
          <div className="modal__content">
            <div className="modal__header mb-4">
              <h4> {props.title}</h4>
            </div>

            {props.children}

            <div className="modal__footer mt-3">
              {props.action && props.actionModal && (
                <button className="btn btn-white btn-small mr-2" onClick={props.actionModal}>
                  {props.action}
                </button>
              )}

              <button className="btn btn-dark btn-small" onClick={props.toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      ))
    : (modal = null);

  return <div>{modal}</div>;
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  action: PropTypes.string,
  actionModal: PropTypes.func,
};

export default Modal;
