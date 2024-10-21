/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { AddEditParameterData } from '../config/AddEditParameter.data';
import { useAddEditApiEventParameterMutation, useLazyGetApiEventParameterByApiEventParametersIdQuery } from '../../../../../../../../app/services/thirdPartyAPI';
import { ApiParametersDataTypes, ParameterType } from '../../../../../../../../utils/Enums/commonEnums';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import FormCreator from '../../../../../../../../components/FinalForms/FormCreator';
import Buttons from '../../../../../../../../components/ui/button/Buttons';
import { getFieldData } from '../../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting';

const AddEditEventParameter = (props) => {
  const addEditParameterRef = useRef();
  const [addEditParameterData, setAddEditParameterData] = useState(AddEditParameterData)
  const [addEditApiEventParameter, { isLoading: isAddEditApiEventParameterLoading, isSuccess: isAddEditApiEventParameterSuccess, data: allAddEditApiEventParameterData, },] = useAddEditApiEventParameterMutation();
  const [getApiEventParameterByApiEventParametersId, { isFetching: isGetApiEventParameterByApiEventParametersIdFetching, isSuccess: isGetApiEventParameterByApiEventParametersIdSucess, data: allGetApiEventParameterByApiEventParametersIdData }] = useLazyGetApiEventParameterByApiEventParametersIdQuery();

  useEffect(() => {
    const dropdownField = getFieldData(AddEditParameterData, 'dataType');
    dropdownField.fieldSetting.options = Object.entries(ApiParametersDataTypes).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);

  useEffect(() => {
    if (isAddEditApiEventParameterSuccess && allAddEditApiEventParameterData) {
      if (allAddEditApiEventParameterData.errorMessage.includes("EXISTS")) {
        ToastService.warning(allAddEditApiEventParameterData.errorMessage);

        return;
      }
      ToastService.success(allAddEditApiEventParameterData.errorMessage);
      handleResetAndClose();
      props.onGetData()
    }
  }, [isAddEditApiEventParameterSuccess, allAddEditApiEventParameterData]);


  const handleAddEditAPIPRovider = () => {
    const formData = addEditParameterRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        apiEventId: props.keyId ? props.keyId : 0,
        parameterName: formData.parameterName,
        dataType: formData.dataType && typeof formData.dataType === "object" ? formData.dataType.value : formData.dataType,
        parameterType: ParameterType.EVENT,
        isRequired: formData.isRequired,
        defaultValue: formData.defaultValue,
      };
      addEditApiEventParameter(request);
    }
  };

  useEffect(() => {
    if (props.isOpen && !props.getData) {
      onResetForm(AddEditParameterData, setAddEditParameterData, null);
    }
  }, [props.isOpen])

  const handleResetAndClose = () => {
    onResetForm(AddEditParameterData, setAddEditParameterData, null);
    props.onClose();
  };

  useEffect(() => {
    if (props.getData) {
      getApiEventParameterByApiEventParametersId(props.getData.apiEventId)
    }
  }, [props.getData])

  useEffect(() => {
    if (!isGetApiEventParameterByApiEventParametersIdFetching && isGetApiEventParameterByApiEventParametersIdSucess && allGetApiEventParameterByApiEventParametersIdData) {
      let setData = { ...addEditParameterData }
      setData.initialState = {
        ...allGetApiEventParameterByApiEventParametersIdData,
        parameterName: allGetApiEventParameterByApiEventParametersIdData.parameterName,
        dataType: allGetApiEventParameterByApiEventParametersIdData.dataType,
        apiEventParametersId: allGetApiEventParameterByApiEventParametersIdData.apiEventParametersId,
        apiEventId: allGetApiEventParameterByApiEventParametersIdData.apiEventId,
        defaultValue: allGetApiEventParameterByApiEventParametersIdData.defaultValue,
        parameterType: ParameterType.EVENT,
        isRequired: allGetApiEventParameterByApiEventParametersIdData.isRequired
      }
      setAddEditParameterData(setData)
    }
  }, [isGetApiEventParameterByApiEventParametersIdFetching, isGetApiEventParameterByApiEventParametersIdSucess, allGetApiEventParameterByApiEventParametersIdData]);

  return (
    <div className="row mt-2 add-address-form">
      <div className='col-12'>
      <FormCreator config={addEditParameterData} ref={addEditParameterRef} />
      </div>
      <div className="col-md-12 mt-2">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditAPIPRovider}
            isLoading={isAddEditApiEventParameterLoading}
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

export default AddEditEventParameter