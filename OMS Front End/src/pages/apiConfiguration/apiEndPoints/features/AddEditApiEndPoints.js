import { useRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { addEditApiEndPointsFormData } from "../config/ApiEndPoints.data";
import { ApiEndPointMethods } from "../../../../utils/Enums/commonEnums";
import { useEffect } from "react";
import {
  useAddEditApiEndpointMutation,
  useLazyGetAllAPIProvidersQuery,
  useLazyGetApiEndpointByEndpointIdQuery,
} from "../../../../app/services/apiEndPointsAPI";
import { useState } from "react";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";

const AddEditApiEndPoints = (props) => {
  const apiEndPointRef = useRef();
  const endpointId = props.initData.endpointId;
  const [getAllAPIProviders,{ isSuccess: isgetAllAPIProvidersSuccess, data: isgetAllAPIProvidersData }, ] = useLazyGetAllAPIProvidersQuery();
  const [getApiEndpointByEndpointId,{ isFetching: isGetApiEndpointByEndpointIdFetching, isSuccess: isGetApiEndpointByEndpointIdSuccess, data: GetApiEndpointByEndpointIdData,},] = useLazyGetApiEndpointByEndpointIdQuery();
  const [endPointFormData, setEndPointFormData] = useState( addEditApiEndPointsFormData);
  const [addEditApiEndpoint,{  isLoading: isAddEditApiEndPointLoading,isSuccess: isAddEditApiEndPointSucess,data: allAddEditApiEndPointData,}, ] = useAddEditApiEndpointMutation();
  useEffect(() => {
    if ( isGetApiEndpointByEndpointIdSuccess &&GetApiEndpointByEndpointIdData &&!isGetApiEndpointByEndpointIdFetching ) {
      const newFrom = { ...endPointFormData };
      newFrom.initialState = {
        endpointId: GetApiEndpointByEndpointIdData.endpointId,
        providerId: GetApiEndpointByEndpointIdData.providerId,
        name: GetApiEndpointByEndpointIdData.endpointName,
        path: GetApiEndpointByEndpointIdData.path,
        method: GetApiEndpointByEndpointIdData.method,
        description: GetApiEndpointByEndpointIdData.description,
      };
      setEndPointFormData(newFrom);
    }
  }, [isGetApiEndpointByEndpointIdSuccess,GetApiEndpointByEndpointIdData,isGetApiEndpointByEndpointIdFetching]);

  useEffect(() => {
    if (endpointId && props.isEdit) {
      getApiEndpointByEndpointId(endpointId);
    }
  }, [endpointId ,props.isEdit]);

  useEffect(() => {
    if (isAddEditApiEndPointSucess && allAddEditApiEndPointData) {
      onResetForm(addEditApiEndPointsFormData, setEndPointFormData, null);
      props.onSuccess();
      ToastService.success(allAddEditApiEndPointData.errorMessage);
      props.onClose();
    }
  }, [isAddEditApiEndPointSucess, allAddEditApiEndPointData]);

  const handleResetAndClose = () => {
    onResetForm(addEditApiEndPointsFormData, setEndPointFormData, null);
    props.onClose();
  };

  useEffect(() => {
    const dropdownField = addEditApiEndPointsFormData.formFields.find((item) => item.dataField === "method" );
    dropdownField.fieldSetting.options = Object.entries(ApiEndPointMethods).map(([key, value]) => ({
        label: value,
        value: key,
      })
    );
  }, []);

  useEffect(() => {
    getAllAPIProviders();
  }, []);
  useEffect(() => {
    if (isgetAllAPIProvidersSuccess && isgetAllAPIProvidersData) {
      const getData = isgetAllAPIProvidersData.map((item) => ({
        value: item.providerId,
        label: item.name,
      }));
      const dropdownField = endPointFormData.formFields.find(
        (item) => item.dataField === "providerId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [isgetAllAPIProvidersSuccess, isgetAllAPIProvidersData]);

  const handleAddEditAPIEndPoints = () => {
    const formData = apiEndPointRef.current.getFormData();
    if (formData && !endpointId) {
      let request = {
        ...formData,
        providerId: formData.providerId.value,
        method: formData.method.value,
      };
      addEditApiEndpoint(request);
    } else if (formData && endpointId) {
      let requestData = {
        ...formData,
        endpointId: endpointId,
        method:
          formData.method && typeof formData.method === "object"
            ? formData.method.value
            : formData.method,
        providerId:
          formData.providerId && typeof formData.providerId === "object"
            ? formData.providerId.value
            : formData.providerId,
      };
      addEditApiEndpoint(requestData);
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12 horizontal-form">
            <div className="row vertical-form">
              <FormCreator
                ref={apiEndPointRef}
                config={endPointFormData}
                {...endPointFormData}
                // onFormDataUpdate={handleFormDataChange}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText={props.isEdit ? "Update" : "Save"}
                onClick={handleAddEditAPIEndPoints}
                isLoading={isAddEditApiEndPointLoading}
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
export default AddEditApiEndPoints;
