import React, { useEffect, useRef, useState } from 'react'
import ToastService from '../../../../../../../../services/toastService/ToastService';
import Buttons from '../../../../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../../../../components/Forms/FormCreator';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import { AddEditRequireParameterData } from '../config/AddEventRequiredFields.data';
import { useAddEditApiEventRequiredFieldMutation, useLazyGetApiEventRequiredFieldByApiEventRequiredFieldIdQuery } from '../../../../../../../../app/services/thirdPartyAPI';
import { ApiParametersDataTypes } from '../../../../../../../../utils/Enums/commonEnums';

const AddEditRequiredFields = (props) => {
  const addEditRequireRef = useRef();
  const [addEditRequireData, setAddEditRequireData] = useState(AddEditRequireParameterData)
  const [addEditApiEventRequiredField, { isLoading: isAddEditApiEventRequiredFieldLoading, isSuccess: isAddEditApiEventRequiredFieldSuccess, data: allAddEditApiEventRequiredFieldData, },] = useAddEditApiEventRequiredFieldMutation();
  const [getApiEventRequiredFieldByApiEventRequiredFieldId, { isFetching: isGetApiEventRequiredFieldByApiEventRequiredFieldIdFetching, isSuccess: isGetApiEventRequiredFieldByApiEventRequiredFieldIdSucess, data: allGetApiEventRequiredFieldByApiEventRequiredFieldIdData }] = useLazyGetApiEventRequiredFieldByApiEventRequiredFieldIdQuery();

  useEffect(() => {
    if (isAddEditApiEventRequiredFieldSuccess && allAddEditApiEventRequiredFieldData) {
      if (allAddEditApiEventRequiredFieldData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditApiEventRequiredFieldData.errorMessage);
      
        return;
      }
      ToastService.success(allAddEditApiEventRequiredFieldData.errorMessage);
      handleResetAndClose();
      props.onGetData()
    }
  }, [isAddEditApiEventRequiredFieldSuccess, allAddEditApiEventRequiredFieldData]);


  const handleAddEditAPIPRovider = () => {
    const formData = addEditRequireRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        fieldName: formData.fieldName,
        apiEventRequiredFieldId: formData.apiEventRequiredFieldId && typeof formData.apiEventRequiredFieldId === "object" ? formData.apiEventRequiredFieldId.value : formData.apiEventRequiredFieldId,
        fieldDescription: formData.fieldDescription,
        fieldType: formData.fieldType && typeof formData.fieldType === "object" ? formData.fieldType.value : formData.fieldType,
        apiEventId: props.keyId,
      };
      addEditApiEventRequiredField(request);
    }
  };

  useEffect(() => {
    onResetForm(AddEditRequireParameterData, setAddEditRequireData, null);
  }, [props.isOpen])

  const handleResetAndClose = () => {
    onResetForm(AddEditRequireParameterData, setAddEditRequireData, null);
    props.onClose();
  };

  useEffect(() => {
    if (props.getData) {
      getApiEventRequiredFieldByApiEventRequiredFieldId(props.getData.apiEventRequiredFieldId)
    }
  }, [props.getData])

  useEffect(() => {
    const dropdownField = AddEditRequireParameterData.formFields.find((item) => item.dataField === "fieldType");
    dropdownField.fieldSetting.options = Object.entries(ApiParametersDataTypes).map(([key, value]) => ({
      label: key,
      value: value,
    })
    );
  }, []);

  useEffect(() => {
    if (!isGetApiEventRequiredFieldByApiEventRequiredFieldIdFetching && isGetApiEventRequiredFieldByApiEventRequiredFieldIdSucess && allGetApiEventRequiredFieldByApiEventRequiredFieldIdData) {
      let setData = { ...addEditRequireData }
      setData.initialState = {
        fieldType: allGetApiEventRequiredFieldByApiEventRequiredFieldIdData.fieldType,
        fieldDescription: allGetApiEventRequiredFieldByApiEventRequiredFieldIdData.fieldDescription,
        fieldName: allGetApiEventRequiredFieldByApiEventRequiredFieldIdData.fieldName,
        apiEventRequiredFieldId: allGetApiEventRequiredFieldByApiEventRequiredFieldIdData.apiEventRequiredFieldId
      }
      setAddEditRequireData(setData)
    }
  }, [isGetApiEventRequiredFieldByApiEventRequiredFieldIdFetching, isGetApiEventRequiredFieldByApiEventRequiredFieldIdSucess, allGetApiEventRequiredFieldByApiEventRequiredFieldIdData]);

  return (
    <div className="row mt-2 add-address-form">
      <FormCreator
        config={addEditRequireData}
        ref={addEditRequireRef}
      />
      <div className="col-md-12 mt-2">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditAPIPRovider}
            isLoading={isAddEditApiEventRequiredFieldLoading}
          />
          <Buttons
            buttonTypeClassName="dark-btn ml-5"
            buttonText="Cancel"
            onClick={handleResetAndClose}
          />
        </div>
      </div>
    </div>
  )
}

export default AddEditRequiredFields