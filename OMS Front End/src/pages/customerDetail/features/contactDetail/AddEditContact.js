import React, { useRef, useState } from "react";
import { GridColumnType } from "../../../../data/gridColumnType";
import FormCreator from "../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "./component/ContactDetailForm.data";
import Buttons from "../../../../components/ui/button/Buttons";
import { AppIcons } from "../../../../data/appIcons";
import MolGrid from "../../../../components/Grid/MolGrid";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import AddEditEmailModal from "./component/AddEditEmailModal";
import AddEditContactsModal from "./component/AddEditContactsModal";
import CardSection from "../../../../components/ui/card/CardSection";
import { useNavigate } from "react-router-dom";

const AddEditContact = () => {
  const userFormRef = useRef();
  const molGridRef = useRef();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleToggleModalContact = () => {
    setShowContactModal(!showContactModal);
  };
  const handleBackClick = (data) => {
    navigate(`/viewCustomer`);
  };

  const emailConfig = {
    columns: [
      {
        name: "Email Address",
        fieldName: "email",
        allowShort: true,
      },

      {
        name: "Action",
        colType: GridColumnType.ACTION,
        defaultAction: {
          allowEdit: true,
          allowDelete: true,
        },
      },
    ],
  };
  const contactConfig = {
    columns: [
      {
        name: "Contact Numbers",
        fieldName: "contactNo",
        allowShort: true,
      },

      {
        name: "Action",
        colType: GridColumnType.ACTION,
        defaultAction: {
          allowEdit: true,
          allowDelete: true,
        },
      },
    ],
  };

  const emailData = [
    {
      email: "admin@gmail.com",
    },
    {
      email: "demo@gmail.com",
    },
  ];
  const contactData = [
    {
      contactNo: "+91 9526335445",
    },
    {
      contactNo: "+001 2026335445",
    },
  ];

  const actionHandler = {
    EDIT: handleToggleModal,
  };
  const contactActionHandler = {
    EDIT: handleToggleModalContact,
  };
  return (
    <>
      <CardSection
        cardTitle="Contact Information"
        rightButton={true}
        buttonClassName="dark-btn"
        buttonText="Back"
        textWithIcon={true}
        iconImg={AppIcons.BackArrowIcon}
        titleButtonClick={handleBackClick}
      >
        <div className="row horizontal-form">
          <FormCreator
            config={contactDetailFormData}
            ref={userFormRef}
            {...contactDetailFormData}
          // onFormDataUpdate={handleFormDataChange}
          />
          <div className="col-md-12 mt-3">
            <div className="d-flex align-item-end justify-content-between">
              <div className="d-flex align-item-center">
                <Buttons
                  buttonTypeClassName="info-btn mr-5"
                  buttonText="Add"
                  onClick={handleToggleModal}
                  textWithIcon={true}
                  imagePath={AppIcons.PlusIcon}
                // isLoading={EmailLoading || updateUserLoading}
                />
                <Buttons
                  buttonTypeClassName="danger-btn"
                  buttonText="Add"
                  onClick={handleToggleModalContact}
                  textWithIcon={true}
                  imagePath={AppIcons.PlusIcon}
                // isLoading={EmailLoading || updateUserLoading}
                />
              </div>
              <div className="d-flex align-item-end">
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Save"
                // onClick={onHandleUser}
                // isLoading={EmailLoading || updateUserLoading}
                />
                <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                  onClick={handleBackClick}
                />
              </div>
            </div>
          </div>
        </div>
      </CardSection>
      <CardSection cardTitle="Email Address">
        <div className="row">
          <div className="col-md-12 table-striped role-table-sec">
            <MolGrid
              ref={molGridRef}
              configuration={emailConfig}
              dataSource={emailData}
              allowPagination={true}
              pagination={{
                totalCount: 0,
              }}
              onActionChange={actionHandler}
            // onPageChange={handlePageChange}
            />
          </div>
        </div>
      </CardSection>
      <CardSection cardTitle="Contact Number">
        <div className="row">
          <div className="col-md-12 table-striped role-table-sec">
            <MolGrid
              ref={molGridRef}
              configuration={contactConfig}
              dataSource={contactData}
              allowPagination={true}
              pagination={{
                totalCount: 0,
              }}
              onActionChange={contactActionHandler}
            // onPageChange={handlePageChange}
            />
          </div>
        </div>
      </CardSection>
      {showModal && (
        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          modalTitle="Add/Edit Email Address"
          modelSizeClass="w-40"
        >
          <AddEditEmailModal handleToggleModal={handleToggleModal} />
        </CenterModel>
      )}
      {showContactModal && (
        <CenterModel
          showModal={showContactModal}
          handleToggleModal={handleToggleModalContact}
          modalTitle="Add/Edit Contact Number"
          modelSizeClass="w-40"
        >
          <AddEditContactsModal handleToggleModal={handleToggleModalContact} />
        </CenterModel>
      )}
    </>
  );
};

export default AddEditContact;
