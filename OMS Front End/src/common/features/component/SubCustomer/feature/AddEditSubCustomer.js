/* eslint-disable react-hooks/exhaustive-deps */
import { useImperativeHandle, useState,useRef,useEffect } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../components/ui/button/Buttons";
import { SubCustomerFormData } from "../config/SubCustomer.data";
import PropTypes from "prop-types";
import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import ToastService from "../../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";
import { useAddSubCustomerMutation, useLazyGetAllApproveCustomerForLinkingQuery } from "../../../../../app/services/customerSubCustomerAPI";

const AddEditSubCustomer = (props) => {

  const subcustomerRef = useRef();
  const [subCustomerFormData, setSubCustomerFormData] = useState(SubCustomerFormData);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [getLinkCustomer, { isSuccess: isGetLinkCustomerSuccess, data: isGetLinkCustomerData }] = useLazyGetAllApproveCustomerForLinkingQuery();
  const [addSubCustomer, { isLoading: isAddSubCustomerLoading, isSuccess: isAddSubCustomerSuccess, data: isAddSubCustomerData }] = useAddSubCustomerMutation();

  useEffect(() => {
    if (isGetLinkCustomerSuccess && isGetLinkCustomerData) {
      setDropDownOptionField(isGetLinkCustomerData, 'customerId', 'name', subCustomerFormData, 'customerId');
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetLinkCustomerSuccess, isGetLinkCustomerData]);

  useEffect(() => {
    getAllLinkCustomer();
  }, [props.customerId]);

  const getAllLinkCustomer = () => {
    if (props.customerId > 0) {
      getLinkCustomer(props.customerId);
    }
  }

  useEffect(() => {
    if (isAddSubCustomerSuccess && isAddSubCustomerData) {
      props.onSuccess()
      ToastService.success(isAddSubCustomerData.errorMessage);
      onResetForm(SubCustomerFormData, setSubCustomerFormData, null);
      getAllLinkCustomer();
    }
  }, [isAddSubCustomerSuccess, isAddSubCustomerData]);

  const onhandleEditSubcustomer = () => {
    const formData = subcustomerRef.current.getFormData();

    if (formData && !formData.subCompanyMainCompanyId) {
      const customerIdList = formData.customerId.map((item) => ({ customerId: item }));
      let subCustomerId = customerIdList.map((item) => item.customerId).join(",");
      const request = {
        ...formData,
        customerId: props.customerId,
        subCustomerId: subCustomerId,
      }
      addSubCustomer(request);
    }
  }

  useImperativeHandle(props.getLinkCustomerRef, () => ({
    callChildFunction: getAllLinkCustomer
  }));

  return (
    <div className="row">

      <FormCreator
        config={subCustomerFormData}
        ref={subcustomerRef}
        key={shouldRerenderFormCreator}
        {...subCustomerFormData}
      />
      <div className="col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mt-3">
        <Buttons
          buttonTypeClassName="theme-button"
          buttonText="Assign"
          onClick={onhandleEditSubcustomer}
          isLoading={isAddSubCustomerLoading}
        />
      </div>
    </div>
  )
}

AddEditSubCustomer.propTypes = {
  customerId: PropTypes.number.isRequired,  
  onSuccess: PropTypes.func.isRequired,
  getLinkCustomerRef: PropTypes.object.isRequired,  
};
export default AddEditSubCustomer;