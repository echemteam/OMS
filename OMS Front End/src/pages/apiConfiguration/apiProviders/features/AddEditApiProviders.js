import { useRef } from "react";
import { addEditApiProviderFormData } from "../config/ApiProviders.data";
import Buttons from "../../../../components/ui/button/Buttons";
import FormCreator from "../../../../components/Forms/FormCreator";
import { useEffect } from "react";
import { AuthenticationTypes } from "../../../../utils/Enums/commonEnums";
import { useState } from "react";
import {
  useAddEditApiProviderMutation,
  useLazyGetApiProviderByProviderIdQuery,
} from "../../../../app/services/apiProviderAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";

const AddEditApiProviders = (props) => {
  const providerId = props.initData.providerId;
  const apiProviderRef = useRef();
  const [providerFormData, setProviderFormData] = useState( addEditApiProviderFormData);
  const [addEditApiProvider, {isLoading: isAddEditApiProviderLoading,isSuccess: isAddEditApiProviderSucess,data: allAddEditApiProviderData,},] = useAddEditApiProviderMutation();
const [getApiProviderByProviderId,{  isFetching: isGetApiProviderByProviderIdFetching,isSuccess: isGetApiProviderByProviderSuccess,data: GetApiProviderByProviderIdData, },] = useLazyGetApiProviderByProviderIdQuery();

  useEffect(() => {
    if (providerId && props.isEdit) {
      getApiProviderByProviderId(providerId);
    }
  }, [providerId, props.isEdit]);

  useEffect(() => {
    if ( isGetApiProviderByProviderSuccess && GetApiProviderByProviderIdData && !isGetApiProviderByProviderIdFetching) {
      const newFrom = { ...providerFormData };
      newFrom.initialState = {
        name: GetApiProviderByProviderIdData.name,
        baseURL: GetApiProviderByProviderIdData.baseURL,
        authenticationType: GetApiProviderByProviderIdData.authenticationType,
      };
      setProviderFormData(newFrom);
    }
  }, [isGetApiProviderByProviderSuccess, GetApiProviderByProviderIdData, isGetApiProviderByProviderIdFetching, ]);

  useEffect(() => {
    if (isAddEditApiProviderSucess && allAddEditApiProviderData) {

      if (allAddEditApiProviderData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditApiProviderData.errorMessage);
        props.onSuccess();
        props.onClose();
        return;
    }
      onResetForm(addEditApiProviderFormData, setProviderFormData, null);
      props.onSuccess();
      ToastService.success(allAddEditApiProviderData.errorMessage);
      props.onClose();
    }
  }, [isAddEditApiProviderSucess, allAddEditApiProviderData]);

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
    dropdownField.fieldSetting.options = Object.entries( AuthenticationTypes ).map(([key, value]) => ({
       label: key,
      value: value,
    }));
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12 horizontal-form">
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
    </>
  );
};
export default AddEditApiProviders;
