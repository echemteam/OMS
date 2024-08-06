import React, { useEffect, useRef, useState } from "react";
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


const ContactDetails = (props) => {
  const basicInformation = useRef();
  const [formData, setFormData] = useState(contactInformationData);
  // const [isSidebarModal, setIsSidebarModal] = useState(null)
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [getContectTypeId, setContactTypeId] = useState(null)

  const [getAllContactsByCustomerIdAndContactTypeId, { isFetching: isGetAllContactsByCustomerIdAndContactTypeIdFetching, isSuccess: isgetAllContactsByCustomerIdAndContactTypeIdSuccess, data: isgetAllContactsByCustomerIdAndContactTypeIdData }] = useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery();
  const [
    getAllContactTypes,
    { isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData },
  ] = useLazyGetAllContactTypesQuery();

  useEffect(() => {
    // if(){
    let req = {
      customerId: 1093,
      contactTypeId: ContactType.EndUser
    }
    getAllContactsByCustomerIdAndContactTypeId(req)
    // }
    //  
  }, [1093])

  useEffect(() => {
    if (!isGetAllContactsByCustomerIdAndContactTypeIdFetching && isgetAllContactsByCustomerIdAndContactTypeIdSuccess && isgetAllContactsByCustomerIdAndContactTypeIdData) {
      setDropDownOptionField(isgetAllContactsByCustomerIdAndContactTypeIdData, 'contactId', 'fullName', contactInformationData, 'contactId');
    }
  }, [isGetAllContactsByCustomerIdAndContactTypeIdFetching, isgetAllContactsByCustomerIdAndContactTypeIdSuccess, isgetAllContactsByCustomerIdAndContactTypeIdData])

  const handleDropdownApiCall = () => {
    let req = {
      customerId: 1093,
      contactTypeId: ContactType.EndUser
    }
    getAllContactsByCustomerIdAndContactTypeId(req)
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
      // const contactOption = getFieldData(contactDetailFormData, "contactTypeId");
      // setContactType(contactOption?.fieldSetting?.options);
      // setTabContactType(modifyContactType(allGetAllContactTypesData));
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
          const endUserField = contactInformationData.formFields.find(field => field.dataField === "contactId");
          updatedFormData.formFields = [...updatedFormData.formFields, endUserField];
        } else {
          updatedFormData = removeFormFields(updatedFormData, ["contactId"]);
        }
        break;
  
      case "isInvoiceSubmission":
        if (data) {
          // Add only the field related to "isInvoiceSubmission"
          const invoiceSubmissionField = contactInformationData.formFields.find(field => field.dataField === "contactIdd");
          updatedFormData.formFields = [...updatedFormData.formFields, invoiceSubmissionField];
        } else {
          updatedFormData = removeFormFields(updatedFormData, ["contactIdd"]);
        }
        break;
  
      case "isPurchasingGiven":
        if (data) {
          // Add only the field related to "isPurchasingGiven"
          const purchasingField = contactInformationData.formFields.find(field => field.dataField === "contactIddd");
          updatedFormData.formFields = [...updatedFormData.formFields, purchasingField];
        } else {
          updatedFormData = removeFormFields(updatedFormData, ["contactIddd"]);
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
            customerId={1093}
            onhandleApiCall={handleDropdownApiCall}
          />
        </SidebarModel>
      </div>
      {/* } */}
    </>
  );
};

export default ContactDetails;
