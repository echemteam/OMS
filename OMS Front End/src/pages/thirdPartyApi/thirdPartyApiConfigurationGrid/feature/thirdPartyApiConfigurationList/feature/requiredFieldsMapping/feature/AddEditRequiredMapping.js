import React, { useEffect, useRef, useState } from 'react'
import { useAddApiEventRequiredFieldsMappingMutation, useLazyGetAllRequiredFieldsByEventIdQuery } from '../../../../../../../../app/services/thirdPartyAPI';
import { AddEditRequiredMappingData } from '../config/AddEditRequiredMapping.data';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { setDropDownOptionField } from '../../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import FormCreator from '../../../../../../../../components/Forms/FormCreator';
import Buttons from '../../../../../../../../components/ui/button/Buttons';
import { useLazyGetAllAPIEndpointsQuery } from '../../../../../../../../app/services/apiParametersAPI';

const AddEditRequiredMapping = (props) => {
  const addEditMappingRef = useRef();
  const [addEditMappingData, setAddEditMappingData] = useState(AddEditRequiredMappingData)
  const [getAllAPIEndpoints, { isSuccess: isGetAllAPIEndpointsSucess, data: allGetAllAPIEndpointsData }] = useLazyGetAllAPIEndpointsQuery();
  const [getAllRequiredFields, { isSuccess: isGetAllRequiredFieldsSucess, data: isGetAllRequiredFieldsData }] = useLazyGetAllRequiredFieldsByEventIdQuery();
  const [addApiEventRequiredFieldsMapping, { isLoading: isAddApiEventRequiredFieldsMappingLoading, isSuccess: isAddApiEventRequiredFieldsMappingSuccess, data: allAddApiEventRequiredFieldsMappingData, },] = useAddApiEventRequiredFieldsMappingMutation();


  useEffect(() => {
    getAllAPIEndpoints()
    getAllRequiredFields(props.keyId);
  }, [])

  useEffect(() => {
    if (isAddApiEventRequiredFieldsMappingSuccess && allAddApiEventRequiredFieldsMappingData) {
      if (allAddApiEventRequiredFieldsMappingData.errorMessage.includes("exists")) {
        ToastService.warning(allAddApiEventRequiredFieldsMappingData.errorMessage);
     
        return;
      }
      ToastService.success(allAddApiEventRequiredFieldsMappingData.errorMessage);
      handleResetAndClose();
      props.onGetData()
    }
  }, [isAddApiEventRequiredFieldsMappingSuccess, allAddApiEventRequiredFieldsMappingData]);

  useEffect(() => {
    if (isGetAllAPIEndpointsSucess && allGetAllAPIEndpointsData) {
      setDropDownOptionField(allGetAllAPIEndpointsData, 'endpointId', 'name', AddEditRequiredMappingData, 'endpointId');
    }
    if (isGetAllRequiredFieldsSucess && isGetAllRequiredFieldsData) {
      setDropDownOptionField(isGetAllRequiredFieldsData, 'apiEventRequiredFieldId', 'fieldName', AddEditRequiredMappingData, 'apiEventRequiredFieldId');
    }

  }, [isGetAllAPIEndpointsSucess, allGetAllAPIEndpointsData, isGetAllRequiredFieldsSucess, isGetAllRequiredFieldsData]);

  const handleAddEditAPIPRovider = () => {
    const formData = addEditMappingRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        apiEventId: props.keyId ? props.keyId : 0,
        apiEventRequiredFieldId: formData.apiEventRequiredFieldId.value,
        apiResponseFieldName: formData.apiResponseFieldName
      };
      addApiEventRequiredFieldsMapping(request);
    }
  };

  useEffect(() => {
    onResetForm(addEditMappingData, setAddEditMappingData, null);
  }, [props.isOpen])

  const handleResetAndClose = () => {
    onResetForm(addEditMappingData, setAddEditMappingData, null);
    props.onClose();
  };

  return (
    <div className="row mt-2 add-address-form">
      <FormCreator
        config={addEditMappingData}
        ref={addEditMappingRef}
      />
      <div className="col-md-12 mt-2">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditAPIPRovider}
            isLoading={isAddApiEventRequiredFieldsMappingLoading}
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

export default AddEditRequiredMapping