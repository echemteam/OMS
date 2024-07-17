
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { addEditApiParameterFormData } from "../config/ApiParameter.data";
import { ApiParametersDataTypes } from "../../../../utils/Enums/commonEnums";
import { useAddEditApiParameterMutation, useLazyGetAllAPIEndpointsQuery, useLazyGetApiParameterByParameterIdQuery } from "../../../../app/services/apiParametersAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { useState ,useRef ,useEffect} from "react";


const AddEditApiParameters = (props) => {
  const apiParameterRef = useRef();
   const parameterId = props.initData.parameterId;
  const [apiParameterFormData, setApiParameterFormData] = useState(addEditApiParameterFormData);
  const [getAllAPIEndpoints,{ isSuccess: isGetAllAPIEndpointsSuccess, data: isGetAllAPIEndpointsData }, ] = useLazyGetAllAPIEndpointsQuery();
  const [getApiParameterByParameterId,{ isFetching: isGetApiParameterByParameterIdFetching, isSuccess: isGetApiParameterByParameterIdSuccess, data: GetApiParameterByParameterIdData,},] = useLazyGetApiParameterByParameterIdQuery();

  const [addEditApiParameter,{  isLoading: isAddEditApiParameterLoading,isSuccess: isAddEditApiParameterSucess,data: allAddEditApiParameterData,}, ] = useAddEditApiParameterMutation();
  useEffect(() => {

    if ( !isGetApiParameterByParameterIdFetching && isGetApiParameterByParameterIdSuccess &&GetApiParameterByParameterIdData ) {
      const newFrom = { ...apiParameterFormData };
      newFrom.initialState = {
        endpointId: GetApiParameterByParameterIdData.endpointId,
        parameterId: GetApiParameterByParameterIdData.parameterId,
        name: GetApiParameterByParameterIdData.name,
        dataType: GetApiParameterByParameterIdData.dataType,
        defaultValue: GetApiParameterByParameterIdData.defaultValue,
        isRequired: GetApiParameterByParameterIdData.isRequired,
      };
      setApiParameterFormData(newFrom);
    }
  }, [isGetApiParameterByParameterIdFetching, isGetApiParameterByParameterIdSuccess,GetApiParameterByParameterIdData ]);

  useEffect(() => {
    if (parameterId && props.isEdit) {
      getApiParameterByParameterId(parameterId);
    }
  }, [parameterId,props.isEdit]);



  useEffect(() => {
    if (isAddEditApiParameterSucess && allAddEditApiParameterData) {
      onResetForm(addEditApiParameterFormData, setApiParameterFormData, null);
      props.onSuccess();
      ToastService.success(allAddEditApiParameterData.errorMessage);
      props.onClose();
    }
  }, [isAddEditApiParameterSucess, allAddEditApiParameterData]);

  const handleResetAndClose = () => {
    onResetForm(addEditApiParameterFormData, setApiParameterFormData, null);
    props.onClose();
  };

  useEffect(() => {
    const dropdownField = addEditApiParameterFormData.formFields.find((item) => item.dataField === "dataType" );
    dropdownField.fieldSetting.options = Object.entries(ApiParametersDataTypes).map(([key, value]) => ({
        label: key,
        value:value ,
      })
    );
  }, []);

  useEffect(() => {
    getAllAPIEndpoints();
  }, []);
  useEffect(() => {
    if (isGetAllAPIEndpointsSuccess && isGetAllAPIEndpointsData) {
      const getData = isGetAllAPIEndpointsData.map((item) => ({
        value: item.endpointId,
        label: item.name,
      }));
      const dropdownField = apiParameterFormData.formFields.find(
        (item) => item.dataField === "endpointId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllAPIEndpointsSuccess, isGetAllAPIEndpointsData]);

  const handleAddEditAPIParameters = () => {
  
    const formData = apiParameterRef.current.getFormData();
    if (formData && !parameterId) {
      let request = {
        ...formData,
        endpointId: formData.endpointId.value,
        dataType: formData.dataType.value,
      };
      addEditApiParameter(request);
    } else if (formData && parameterId) {
      let requestData = {
        ...formData,
        parameterId: parameterId,
        endpointId:
          formData.endpointId && typeof formData.endpointId === "object"
            ? formData.endpointId.value
            : formData.endpointId,
        dataType:
          formData.dataType && typeof formData.dataType === "object"
            ? formData.dataType.value
            : formData.dataType,
      };
      addEditApiParameter(requestData);
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12 horizontal-form">
            <div className="row vertical-form">
              <FormCreator
                ref={apiParameterRef}
                config={apiParameterFormData}
                {...apiParameterFormData}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText={props.isEdit ? "Update" : "Save"}
                onClick={handleAddEditAPIParameters}
               isLoading={isAddEditApiParameterLoading}
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
export default AddEditApiParameters;
