import React from "react";
import PropTypes from "prop-types";
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

CenterModel.propTypes = {
  isApprovalValidate: PropTypes.bool,
  showModal: PropTypes.bool.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modelSizeClass: PropTypes.string,
  modalTitle: PropTypes.string
};
export default CenterModel;
