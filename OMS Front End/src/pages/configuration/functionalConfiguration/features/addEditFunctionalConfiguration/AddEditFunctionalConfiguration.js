import React, { useEffect, useRef, useState } from 'react'
import { AddEditFunctionalData } from './config/AddEditFunctional.data';
import Buttons from '../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../components/Forms/FormCreator';
import { useAddEditFunctionalitiesMutation } from '../../../../../app/services/configurationAPI';
import ToastService from '../../../../../services/toastService/ToastService';
import { onResetForm } from '../../../../../utils/FormFields/ResetForm/handleResetForm';

const AddEditFunctionalConfiguration = (props) => {
  const functionalRef = useRef();
  const [functionalData, setFunctionalData] = useState(AddEditFunctionalData);

  const [addEditFunctionalities, { isLoading: isAddEditFunctionalitiesLoading, isSuccess: isAddEditFunctionalitiesSuccess, data: allAddEditFunctionalitiesData, },] = useAddEditFunctionalitiesMutation();

  useEffect(() => {
    if (isAddEditFunctionalitiesSuccess && allAddEditFunctionalitiesData) {
      if (allAddEditFunctionalitiesData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditFunctionalitiesData.errorMessage);
        handleResetAndClose();
        return;
      }
      ToastService.success(allAddEditFunctionalitiesData.errorMessage);
      handleResetAndClose();
      props.onGetData()
    }
  }, [isAddEditFunctionalitiesSuccess, allAddEditFunctionalitiesData]);

  const handleAddEditFunctional = () => {
    const formData = functionalRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        functionalityId: props.initData.functionalityId ? props.initData.functionalityId : 0,
        moduleId: props.moduleId ? props.moduleId : 0,
      };
      addEditFunctionalities(request);
    }
  }

  useEffect(() => {
    onResetForm(functionalData, setFunctionalData, null);
    if (props.initData) {
      let UpdateData = { ...AddEditFunctionalData };
      UpdateData.initialState = {
        name: props.initData.functionalityName,
        functionalityId: props.initData.functionalityId ? props.initData.functionalityId : 0,
        moduleId: props.initData.moduleId ? props.initData.moduleId : 0,
      };
      setFunctionalData(UpdateData)
    }
  }, [props.isOpen])

  const handleResetAndClose = () => {
    onResetForm(functionalData, setFunctionalData, null);
    props.onClose();
  };

  return (
    <div className="row mt-2 add-address-form">
      <FormCreator
        config={functionalData}
        ref={functionalRef}
      />
      <div className="col-md-12 mt-2">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditFunctional}
            isLoading={isAddEditFunctionalitiesLoading}
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

export default AddEditFunctionalConfiguration