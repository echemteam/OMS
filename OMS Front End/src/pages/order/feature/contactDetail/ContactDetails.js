/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { contactInformationData } from "./config/ContactDetail.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import { useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery } from '../../../../app/services/commonAPI';
import { ContactType, FieldSettingType } from "../../../../utils/Enums/commonEnums";
import { setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import AddEditContact from "../../../../common/features/component/Contact/feature/AddEditContact";
import { useAddEditContactMutation, useLazyGetAllContactTypesQuery, useLazyGetCustomerContactByContactIdQuery } from "../../../../app/services/contactAPI";
import { contactDetailFormData } from "../../../../common/features/component/Contact/config/ContactDetailForm.data";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";

const ContactDetails = (props) => {
  const basicInformation = useRef();
  // const editRef = useRef();
  const [formData, setFormData] = useState(contactInformationData);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [getContectTypeId, setContectTypeId] = useState(null)
  const [endUserEnableDisableButton, setEndUserEnableDisableButton] = useState(true)
  const [invoicerEnableDisableButton, setInvoiceEnableDisableButton] = useState(true)
  const [purchasingEnableDisableButton, setPurchasingEnableDisableButton] = useState(true)
  const [orderResetValue, setOrderResetValue] = useState(false)

  const { conatctRef, orderCustomerId, moveNextPage, orderId ,movePreviewPage} = useContext(AddOrderContext);
  const [getAllContactTypes, { isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData }] = useLazyGetAllContactTypesQuery();

  const [getAllEndUserId, { isFetching: isGetAllEndUserFetching, isSuccess: isgetAllEndUserSuccess, data: isgetAllEndUserData }] = useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery();
  const [getAllInvoiceSubmissionId, { isFetching: isGetAllInvoiceSubmissionFetching, isSuccess: isgetAllInvoiceSubmissionSuccess, data: isgetAllInvoiceSubmissionData }] = useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery();
  const [getAllPurchasingId, { isFetching: isGetAllPurchasingFetching, isSuccess: isgetAllPurchasingSuccess, data: isgetAllPurchasingData }] = useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery();

   useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.ENDUSER
      }
      getAllEndUserId(req)
    }
  }, [orderCustomerId])

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.INVOICESUBMISSION
      }
      getAllInvoiceSubmissionId(req)
    }
  }, [orderCustomerId])

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.PURCHASING
      }
      getAllPurchasingId(req)
    }
  }, [orderCustomerId])

  useEffect(() => {
    if (!isGetAllEndUserFetching && isgetAllEndUserSuccess && isgetAllEndUserData) {
      const getContact = isgetAllEndUserData.map((item) => ({
        value: item.contactId,
        label: item.fullName,
      }));

      // Create a new formData object to trigger re-render
      setFormData(prevFormData => {
        const newFormData = { ...prevFormData };
        const dropdownField = newFormData.formFields?.find(item => item.dataField === "endUserId");
        if (dropdownField) {
          dropdownField.fieldSetting.options = getContact;
        }
        return newFormData;
      });
    }
  }, [isGetAllEndUserFetching, isgetAllEndUserSuccess, isgetAllEndUserData]);

  useEffect(() => {
    if (!isGetAllInvoiceSubmissionFetching && isgetAllInvoiceSubmissionSuccess && isgetAllInvoiceSubmissionData) {
      const getContact = isgetAllInvoiceSubmissionData.map((item) => ({
        value: item.contactId,
        label: item.fullName,
      }));

      // Create a new formData object to trigger re-render
      setFormData(prevFormData => {
        const newFormData = { ...prevFormData };
        const dropdownField = newFormData.formFields?.find(item => item.dataField === "invoiceSubmissionId");
        if (dropdownField) {
          dropdownField.fieldSetting.options = getContact;
        }
        return newFormData;
      });
    }
  }, [isGetAllInvoiceSubmissionFetching, isgetAllInvoiceSubmissionSuccess, isgetAllInvoiceSubmissionData]);

  useEffect(() => {
    if (!isGetAllPurchasingFetching && isgetAllPurchasingSuccess && isgetAllPurchasingData) {
      const getContact = isgetAllPurchasingData.map((item) => ({
        value: item.contactId,
        label: item.fullName,
      }));

      // Create a new formData object to trigger re-render
      setFormData(prevFormData => {
        const newFormData = { ...prevFormData };
        const dropdownField = newFormData.formFields?.find(item => item.dataField === "purchasingId");
        if (dropdownField) {
          dropdownField.fieldSetting.options = getContact;
        }
        return newFormData;
      });
    }
  }, [isGetAllPurchasingFetching, isgetAllPurchasingSuccess, isgetAllPurchasingData]);


  const handleDropdownApiCall = (data) => {
    if (data === 2) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.ENDUSER
      }
      getAllEndUserId(req)
    } else if (data === 3) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.PURCHASING
      }
      getAllPurchasingId(req)
    } else if (data === 4) {
      let req = {
        customerId: orderCustomerId,
        contactTypeId: ContactType.INVOICESUBMISSION
      }
      getAllInvoiceSubmissionId(req)
    }
  }

  useEffect(()=>{
    handleClearContactDetails();
  },[props.customerId])

 
  const handleClearContactDetails = () => {
    onResetForm(formData, setFormData, null);
  }
  
  useEffect(() => {
    getAllContactTypes();
    setEndUserEnableDisableButton(true);
    setInvoiceEnableDisableButton(true);
    setPurchasingEnableDisableButton(true);
    setFieldSetting(formData, 'endUserId', FieldSettingType.DISABLED, false);
    setFieldSetting(formData, 'invoiceSubmissionId', FieldSettingType.DISABLED, false);
    setFieldSetting(formData, 'purchasingId', FieldSettingType.DISABLED, false);
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
      setContectTypeId(id)
      if (endUserEnableDisableButton && ContactType.ENDUSER === id) {
        setIsModelOpen(!isModelOpen);
      }
      if (invoicerEnableDisableButton && ContactType.INVOICESUBMISSION === id) {
        setIsModelOpen(!isModelOpen);
      }
      if (purchasingEnableDisableButton && ContactType.PURCHASING === id) {
        setIsModelOpen(!isModelOpen);
      }
    }
  }

  const onSuccess = () => {
    setIsModelOpen(!isModelOpen);
    setOrderResetValue(true)
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    setOrderResetValue(false)
  };

  const handleCheckboxChanges = (data, dataField) => {
    let updatedFormData = { ...formData };
    switch (dataField) {
      case "isEndUser":
        if (data) {
          updatedFormData.formFields = manageRequiredFieldsValidation(updatedFormData.formFields, 'endUserId', false);
          setFieldSetting(updatedFormData, 'endUserId', FieldSettingType.DISABLED, false);
          setEndUserEnableDisableButton(true);
        } else {
          updatedFormData.formFields = manageRequiredFieldsValidation(updatedFormData.formFields, 'endUserId', true);
          setFieldSetting(updatedFormData, 'endUserId', FieldSettingType.DISABLED, true);
          basicInformation.current.updateFormFieldValue({
            endUserId: null,
            isEndUser: false
          });
          setEndUserEnableDisableButton(false);
        }
        break;
      case "isInvoiceSubmission":
        if (data) {
          updatedFormData.formFields = manageRequiredFieldsValidation(updatedFormData.formFields, 'invoiceSubmissionId', false);
          setFieldSetting(updatedFormData, 'invoiceSubmissionId', FieldSettingType.DISABLED, false);
          setInvoiceEnableDisableButton(true);
        } else {
          updatedFormData.formFields = manageRequiredFieldsValidation(updatedFormData.formFields, 'invoiceSubmissionId', true);
          updatedFormData.formFields = updatedFormData.formFields.map((field) => {
            if (field.id === 'invoiceSubmissionId') {
              const { validation, ...rest } = field;
              return rest;
            }
            return field;
          });
          setFieldSetting(updatedFormData, 'invoiceSubmissionId', FieldSettingType.DISABLED, true);
          basicInformation.current.updateFormFieldValue({
            invoiceSubmissionId: null,
            isInvoiceSubmission: false
          });
          setInvoiceEnableDisableButton(false);
        }
        break;
      case "isPurchasingGiven":
        if (data) {
          updatedFormData.formFields = manageRequiredFieldsValidation(updatedFormData.formFields, 'purchasingId', false);
          setFieldSetting(updatedFormData, 'purchasingId', FieldSettingType.DISABLED, false);
          setPurchasingEnableDisableButton(true);
        } else {
          updatedFormData.formFields = manageRequiredFieldsValidation(updatedFormData.formFields, 'purchasingId', true);
          setFieldSetting(updatedFormData, 'purchasingId', FieldSettingType.DISABLED, true);
          basicInformation.current.updateFormFieldValue({
            purchasingId: null,
            isPurchasingGiven: false
          });
          setPurchasingEnableDisableButton(false);
        }
        break;
      default:
        break;
    }
    setFormData(updatedFormData);
  };

  const manageRequiredFieldsValidation = (formFields, fieldsId, isRemove) => {
    return formFields.map((field) => {
      if (field.id === fieldsId) {
        if (isRemove) {
          const { validation, ...rest } = field;
          return rest;
        } else {
          return { ...field, validation: [{ type: "require" }] };
        }
      }
      return field;
    });
  }

  const formActionHandler = {
    CHECK_CHANGE: handleCheckboxChanges
  };

  useImperativeHandle(conatctRef, () => ({
    handleAddOrderConatct,
  }));

  const handleAddOrderConatct = () => {
    let data = basicInformation.current.getFormData(); // Retrieve form data
    if (data) {
      let orderContactsList = [];

      if (data.isEndUser && data.endUserId) {
        orderContactsList.push({
          contactId: typeof data.endUserId === "object" ? data.endUserId.value : data.endUserId,
          contactTypeId: ContactType.ENDUSER
        });
      }

      if (data.isInvoiceSubmission && data.invoiceSubmissionId) {
        orderContactsList.push({
          contactId: typeof data.invoiceSubmissionId === "object" ? data.invoiceSubmissionId.value : data.invoiceSubmissionId,
          contactTypeId: ContactType.INVOICESUBMISSION
        });
      }

      if (data.isPurchasingGiven && data.purchasingId) {
        orderContactsList.push({
          contactId: typeof data.purchasingId === "object" ? data.purchasingId.value : data.purchasingId,
          contactTypeId: ContactType.PURCHASING
        });
      }

      let request = {
        orderId: orderId || 0, // Use orderId or default to 0
        orderContactsList, // Add the contacts list to the request
        referenceNumber: data.refNumber,
        isEndUser: data.isEndUser,
        isInvoiceSubmission: data.isInvoiceSubmission,
        isPurchasing: data.isPurchasingGiven,
      };

      // Pass the request data to the parent component or API
      props.onHandleOrderContact(request);
      moveNextPage(); // Move to the next page or step
    }
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
            onSidebarClose={onSidebarClose}
            orderResetValue={orderResetValue}
          // enableDisableButton={enableDisableButton}
          />
        </SidebarModel>
      </div>
      {/* } */}
    </>
  );
};

export default ContactDetails;
