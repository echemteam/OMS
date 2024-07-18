/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";


import { useState } from "react";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { addEditApiAuthenticationFormData } from "../config/ApiAuthentication.data";
import { useLazyGetAllAPIProvidersQuery } from "../../../../app/services/apiEndPointsAPI";
import { useEffect } from "react";
import { setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { useAddEditApiAuthenticationMutation, useLazyGetApiAuthenticationByAuthIdQuery } from "../../../../app/services/apiAuthenticationAPI";
import { AuthenticationTypes } from "../../../../utils/Enums/commonEnums";

const AddEditApiAuthentication = (props) => {
  const apiAuthenticationRef = useRef();
  const authId = props.initData.authId;
   const [authenticationFormData, setAuthenticationFormData] = useState(addEditApiAuthenticationFormData);
  //  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
   const [getAllAPIProviders,{ isSuccess: isgetAllAPIProvidersSuccess, data: isgetAllAPIProvidersData }, ] = useLazyGetAllAPIProvidersQuery();
   const [addEditApiAuthentication,{  isLoading: isAddEditApiAuthenticationLoading,isSuccess: isAddEditApiAuthenticationSucess,data: allAddEditApiAuthenticationData,}, ] = useAddEditApiAuthenticationMutation();
   const [getApiAuthenticationByAuthId,{ isFetching: isGetApiAuthenticationByAuthIdFetching, isSuccess: isGetApiAuthenticationByAuthIdSuccess, data: GetApiAuthenticationByAuthIdData,},] = useLazyGetApiAuthenticationByAuthIdQuery();
   
   useEffect(()=>{
    
    let newFormData = { ...authenticationFormData };
    newFormData = removeFormFields(addEditApiAuthenticationFormData, ['authKey','clientSecret','clientId']);
    setAuthenticationFormData(newFormData);
    getAllAPIProviders();
},[])

   useEffect(() => {
    if (isgetAllAPIProvidersSuccess && isgetAllAPIProvidersData) {

      setDropDownOptionField(isgetAllAPIProvidersData, 'providerId', 'name', authenticationFormData, 'providerId');
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isgetAllAPIProvidersSuccess, isgetAllAPIProvidersData]);
  useEffect(() => {
 
    if (authId && props.isEdit) {
      getApiAuthenticationByAuthId(authId);
    }
  }, [authId ,props.isEdit]);

  useEffect(() => {

    if ( isGetApiAuthenticationByAuthIdSuccess && GetApiAuthenticationByAuthIdData && !isGetApiAuthenticationByAuthIdFetching ) {
      const newFrom = { ...authenticationFormData };
      newFrom.initialState = {
     authId:GetApiAuthenticationByAuthIdData.authId,
        providerId: GetApiAuthenticationByAuthIdData.providerId,
        authKey: GetApiAuthenticationByAuthIdData.authKey,
        clientId: GetApiAuthenticationByAuthIdData.clientId,
        clientSecret: GetApiAuthenticationByAuthIdData.clientSecret,
        tokenEndpoint: GetApiAuthenticationByAuthIdData.tokenEndpoint,
        tokenExpires: GetApiAuthenticationByAuthIdData.tokenExpires,
      };
      setAuthenticationFormData(newFrom);
    }
  }, [ isGetApiAuthenticationByAuthIdSuccess,GetApiAuthenticationByAuthIdData,isGetApiAuthenticationByAuthIdFetching,  ]);

  useEffect(() => {
    if (isAddEditApiAuthenticationSucess && allAddEditApiAuthenticationData) {
      onResetForm(addEditApiAuthenticationFormData, setAuthenticationFormData, null);
     props.onSuccess();
      ToastService.success(allAddEditApiAuthenticationData.errorMessage);
     props.onClose();
    }
  }, [isAddEditApiAuthenticationSucess, allAddEditApiAuthenticationData]);


const handleProviderChange = (field, value) => {
  const selectedProvider = isgetAllAPIProvidersData.find(item => item.providerId === field.value);
  let newFormData = { ...authenticationFormData };

  if (selectedProvider.authenticationType === AuthenticationTypes.OAuth) {
    newFormData = removeFormFields(addEditApiAuthenticationFormData, ['authKey']);
   
  } else if (selectedProvider.authenticationType === AuthenticationTypes.APIKey) {
    newFormData = removeFormFields(addEditApiAuthenticationFormData, ['clientSecret', 'clientId']);
    
  }

  setAuthenticationFormData(newFormData);
  // setShouldRerenderFormCreator((prevState) => !prevState);
};

const handleAPIAuthentication = () => {
  const formData = apiAuthenticationRef.current.getFormData();
  if (formData && !authId) {
    let request = {
      ...formData,
      providerId: formData.providerId.value,
    
    };
    addEditApiAuthentication(request);
  } 
  else if (formData && authId) {
    let requestData = {
      ...formData,
      authId: authId,
      providerId:
      formData.providerId && typeof formData.providerId === "object"
        ? formData.providerId.value
        : formData.providerId,
      
    };
    addEditApiAuthentication(requestData);
  }
};
const handleResetAndClose = () => {
  onResetForm(addEditApiAuthenticationFormData, setAuthenticationFormData, null);
  props.onClose();
};

const formActionHandler={
  DDL_CHANGED: handleProviderChange
}
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12 horizontal-form">
            <div className="row vertical-form">
              <FormCreator 
    
                ref={apiAuthenticationRef}
                config={authenticationFormData}
                {...authenticationFormData}
                onActionChange={formActionHandler}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText= {props.isEdit ? "Update" : "Save"}
                 onClick={handleAPIAuthentication}
                 isLoading={isAddEditApiAuthenticationLoading}
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
export default AddEditApiAuthentication;
