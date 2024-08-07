/* eslint-disable react-hooks/exhaustive-deps */

import { useState ,useRef,useEffect} from "react";
import PropTypes from "prop-types";
import { addEditApiAuthenticationFormData } from "../config/ApiAuthentication.data";
import { removeFormFields } from "../../../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { setFieldSetting } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../../components/ui/button/Buttons";
import { AuthenticationTypes, FieldSettingType } from "../../../../../../utils/Enums/commonEnums";
import ToastService from "../../../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../../../utils/FormFields/ResetForm/handleResetForm";
import { useImperativeHandle } from "react";
import { useAddEditApiAuthenticationMutation, useLazyGetApiAuthenticationByAuthIdQuery,  } from "../../../../../../app/services/apiAuthenticationAPI";


const AddEditApiAuthentication = (props) => {
  const apiAuthenticationRef = useRef();
  const authId = props.authId;
  const [authenticationFormData, setAuthenticationFormData] = useState(addEditApiAuthenticationFormData);
  const [addEditApiAuthentication, { isLoading: isAddEditApiAuthenticationLoading, isSuccess: isAddEditApiAuthenticationSuccess, data: addEditApiAuthenticationData }] = useAddEditApiAuthenticationMutation();
  const [getApiAuthenticationByAuthId, { isFetching: isGetApiAuthenticationByAuthIdFetching, isSuccess: isGetApiAuthenticationByAuthIdSuccess, data: apiAuthenticationData }] = useLazyGetApiAuthenticationByAuthIdQuery();

  useEffect(() => {
    let newFormData = { ...addEditApiAuthenticationFormData }
    if (authId && props.isEdit) {
      setAuthenticationFormData(newFormData);
      getApiAuthenticationByAuthId(authId);
    }
    else {
      handlePageLoad();
    }
  }, [authId, getApiAuthenticationByAuthId, props.isEdit, props.isModelOpen]);

  useEffect(() => {
    if (isGetApiAuthenticationByAuthIdSuccess && apiAuthenticationData && !isGetApiAuthenticationByAuthIdFetching) {
      const authFieldsMap = {
        [AuthenticationTypes?.OAuth]: ['authKey'],
        [AuthenticationTypes?.APIKey]: ['clientSecret', 'clientId','tokenExpires','tokenEndpoint']
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

const handlePageLoad=() => {

    if (props.providerId) {
      const selectedProvider = props.providerData;
      let newFormData = { ...addEditApiAuthenticationFormData };

      const authFieldsMap = {
        [AuthenticationTypes.OAuth]: ['authKey'],
        [AuthenticationTypes.APIKey]: ['clientSecret', 'clientId','tokenExpires','tokenEndpoint']
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
        providerId: props.providerId,
        tokenExpires: formData.tokenExpires ? formData.tokenExpires :null,
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


  return (
     
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row vertical-form">
              <FormCreator
                ref={apiAuthenticationRef}
                config={authenticationFormData}
                 {...authenticationFormData}
            
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
     
  );
};

AddEditApiAuthentication.propTypes = {
  authId: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  isEdit: PropTypes.bool.isRequired,
  isModelOpen: PropTypes.bool.isRequired,
  providerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  providerData: PropTypes.shape({
    authenticationType: PropTypes.string.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  childRef: PropTypes.shape({
    current: PropTypes.shape({
      callChildFunction: PropTypes.func.isRequired,
    }),
  }).isRequired,
};
export default AddEditApiAuthentication;
