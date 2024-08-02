import React, { useEffect, useRef, useState } from 'react'
import { AddEditParameterData } from '../config/AddEditParameter.data';
import { useAddEditApiEventParameterMutation, useLazyGetApiEventParameterByApiEventParametersIdQuery } from '../../../../../../../../app/services/thirdPartyAPI';
import { ApiParametersDataTypes } from '../../../../../../../../utils/Enums/commonEnums';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import FormCreator from '../../../../../../../../components/Forms/FormCreator';
import Buttons from '../../../../../../../../components/ui/button/Buttons';

const AddEditEventParameter = (props) => {
  const addEditParameterRef = useRef();
  const [addEditParameterData, setAddEditParameterData] = useState(AddEditParameterData)
  const [addEditApiEventParameter, { isLoading: isAddEditApiEventParameterLoading, isSuccess: isAddEditApiEventParameterSuccess, data: allAddEditApiEventParameterData, },] = useAddEditApiEventParameterMutation();
  const [getApiEventParameterByApiEventParametersId, { isFetching: isGetApiEventParameterByApiEventParametersIdFetching, isSuccess: isGetApiEventParameterByApiEventParametersIdSucess, data: allGetApiEventParameterByApiEventParametersIdData }] = useLazyGetApiEventParameterByApiEventParametersIdQuery();

  useEffect(() => {
    const dropdownField = AddEditParameterData.formFields.find((item) => item.dataField === "parameterType");
    dropdownField.fieldSetting.options = Object.entries(ApiParametersDataTypes).map(([key, value]) => ({
      label: key,
      value: value,
    })
    );
  }, []);

  useEffect(() => {
    if (isAddEditApiEventParameterSuccess && allAddEditApiEventParameterData) {
      if (allAddEditApiEventParameterData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditApiEventParameterData.errorMessage);
        handleResetAndClose();
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
        apiEventParametersId: formData.apiEventParametersId && typeof formData.apiEventParametersId === "object" ? formData.apiEventParametersId.value : formData.apiEventParametersId,
        parameterName: formData.parameterName,
        parameterType: formData.parameterType && typeof formData.parameterType === "object" ? formData.parameterType.value : formData.parameterType,
      };
      addEditApiEventParameter(request);
    }
  };

  useEffect(() => {
    onResetForm(addEditParameterData, setAddEditParameterData, null);
  }, [props.isOpen])

  const handleResetAndClose = () => {
    onResetForm(addEditParameterData, setAddEditParameterData, null);
    props.onClose();
  };

  useEffect(() => {
    if (props.getData) {
      getApiEventParameterByApiEventParametersId(props.getData.apiEventParametersId)
    }
  }, [props.getData])

  useEffect(() => {
    if (!isGetApiEventParameterByApiEventParametersIdFetching && isGetApiEventParameterByApiEventParametersIdSucess && allGetApiEventParameterByApiEventParametersIdData) {
      let setData = { ...addEditParameterData }
      setData.initialState = {
        parameterName: allGetApiEventParameterByApiEventParametersIdData.parameterName,
        parameterType: allGetApiEventParameterByApiEventParametersIdData.parameterType,
        apiEventParametersId: allGetApiEventParameterByApiEventParametersIdData.apiEventParametersId,
        apiEventId: allGetApiEventParameterByApiEventParametersIdData.apiEventId,
        defaultValue: allGetApiEventParameterByApiEventParametersIdData.defaultValue
      }
      setAddEditParameterData(setData)
    }
  }, [isGetApiEventParameterByApiEventParametersIdFetching, isGetApiEventParameterByApiEventParametersIdSucess, allGetApiEventParameterByApiEventParametersIdData]);

  return (
    <div className="row mt-2 add-address-form">
      <FormCreator
        config={addEditParameterData}
        ref={addEditParameterRef}
      // key={shouldRerenderFormCreator}
      // onActionChange={formActionHandler}
      />
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