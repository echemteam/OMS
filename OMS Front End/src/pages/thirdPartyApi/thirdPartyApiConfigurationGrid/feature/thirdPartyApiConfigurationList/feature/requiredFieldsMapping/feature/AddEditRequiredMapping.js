import React, { useEffect, useRef, useState } from 'react'
import { useAddApiEventRequiredFieldsMappingMutation, useLazyGetAllApiEventRequiredFieldByApiEventIdQuery } from '../../../../../../../../app/services/thirdPartyAPI';
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
  const [addApiEventRequiredFieldsMapping, { isLoading: isAddApiEventRequiredFieldsMappingLoading, isSuccess: isAddApiEventRequiredFieldsMappingSuccess, data: allAddApiEventRequiredFieldsMappingData, },] = useAddApiEventRequiredFieldsMappingMutation();
  const [getAllApiEventRequiredFieldByApiEventId, { isSuccess: isGetAllApiEventRequiredFieldByApiEventIdSucess, data: allGetAllApiEventRequiredFieldByApiEventIdData }] = useLazyGetAllApiEventRequiredFieldByApiEventIdQuery();
  const [getAllAPIEndpoints, { isSuccess: isGetAllAPIEndpointsSucess, data: allGetAllAPIEndpointsData }] = useLazyGetAllAPIEndpointsQuery();


  useEffect(() => {
    getAllAPIEndpoints()
    getAllApiEventRequiredFieldByApiEventId(props.keyId)
  }, [])

  useEffect(() => {
    if (isAddApiEventRequiredFieldsMappingSuccess && allAddApiEventRequiredFieldsMappingData) {
      if (allAddApiEventRequiredFieldsMappingData.errorMessage.includes("exists")) {
        ToastService.warning(allAddApiEventRequiredFieldsMappingData.errorMessage);
        handleResetAndClose();
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
    if (isGetAllApiEventRequiredFieldByApiEventIdSucess && allGetAllApiEventRequiredFieldByApiEventIdData) {
      setDropDownOptionField(allGetAllApiEventRequiredFieldByApiEventIdData, 'apiEventRequiredFieldsMappingId', 'requiredField', AddEditRequiredMappingData, 'apiEventRequiredFieldsMappingId');
    }

  }, [isGetAllAPIEndpointsSucess, allGetAllAPIEndpointsData, isGetAllApiEventRequiredFieldByApiEventIdSucess, allGetAllApiEventRequiredFieldByApiEventIdData]);

  const handleAddEditAPIPRovider = () => {
    const formData = addEditMappingRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        apiEventId: props.keyId ? props.keyId : 0,
        mappingId: formData.mappingId,
        apiResponseFieldName: formData.apiResponseFieldName,
        apiEventRequiredFieldId: formData.apiEventRequiredFieldsMappingId.value,
        requiredField: formData.requiredField,
        endpointId: formData.endpointId.value,
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