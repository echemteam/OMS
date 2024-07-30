import { useRef,useState,useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationAccountingFormData } from "./config/OrganizationAccounting.data";
import { useAddEditOrganizationAccountingDetailsMutation, useLazyGetOrganizationAccountingDetailsQuery } from "../../../../app/services/organizationAPI";

const OrganizationAccountingDetail=()=>{
    const organizationAccountingRef = useRef();
    const [organizationAccountingData, setOrganizationAccountingData] = useState(OrganizationAccountingFormData);
    const [addEditOrganizationAccountingDetails, { isLoading: isAddEditOrganizationAccountingDetailsLoading, isSuccess: isAddEditOrganizationAccountingDetailsSuccess, data: isAddEditOrganizationAccountingDetailsData }] =useAddEditOrganizationAccountingDetailsMutation();
    const [getOrganizationAccountingDetails, { isFetching: isGetOrganizationAccountingDetailsFetching, isSuccess: isGetOrganizationAccountingDetailsSuccess, data: isGetOrganizationAccountingDetailsData }] = useLazyGetOrganizationAccountingDetailsQuery();

    useEffect(() => {
        if (isAddEditOrganizationAccountingDetailsSuccess && isAddEditOrganizationAccountingDetailsData) {
          ToastService.success(isAddEditOrganizationAccountingDetailsData.errorMessage);
          getOrganizationAccountingDetails();
        }
      }, [isAddEditOrganizationAccountingDetailsSuccess, isAddEditOrganizationAccountingDetailsData]);

    useEffect(()=>{
        getOrganizationAccountingDetails();
    },[])

      const handleAddEditAccountingDetail=()=>{

        let accountingData = organizationAccountingRef.current.getFormData();
        const request={
            ...accountingData,
            organizationAccountingDetailId: accountingData.organizationAccountingDetailId,
            creditLimit:accountingData.creditLimit,
           
        }
            if(!accountingData.organizationAccountingDetailId && accountingData){
                addEditOrganizationAccountingDetails(request);
            }
            else if(accountingData.organizationAccountingDetailId && accountingData ){
                addEditOrganizationAccountingDetails(request);
        }          
      }

    useEffect(() => {
        if (!isGetOrganizationAccountingDetailsFetching && isGetOrganizationAccountingDetailsSuccess && isGetOrganizationAccountingDetailsData) {
            let formData = { ...organizationAccountingData };
            formData.initialState = {
                ...isGetOrganizationAccountingDetailsData, 
            };
            setOrganizationAccountingData(formData);
        }
    }, [isGetOrganizationAccountingDetailsFetching, isGetOrganizationAccountingDetailsSuccess, isGetOrganizationAccountingDetailsData,]);


    return(<>
    
    <div className="row mt-2 add-address-form">
                <FormCreator config={organizationAccountingData}
                    ref={organizationAccountingRef}
                   {...organizationAccountingData}
   
                />
                
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                         onClick={handleAddEditAccountingDetail}
                         isLoading={isAddEditOrganizationAccountingDetailsLoading}
                    />
                </div>
            </div>
        </div>
    </>)
}
export default OrganizationAccountingDetail;