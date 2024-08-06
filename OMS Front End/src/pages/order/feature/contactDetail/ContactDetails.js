import React, { useContext, useEffect, useRef, useState } from "react";
import { contactInformationData } from "./config/ContactDetail.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import { useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery } from '../../../../app/services/commonAPI';
import { ContactType } from "../../../../utils/Enums/commonEnums";
import { getFieldData, setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import AddEditContact from "../../../../common/features/component/Contact/feature/AddEditContact";
import { useAddEditContactMutation, useLazyGetAllContactTypesQuery, useLazyGetCustomerContactByContactIdQuery } from "../../../../app/services/contactAPI";
import { contactDetailFormData } from "../../../../common/features/component/Contact/config/ContactDetailForm.data";
import { modifyContactType } from "../../../../utils/TransformData/TransformAPIData";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";


const ContactDetails = (props) => {
  const basicInformation = useRef();
  const [formData, setFormData] = useState(contactInformationData);
  // const [isSidebarModal, setIsSidebarModal] = useState(null)
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [getContectTypeId, setContactTypeId] = useState(null)

  const { orderCustomerId } = useContext(AddOrderContext);

  const [
    getAllContactTypes,
    { isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData },
  ] = useLazyGetAllContactTypesQuery();

  const [getAllEndUserId, { isFetching: isGetAllEndUserFetching, isSuccess: isgetAllEndUserSuccess, data: isgetAllEndUserData }] = useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery();
  const [getAllInvoiceSubmissionId, { isFetching: isGetAllInvoiceSubmissionFetching, isSuccess: isgetAllInvoiceSubmissionSuccess, data: isgetAllInvoiceSubmissionData }] = useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery();
  const [getAllPurchasingId, { isFetching: isGetAllPurchasingFetching, isSuccess: isgetAllPurchasingSuccess, data: isgetAllPurchasingData }] = useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery();

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.EndUser
      }
      getAllEndUserId(req)
    }
  }, [orderCustomerId])

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.InvoiceSubmission
      }
      getAllInvoiceSubmissionId(req)
    }
  }, [orderCustomerId])

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.Purchasing
      }
      getAllPurchasingId(req)
    }
  }, [orderCustomerId])

  useEffect(() => {
    if (!isGetAllEndUserFetching && isgetAllEndUserSuccess && isgetAllEndUserData) {
      setDropDownOptionField(isgetAllEndUserData, 'contactId', 'fullName', contactInformationData, 'endUserId');
    }
  }, [isGetAllEndUserFetching, isgetAllEndUserSuccess, isgetAllEndUserData])
  useEffect(() => {
    if (!isGetAllInvoiceSubmissionFetching && isgetAllInvoiceSubmissionSuccess && isgetAllInvoiceSubmissionData) {
      setDropDownOptionField(isgetAllInvoiceSubmissionData, 'contactId', 'fullName', contactInformationData, 'invoiceSubmissionId');
    }
  }, [isGetAllInvoiceSubmissionFetching, isgetAllInvoiceSubmissionSuccess, isgetAllInvoiceSubmissionData])
  useEffect(() => {
    if (!isGetAllPurchasingFetching && isgetAllPurchasingSuccess && isgetAllPurchasingData) {
      setDropDownOptionField(isgetAllPurchasingData, 'contactId', 'fullName', contactInformationData, 'purchasingId');
    }
  }, [isGetAllPurchasingFetching, isgetAllPurchasingSuccess, isgetAllPurchasingData])

  const handleDropdownApiCall = (data) => {
    debugger
    if (data === 2) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.EndUser
      }
      getAllEndUserId(req)
    } else if (data === 3) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.Purchasing
      }
      getAllPurchasingId(req)
    } else if (data === 4) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.InvoiceSubmission
      }
      getAllInvoiceSubmissionId(req)
    }
  }

  useEffect(() => {
    getAllContactTypes();
  }, []);

  useEffect(() => {
    if (isGetAllContactTypesSucess && allGetAllContactTypesData) {
      const filterCondition = (item) => {
        let condition = item.isForCustomers;
        return condition;
      };
      setDropDownOptionField(allGetAllContactTypesData, "contactTypeId", "type", contactDetailFormData, "contactTypeId", filterCondition);
    }
  }, [isGetAllContactTypesSucess, allGetAllContactTypesData]);

  const handleInputGroupButton = (id) => {
    if (id > 0) {
      setContactTypeId(id)
      setIsModelOpen(!isModelOpen);
    }
  }

  const onSuccess = () => {
    // onGetContactList();
    setIsModelOpen(!isModelOpen);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    // onGetContactList();
  };

  // const handleCheckboxChanges = (data, dataField) => {
  //   if (dataField === "isEndUser" && data === false) {
  //     let updatedFormData;
  //     updatedFormData = removeFormFields(formData, ['contactId']);
  //     setFormData(updatedFormData)
  //   } else if (dataField === "isEndUser" && data === true) {
  //     const manageData = { ...formData };
  //     let filteredFormFields;
  //     filteredFormFields = contactInformationData.formFields
  //     manageData.formFields = filteredFormFields;
  //     setFormData(manageData)
  //   }
  //   else if (dataField === "isInvoiceSubmission" && data === false) {
  //     let updatedFormData;
  //     updatedFormData = removeFormFields(formData, ['contactIdd']);
  //     setFormData(updatedFormData)
  //   } else if (dataField === "isInvoiceSubmission" && data === true) {
  //     const manageData = { ...formData };
  //     let filteredFormFields;
  //     filteredFormFields = contactInformationData.formFields
  //     manageData.formFields = filteredFormFields;
  //     setFormData(manageData)
  //   }
  //   else if (dataField === "isPurchasingGiven" && data === false) {
  //     let updatedFormData;
  //     updatedFormData = removeFormFields(formData, ['contactIddd']);
  //     setFormData(updatedFormData)
  //   } else if (dataField === "isPurchasingGiven" && data === true) {
  //     const manageData = { ...formData };
  //     let filteredFormFields;
  //     filteredFormFields = contactInformationData.formFields
  //     manageData.formFields = filteredFormFields;
  //     setFormData(manageData)
  //   }

  // };

  const handleCheckboxChanges = (data, dataField) => {
    let updatedFormData = { ...formData };

    switch (dataField) {
      case "isEndUser":
        if (data) {
          // Add only the field related to "isEndUser"
          const endUserField = contactInformationData.formFields.find(field => field.dataField === "endUserId");
          updatedFormData.formFields = [...updatedFormData.formFields, endUserField];
        } else {
          updatedFormData = removeFormFields(updatedFormData, ["endUserId"]);
        }
        break;

      case "isInvoiceSubmission":
        if (data) {
          // Add only the field related to "isInvoiceSubmission"
          const invoiceSubmissionField = contactInformationData.formFields.find(field => field.dataField === "invoiceSubmissionId");
          updatedFormData.formFields = [...updatedFormData.formFields, invoiceSubmissionField];
        } else {
          updatedFormData = removeFormFields(updatedFormData, ["invoiceSubmissionId"]);
        }
        break;

      case "isPurchasingGiven":
        if (data) {
          // Add only the field related to "isPurchasingGiven"
          const purchasingField = contactInformationData.formFields.find(field => field.dataField === "purchasingId");
          updatedFormData.formFields = [...updatedFormData.formFields, purchasingField];
        } else {
          updatedFormData = removeFormFields(updatedFormData, ["purchasingId"]);
        }
        break;

      default:
        break;
    }

    // Remove any undefined or duplicate fields
    updatedFormData.formFields = updatedFormData.formFields.filter((field, index, self) =>
      field && index === self.findIndex(f => f.dataField === field.dataField)
    );

    setFormData(updatedFormData);
  };


  const formActionHandler = {
    CHECK_CHANGE: handleCheckboxChanges
  };


  return (
    <>
      <div className="row">
        <FormCreator
          config={formData}
          ref={basicInformation}
          {...formData}
          handleInputGroupButton={handleInputGroupButton}
          onCheckBoxChange={formActionHandler}
        />
      </div>
      {/* {isSidebarModal && */}
      <div className="sidebar-contact-model">
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-40"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <AddEditContact
            isOrderManage={true}
            onSuccess={onSuccess}
            addEditContactMutation={useAddEditContactMutation}
            isOpen={isModelOpen}
            getContactById={useLazyGetCustomerContactByContactIdQuery}
            getContectTypeId={getContectTypeId}
            customerId={orderCustomerId}
            onhandleApiCall={handleDropdownApiCall}
          />
        </SidebarModel>
      </div>
      {/* } */}
    </>
  );
};

export default ContactDetails;
