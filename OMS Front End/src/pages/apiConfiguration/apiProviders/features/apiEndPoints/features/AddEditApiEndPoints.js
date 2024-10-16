/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { addEditApiEndPointsFormData } from "../config/ApiEndPoints.data";
import ToastService from "../../../../../../services/toastService/ToastService";
import FormCreator from "../../../../../../components/FinalForms/FormCreator";
import Buttons from "../../../../../../components/ui/button/Buttons";
import { onResetForm } from "../../../../../../utils/FormFields/ResetForm/handleResetForm";
import { ApiEndPointMethods } from "../../../../../../utils/Enums/commonEnums";
import { useAddEditApiEndpointMutation, useLazyGetApiEndpointByEndpointIdQuery, } from "../../../../../../app/services/apiEndPointsAPI";
import { getFieldData } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";

const AddEditApiEndPoints = (props) => {
  const apiEndPointRef = useRef();
  const endpointId = props.initData.endpointId;
  const [endPointFormData, setEndPointFormData] = useState(addEditApiEndPointsFormData);

  const [getApiEndpointByEndpointId, { isFetching: isGetApiEndpointByEndpointIdFetching, isSuccess: isGetApiEndpointByEndpointIdSuccess, data: GetApiEndpointByEndpointIdData, },] = useLazyGetApiEndpointByEndpointIdQuery();
  const [addEditApiEndpoint, { isLoading: isAddEditApiEndPointLoading, isSuccess: isAddEditApiEndPointSuccess, data: allAddEditApiEndPointData, },] = useAddEditApiEndpointMutation();

  useEffect(() => {
    if (isGetApiEndpointByEndpointIdSuccess && GetApiEndpointByEndpointIdData && !isGetApiEndpointByEndpointIdFetching) {
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
  }, [isGetApiEndpointByEndpointIdSuccess, GetApiEndpointByEndpointIdData, isGetApiEndpointByEndpointIdFetching]);

  useEffect(() => {
    if (endpointId && props.isEdit) {
      getApiEndpointByEndpointId(endpointId);
    }
  }, [endpointId, props.isEdit]);

  useEffect(() => {
    if (isAddEditApiEndPointSuccess && allAddEditApiEndPointData) {
      if (allAddEditApiEndPointData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditApiEndPointData.errorMessage);
        return;
      }
      props.onSuccess();
      ToastService.success(allAddEditApiEndPointData.errorMessage);
      handleResetAndClose();
      props.onClose();
    }
  }, [isAddEditApiEndPointSuccess, allAddEditApiEndPointData]);

  useEffect(() => {
    if (props.isModelOpen && !props.isEdit) {
      let formData = { ...addEditApiEndPointsFormData };
      onResetForm(formData, setEndPointFormData, null);
    }
  }, [props.isModelOpen])

  const handleResetAndClose = () => {
    let formData = { ...addEditApiEndPointsFormData };
    onResetForm(formData, setEndPointFormData, null);
    props.onClose();
  };
  useEffect(() => {
    const dropdownField = getFieldData(addEditApiEndPointsFormData, 'method');
    dropdownField.fieldSetting.options = Object.entries(ApiEndPointMethods).map(([key, value]) => ({
      label: value,
      value: key,
    }));
  }, []);


  const handleAddEditAPIEndPoints = () => {
    const formData = apiEndPointRef.current.getFormData();
    if (formData && !endpointId) {
      let request = {
        ...formData,
        providerId: props.providerId,
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
        providerId: props.providerId,

      };
      addEditApiEndpoint(requestData);
    }
  };

  return (

    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="row vertical-form">
            <FormCreator ref={apiEndPointRef} config={endPointFormData} />
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

  );
};

AddEditApiEndPoints.propTypes = {
  providerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initData: PropTypes.shape({
    endpointId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  isEdit: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
export default AddEditApiEndPoints;
