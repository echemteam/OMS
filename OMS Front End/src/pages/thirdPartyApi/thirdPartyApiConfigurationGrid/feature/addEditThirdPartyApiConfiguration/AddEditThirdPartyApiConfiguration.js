import React, { useEffect, useRef, useState } from 'react'
import { AddEditThirdPartyApiData } from './config/AddEditThirdPartyApiConfiguration.data';
import Buttons from '../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../components/Forms/FormCreator';
import { useAddEditApiEventMutation } from '../../../../../app/services/thirdPartyAPI';
import ToastService from '../../../../../services/toastService/ToastService';
import { onResetForm } from '../../../../../utils/FormFields/ResetForm/handleResetForm';

const AddEditThirdPartyApiConfiguration = (props) => {
  const addEditThirdRef = useRef();
  const [addEditeThirdData, setAddEditeThirdData] = useState(AddEditThirdPartyApiData);

  const [addEditApiEvent, { isLoading: isAddEditApiEventLoading, isSuccess: isAddEditApiEventSuccess, data: allAddEditApiEventData, },] = useAddEditApiEventMutation();

  useEffect(() => {
    if (isAddEditApiEventSuccess && allAddEditApiEventData) {
      if (allAddEditApiEventData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditApiEventData.errorMessage);
        handleResetAndClose();
        return;
      }
      if (!props.keyId) {
        ToastService.success(allAddEditApiEventData.errorMessage);
        handleResetAndClose();
        props.onGetData()
      } else {
        handleResetAndClose()
        props.onRepetGetData(props.keyId)
      }
    }
  }, [isAddEditApiEventSuccess, allAddEditApiEventData]);

  const handleAddEditAPIPRovider = () => {
    const formData = addEditThirdRef.current.getFormData();
    if (formData) {
      let request = {
        ...formData,
        apiEventId: props.viewCardDetails.apiEventId ? props.viewCardDetails.apiEventId : 0
      };
      addEditApiEvent(request);
    }
  };

  const handleResetAndClose = () => {
    onResetForm(addEditeThirdData, setAddEditeThirdData, null);
    props.onClose();
  };

  useEffect(() => {
    onResetForm(addEditeThirdData, setAddEditeThirdData, null);
    if (props.viewCardDetails) {
      let setData = { ...addEditeThirdData }
      setData.initialState = {
        eventName: props.viewCardDetails.eventName,
        description: props.viewCardDetails.description,
      }
      setAddEditeThirdData(setData)
    }
  }, [props.isOpen])

  return (
    <div className="row mt-2 add-address-form">
      <FormCreator
        config={addEditeThirdData}
        ref={addEditThirdRef}
      // key={shouldRerenderFormCreator}
      // onActionChange={formActionHandler}
      />
      <div className="col-md-12 mt-2">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditAPIPRovider}
            isLoading={isAddEditApiEventLoading}
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

export default AddEditThirdPartyApiConfiguration