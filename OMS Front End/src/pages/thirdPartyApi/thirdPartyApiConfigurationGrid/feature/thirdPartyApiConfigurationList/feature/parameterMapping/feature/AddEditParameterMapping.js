import React, { useEffect, useRef, useState } from 'react'
import { AddEditParameterMappingData } from '../config/AddEditParameterMapping.data';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import { setDropDownOptionField } from '../../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import Buttons from '../../../../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../../../../components/Forms/FormCreator';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { useAddApiParameterMappingMutation, useLazyGetAllAPIParametersByEndpointIdQuery, useLazyGetAllAPIParametersQuery, useLazyGetAllApiEventParameterByApiEventIdQuery, useLazyGetAllEventParameterByEventIdQuery } from '../../../../../../../../app/services/thirdPartyAPI';

const AddEditParameterMapping = (props) => {

  const addEditParameterMappingRef = useRef();
  const [addEditParameterMappingData, setAddEditParameterMappingData] = useState(AddEditParameterMappingData)
  const [getParametersByEndPointId, { isSuccess: isGetParametersSucess, data: isGetParametersData }] = useLazyGetAllAPIParametersByEndpointIdQuery();
  const [getEventParameterByEventId, { isSuccess: isGetEventParametersSucess, data: isGetEventParametersData }] = useLazyGetAllEventParameterByEventIdQuery();
  const [addApiParameterMapping, { isLoading: isAddApiParameterMappingLoading, isSuccess: isAddApiParameterMappingSuccess, data: allAddApiParameterMappingData, },] = useAddApiParameterMappingMutation();
  // const [getAllApiEventParameterByApiEventId, { isSuccess: isGetAllApiEventParameterByApiEventIdSucess, data: allGetAllApiEventParameterByApiEventIdData }] = useLazyGetAllApiEventParameterByApiEventIdQuery();

  useEffect(() => {
    props.endpointId && getParametersByEndPointId(props.endpointId)
    props.keyId && getEventParameterByEventId(props.keyId);
    console.log(props.endpointId);
    // getAllApiEventParameterByApiEventId(props.keyId);
  }, [])

  useEffect(() => {
    if (isAddApiParameterMappingSuccess && allAddApiParameterMappingData) {
      if (allAddApiParameterMappingData.errorMessage.includes("exists")) {
        ToastService.warning(allAddApiParameterMappingData.errorMessage);
        // handleResetAndClose();
        return;
      }
      ToastService.success(allAddApiParameterMappingData.errorMessage);
      handleResetAndClose();
      props.onGetData()
    }
  }, [isAddApiParameterMappingSuccess, allAddApiParameterMappingData]);

  useEffect(() => {
    if (isGetParametersSucess && isGetParametersData) {
      setDropDownOptionField(isGetParametersData, 'parameterId', 'name', AddEditParameterMappingData, 'providerParameterId');
    }
    if (isGetEventParametersSucess && isGetEventParametersData) {
      setDropDownOptionField(isGetEventParametersData, 'parameterId', 'name', AddEditParameterMappingData, 'eventParameterId');
    }

  }, [isGetParametersSucess, isGetParametersData, isGetEventParametersSucess, isGetEventParametersData]);

  const handleAddEditAPIPRovider = () => {
    const formData = addEditParameterMappingRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        eventParameterId: formData.eventParameterId.value,
        providerParameterId: formData.providerParameterId.value,
        apiEventId: props.keyId,
      };
      addApiParameterMapping(request);
    }
  };

  useEffect(() => {
    onResetForm(addEditParameterMappingData, setAddEditParameterMappingData, null);
  }, [props.isOpen])

  const handleResetAndClose = () => {
    onResetForm(addEditParameterMappingData, setAddEditParameterMappingData, null);
    props.onClose();
  };

  return (
    <div className="row mt-2 add-address-form">
      <FormCreator
        config={addEditParameterMappingData}
        ref={addEditParameterMappingRef}

      />
      <div className="col-md-12 mt-2">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditAPIPRovider}
            isLoading={isAddApiParameterMappingLoading}
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

export default AddEditParameterMapping