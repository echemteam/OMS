/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../components/ui/button/Buttons";
import { SubCustomerFormData } from "../config/SubCustomer.data";
import { useRef } from "react";
import { useAddSubCompanyMainCompanyMutation, useLazyGetAllSubCompanyQuery } from "../../../../../app/services/customerSubCustomerAPI";
import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useEffect } from "react";
import ToastService from "../../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";

const AddEditSubCustomer=(props)=>{

    const subcustomerRef=useRef();
    const [subCustomerFormData, setSubCustomerFormData] = useState(SubCustomerFormData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    const [getAllSubCompany, { isFetching: isGetAllSubCompanyFetching, isSuccess: isGetAllSubCompanySuccess, data: isGetAllSubCompanyData }] = useLazyGetAllSubCompanyQuery();
    const [addSubCompanyMainCompany, { isLoading: isAddSubCompanyMainCompanyLoading, isSuccess: isAddSubCompanyMainCompanySuccess, data: isAddSubCompanyMainCompanyData }] = useAddSubCompanyMainCompanyMutation();
    useEffect(() => {
      if (!isGetAllSubCompanyFetching && isGetAllSubCompanySuccess && isGetAllSubCompanyData) {
        
        setDropDownOptionField(isGetAllSubCompanyData, 'customerId', 'name', subCustomerFormData, 'customerId');
        setShouldRerenderFormCreator((prevState) => !prevState);
      }
    }, [isGetAllSubCompanyFetching && isGetAllSubCompanySuccess, isGetAllSubCompanyData]);

    useEffect(()=>{
      getAllSubCompany(props?.isSubCompany);
    },[])
  
    useEffect(() => {
      if (isAddSubCompanyMainCompanySuccess && isAddSubCompanyMainCompanyData) {
       props.onSuccess()
       
        ToastService.success(isAddSubCompanyMainCompanyData.errorMessage);
        onResetForm(SubCustomerFormData, setSubCustomerFormData, null);
      }
    }, [isAddSubCompanyMainCompanySuccess, isAddSubCompanyMainCompanyData]);
  
const onhandleEditSubcustomer=()=>{
  const formData=subcustomerRef.current.getFormData();
 
  if(formData && !formData.subCompanyMainCompanyId){
    const customerIdList = formData.customerId.map((item) => ({ customerId: item }));
    let customerId = customerIdList.map((item) => item.customerId).join(",");
    const request={
    ...formData,
    mainCompanyId:props.customerId,
    subCompanyId:customerId,
    }
    addSubCompanyMainCompany(request);
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
                isLoading={isAddSubCompanyMainCompanyLoading}
              />
            </div>
    </div>
    </>)
   }
   export default AddEditSubCustomer;