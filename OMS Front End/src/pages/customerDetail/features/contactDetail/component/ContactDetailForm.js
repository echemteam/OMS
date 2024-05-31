import React, { useRef, useState } from "react";
import AddEditContactsModal from "./AddEditContactsModal";
import { GridColumnType } from "../../../../../data/gridColumnType";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "./ContactDetailForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import { AppIcons } from "../../../../../data/appIcons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import AddEditEmailModal from "./AddEditEmailModal";
import CardSection from "../../../../../components/ui/card/CardSection";

const ContactDetailForm = ({ onSidebarClose }) => {
  const userFormRef = useRef();
  const molGridRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleToggleModalContact = () => {
    setShowContactModal(!showContactModal);
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
    <div>
      <div className="row horizontal-form mt-4">
        <FormCreator
          ref={userFormRef}
          {...contactDetailFormData}
          // onFormDataUpdate={handleFormDataChange}
        />
        <div className="col-md-12 mt-3">
          <div className="d-flex align-item-end justify-content-end">
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
                onClick={onSidebarClose}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <CardSection
          cardTitle="Email Address"
          buttonClassName="danger-btn"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          rightButton={true}
          buttonText="Add"
          titleButtonClick={handleToggleModal}
        >
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
      </div>
      <div className="mt-4">
        <CardSection
          cardTitle="Contact Number"
          buttonClassName="danger-btn"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          rightButton={true}
          buttonText="Add"
          titleButtonClick={handleToggleModalContact}
        >
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
      </div>
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
    </div>
  );
};

export default ContactDetailForm;
