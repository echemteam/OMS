/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect, useImperativeHandle } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { addEditApiAuthenticationFormData } from "../config/ApiAuthentication.data";
import { useLazyGetAllAPIProvidersQuery } from "../../../../app/services/apiEndPointsAPI";
import { setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { useAddEditApiAuthenticationMutation, useLazyGetApiAuthenticationByAuthIdQuery } from "../../../../app/services/apiAuthenticationAPI";
import { AuthenticationTypes, FieldSettingType } from "../../../../utils/Enums/commonEnums";

const AddEditApiAuthentication = (props) => {
  const apiAuthenticationRef = useRef();
  const authId = props.authId;

  const [authenticationFormData, setAuthenticationFormData] = useState(addEditApiAuthenticationFormData);

  const [getAllAPIProviders, { isSuccess: isGetAllAPIProvidersSuccess, data: allAPIProvidersData }] = useLazyGetAllAPIProvidersQuery();
  const [addEditApiAuthentication, { isLoading: isAddEditApiAuthenticationLoading, isSuccess: isAddEditApiAuthenticationSuccess, data: addEditApiAuthenticationData }] = useAddEditApiAuthenticationMutation();
  const [getApiAuthenticationByAuthId, { isFetching: isGetApiAuthenticationByAuthIdFetching, isSuccess: isGetApiAuthenticationByAuthIdSuccess, data: apiAuthenticationData }] = useLazyGetApiAuthenticationByAuthIdQuery();

  useEffect(() => {
    let newFormData = removeFormFields(authenticationFormData, ['authKey', 'clientSecret', 'clientId']);
    setAuthenticationFormData(newFormData);
    getAllAPIProviders();
  }, []);

  useEffect(() => {
    if (isGetAllAPIProvidersSuccess && allAPIProvidersData) {
      setDropDownOptionField(allAPIProvidersData, 'providerId', 'name', authenticationFormData, 'providerId');
    }
  }, [isGetAllAPIProvidersSuccess, allAPIProvidersData]);

  useEffect(() => {
    let newFormData = { ...addEditApiAuthenticationFormData }
    if (authId && props.isEdit) {
      setAuthenticationFormData(newFormData);
      getApiAuthenticationByAuthId(authId);
    }
    else {
      newFormData = removeFormFields(addEditApiAuthenticationFormData, ['authKey', 'clientSecret', 'clientId']);
      setAuthenticationFormData(newFormData);
    }
  }, [authId, getApiAuthenticationByAuthId, props.isEdit, props.isModelOpen]);

  useEffect(() => {
    if (isGetApiAuthenticationByAuthIdSuccess && apiAuthenticationData && !isGetApiAuthenticationByAuthIdFetching) {
      const authFieldsMap = {
        [AuthenticationTypes.OAuth]: ['authKey'],
        [AuthenticationTypes.APIKey]: ['clientSecret', 'clientId']
      };

      let formData = { ...authenticationFormData };
      const fieldsToRemove = authFieldsMap[apiAuthenticationData.authenticationType];

      if (fieldsToRemove) {
        formData = removeFormFields(formData, fieldsToRemove);
      }
      setFieldSetting(formData, 'providerId', FieldSettingType.DISABLED, true);
      const initialState = {
        authId: apiAuthenticationData.authId,
        providerId: apiAuthenticationData.providerId,
        authKey: apiAuthenticationData.authKey,
        clientId: apiAuthenticationData.clientId,
        clientSecret: apiAuthenticationData.clientSecret,
        tokenEndpoint: apiAuthenticationData.tokenEndpoint,
        tokenExpires: apiAuthenticationData.tokenExpires,
      };

      // Remove the same fields from the initialState
      fieldsToRemove.forEach(field => {
        delete initialState[field];
      });
      const newFormData = {
        ...formData,
        initialState
      };
      setAuthenticationFormData(newFormData);
    }
  }, [isGetApiAuthenticationByAuthIdSuccess, apiAuthenticationData, isGetApiAuthenticationByAuthIdFetching]);

  useEffect(() => {
    if (isAddEditApiAuthenticationSuccess && addEditApiAuthenticationData) {
      props.onSuccess();
      ToastService.success(addEditApiAuthenticationData.errorMessage);
      props.onClose();
    }
  }, [isAddEditApiAuthenticationSuccess, addEditApiAuthenticationData]);

  const handleProviderChange = (field, dataField) => {
    if (dataField === 'providerId') {
      const selectedProvider = allAPIProvidersData.find((item) => item.providerId === field.value);
      let newFormData = { ...addEditApiAuthenticationFormData };

      const authFieldsMap = {
        [AuthenticationTypes.OAuth]: ['authKey'],
        [AuthenticationTypes.APIKey]: ['clientSecret', 'clientId']
      };

      const fieldsToRemove = authFieldsMap[selectedProvider.authenticationType];
      if (fieldsToRemove) {
        newFormData = removeFormFields(newFormData, fieldsToRemove);
      }

      setAuthenticationFormData(newFormData);
    }
  };

  const handleAPIAuthentication = () => {
    const formData = apiAuthenticationRef.current.getFormData();
    if (formData) {
      const requestData = {
        ...formData,
        providerId: typeof formData.providerId === "object" ? formData.providerId.value : formData.providerId,
        ...(authId && { authId }),
      };
      addEditApiAuthentication(requestData);
    }
  };

  const onResetData = () => {
    let formData = { ...addEditApiAuthenticationFormData };
    setFieldSetting(formData, 'providerId', FieldSettingType.DISABLED, false);
    onResetForm(formData, setAuthenticationFormData, null);
  };


  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onResetData,
  }));

  const formActionHandler = {
    DDL_CHANGED: handleProviderChange,
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row vertical-form">
              <FormCreator
                ref={apiAuthenticationRef}
                config={authenticationFormData}
                // {...authenticationFormData}
                onActionChange={formActionHandler}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText={props.isEdit ? "Update" : "Save"}
                onClick={handleAPIAuthentication}
                isLoading={isAddEditApiAuthenticationLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={props.onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditApiAuthentication;
