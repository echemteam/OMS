import React from "react";
import "./CenterModel.scss";
import { Modal } from "react-bootstrap";

const CenterModel = ({ showModal, handleToggleModal, children, ...props }) => {
  return (
    <Modal
      className={`center-model-popup ${props.modelSizeClass}`}
      show={showModal}
      onHide={handleToggleModal}
    >
      <Modal.Header closeButton>
        <div className="model-title">{props.modalTitle}</div>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CenterModel;
