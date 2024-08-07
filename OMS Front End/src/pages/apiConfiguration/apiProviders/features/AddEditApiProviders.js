/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import PropTypes from "prop-types";
import { addEditApiProviderFormData } from "../config/ApiProviders.data";
import Buttons from "../../../../components/ui/button/Buttons";
import FormCreator from "../../../../components/Forms/FormCreator";
import { useEffect } from "react";
import { AuthenticationTypes } from "../../../../utils/Enums/commonEnums";
import { useState } from "react";
import { useAddEditApiProviderMutation, useLazyGetApiProviderByProviderIdQuery } from "../../../../app/services/apiProviderAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";

const AddEditApiProviders = (props) => {
  const providerId = props.initData?.providerId;
  const { getCustomerById } = props;
  const apiProviderRef = useRef();
  const [providerFormData, setProviderFormData] = useState(addEditApiProviderFormData);
  const [addEditApiProvider, { isLoading: isAddEditApiProviderLoading, isSuccess: isAddEditApiProviderSuccess, data: allAddEditApiProviderData, },] = useAddEditApiProviderMutation();
  const [getApiProviderByProviderId, { isFetching: isGetApiProviderByProviderIdFetching, isSuccess: isGetApiProviderByProviderSuccess, data: GetApiProviderByProviderIdData, },] = useLazyGetApiProviderByProviderIdQuery();

  useEffect(() => {
    if (providerId) {
      getApiProviderByProviderId(providerId);
    }
  }, [providerId]);

  useEffect(() => {
    if (isGetApiProviderByProviderSuccess && GetApiProviderByProviderIdData && !isGetApiProviderByProviderIdFetching) {
      const newFrom = { ...providerFormData };
      newFrom.initialState = {
        name: GetApiProviderByProviderIdData.name,
        baseURL: GetApiProviderByProviderIdData.baseURL,
        authenticationType: GetApiProviderByProviderIdData.authenticationType,
      };
      setProviderFormData(newFrom);
    }
  }, [isGetApiProviderByProviderSuccess, GetApiProviderByProviderIdData, isGetApiProviderByProviderIdFetching]);

  useEffect(() => {
    if (isAddEditApiProviderSuccess && allAddEditApiProviderData) {

      if (allAddEditApiProviderData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditApiProviderData.errorMessage);
        props.onSuccess();
        props.onClose();
        return;
      }
      onResetForm(addEditApiProviderFormData, setProviderFormData, null);
      if (providerId > 0) {
        getCustomerById()
        ToastService.success(allAddEditApiProviderData.errorMessage);
      } else {
        props.onSuccess();
        ToastService.success(allAddEditApiProviderData.errorMessage);
      }
      props.onClose();
    }
  }, [isAddEditApiProviderSuccess, allAddEditApiProviderData]);

  const handleResetAndClose = () => {
    onResetForm(addEditApiProviderFormData, setProviderFormData, null);
    props.onClose();
  };

  const handleAddEditAPIPRovider = () => {
    const formData = apiProviderRef.current.getFormData();
    if (formData && !providerId) {
      let request = {
        ...formData,
        authenticationType: formData.authenticationType.value,
      };
      addEditApiProvider(request);
    } else if (formData && providerId) {
      let requestData = {
        ...formData,
        providerId: providerId,
        authenticationType:
          formData.authenticationType &&
            typeof formData.authenticationType === "object" ? formData.authenticationType.value : formData.authenticationType,
      };
      addEditApiProvider(requestData);
    }
  };

  useEffect(() => {
    const dropdownField = addEditApiProviderFormData.formFields.find(
      (item) => item.dataField === "authenticationType"
    );
    dropdownField.fieldSetting.options = Object.entries(AuthenticationTypes).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);

  return (
     
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row vertical-form">
              <FormCreator
                ref={apiProviderRef}
                config={providerFormData}
                {...providerFormData}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText={props.isEdit ? "Update" : "Save"}
                onClick={handleAddEditAPIPRovider}
                isLoading={isAddEditApiProviderLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={handleResetAndClose}
              />
            </div>
          </div>
        </div>
      </div>
     
  );
};

AddEditApiProviders.propTypes = {
  initData: PropTypes.shape({
    providerId: PropTypes.number,
  }),
  getCustomerById: PropTypes.func,
  onSuccess: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};
export default AddEditApiProviders;
