import React, { useEffect, useRef, useState } from 'react'
import { AddEditParameterMappingData } from '../config/AddEditParameterMapping.data';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import { setDropDownOptionField } from '../../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import Buttons from '../../../../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../../../../components/Forms/FormCreator';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { useAddApiParameterMappingMutation, useLazyGetAllAPIParametersQuery, useLazyGetAllApiEventParameterByApiEventIdQuery} from '../../../../../../../../app/services/thirdPartyAPI';

const AddEditParameterMapping = (props) => {
  const addEditParameterMappingRef = useRef();
  const [addEditParameterMappingData, setAddEditParameterMappingData] = useState(AddEditParameterMappingData)
  const [addApiParameterMapping, { isLoading: isAddApiParameterMappingLoading, isSuccess: isAddApiParameterMappingSuccess, data: allAddApiParameterMappingData, },] = useAddApiParameterMappingMutation();
  const [getAllAPIParameters, { isSuccess: isGetAllAPIParametersSucess, data: allGetAllAPIParametersData }] = useLazyGetAllAPIParametersQuery();
  const [getAllApiEventParameterByApiEventId, { isSuccess: isGetAllApiEventParameterByApiEventIdSucess, data: allGetAllApiEventParameterByApiEventIdData }] = useLazyGetAllApiEventParameterByApiEventIdQuery();

  useEffect(() => {
      getAllAPIParameters()
      getAllApiEventParameterByApiEventId(props.keyId)
  }, [])

  useEffect(() => {
      if (isAddApiParameterMappingSuccess && allAddApiParameterMappingData) {
          if (allAddApiParameterMappingData.errorMessage.includes("exists")) {
              ToastService.warning(allAddApiParameterMappingData.errorMessage);
              handleResetAndClose();
              return;
          }
          ToastService.success(allAddApiParameterMappingData.errorMessage);
          handleResetAndClose();
          props.onGetData()
      }
  }, [isAddApiParameterMappingSuccess, allAddApiParameterMappingData]);

  useEffect(() => {
      if (isGetAllAPIParametersSucess && allGetAllAPIParametersData) {
          setDropDownOptionField(allGetAllAPIParametersData, 'parameterId', 'name', AddEditParameterMappingData, 'parameterId');
      }
      if (isGetAllApiEventParameterByApiEventIdSucess && allGetAllApiEventParameterByApiEventIdData) {
          setDropDownOptionField(allGetAllApiEventParameterByApiEventIdData, 'apiEventParametersId', 'parameterName', AddEditParameterMappingData, 'apiEventParametersId');
      }

  }, [isGetAllAPIParametersSucess, allGetAllAPIParametersData , allGetAllApiEventParameterByApiEventIdData , isGetAllApiEventParameterByApiEventIdSucess]);

  const handleAddEditAPIPRovider = () => {
    const formData = addEditParameterMappingRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        parameterId: formData.parameterId.value,
        apiEventParameterId: formData.apiEventParametersId.value,
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