/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../components/ui/button/Buttons";
import { SubCustomerFormData } from "../config/SubCustomer.data";
import { useRef } from "react";

import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useEffect } from "react";
import ToastService from "../../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";
import { useAddSubCustomerMutation, useLazyGetAllSubCustomerQuery } from "../../../../../app/services/customerSubCustomerAPI";

const AddEditSubCustomer=(props)=>{

    const subcustomerRef=useRef();
    const [subCustomerFormData, setSubCustomerFormData] = useState(SubCustomerFormData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    const [getAllSubCustomer, { isFetching: isGetAllSubCustomerFetching, isSuccess: isGetAllSubCustomerSuccess, data: isGetAllSubCustomerData }] = useLazyGetAllSubCustomerQuery();
    const [addSubCustomer, { isLoading: isAddSubCustomerLoading, isSuccess: isAddSubCustomerSuccess, data: isAddSubCustomerData }] = useAddSubCustomerMutation();
    useEffect(() => {
      
      if (!isGetAllSubCustomerFetching && isGetAllSubCustomerSuccess && isGetAllSubCustomerData) {
        
        setDropDownOptionField(isGetAllSubCustomerData, 'customerId', 'name', subCustomerFormData, 'customerId');
        setShouldRerenderFormCreator((prevState) => !prevState);
      }
    }, [isGetAllSubCustomerFetching && isGetAllSubCustomerSuccess, isGetAllSubCustomerData]);

    useEffect(()=>{
      getAllSubCustomer(props?.isSubCustomer);
    },[])
  
    useEffect(() => {
      if (isAddSubCustomerSuccess && isAddSubCustomerData) {
       props.onSuccess()
        ToastService.success(isAddSubCustomerData.errorMessage);
        onResetForm(SubCustomerFormData, setSubCustomerFormData, null);
      }
    }, [isAddSubCustomerSuccess, isAddSubCustomerData]);
  
const onhandleEditSubcustomer=()=>{
  const formData=subcustomerRef.current.getFormData();

  if(formData && !formData.subCompanyMainCompanyId){
    const customerIdList = formData.customerId.map((item) => ({ customerId: item }));
    let subCustomerId = customerIdList.map((item) => item.customerId).join(",");
    const request={
    ...formData,
    customerId:props.customerId,
    subCustomerId:subCustomerId,
    }
    addSubCustomer(request);
  }
}

    return(<>
        <div className="row">
    
        <FormCreator
         config={subCustomerFormData}
          ref={subcustomerRef}
          key={shouldRerenderFormCreator}
         {...subCustomerFormData}
         />
            <div className="col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mt-4">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Assign"
                onClick={onhandleEditSubcustomer}
                isLoading={isAddSubCustomerLoading}
              />
            </div>
    </div>
    </>)
   }
   export default AddEditSubCustomer;