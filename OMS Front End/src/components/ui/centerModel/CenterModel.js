import React from "react";
import "./CenterModel.scss";
import { Modal } from "react-bootstrap";

const CenterModel = ({ isApprovalValidate, showModal, handleToggleModal, children, ...props }) => {
  return (
    <Modal
      className={`center-model-popup ${props.modelSizeClass}`}
      show={showModal}
      onHide={handleToggleModal}
      keyboard={!isApprovalValidate}
      backdrop={isApprovalValidate ? "static" : true}
    >
      <Modal.Header closeButton={!isApprovalValidate}>
        <div className="model-title">{props.modalTitle}</div>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CenterModel;
