import { useRef,useState,useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationShippingChargesFormData } from "./config/OrganizationShippingCharges.data";
import { useAddEditOrganizationShippingChargesMutation, useLazyGetOrganizationShippingChargesQuery } from "../../../../app/services/organizationAPI";

const OrganizationShippingChargesDetail=()=>{
    const organizationShippingChargesRef = useRef();
    const [organizationShippingChargesData, setOrganizationShippingChargesData] = useState(OrganizationShippingChargesFormData);
    const [addEditOrganizationShippingCharges, { isLoading: isAddEditOrganizationShippingChargesLoading, isSuccess: isAddEditOrganizationShippingChargesSuccess, data: isAddEditOrganizationShippingChargesData }] =useAddEditOrganizationShippingChargesMutation();
    const [getOrganizationShippingCharges, { isFetching: isGetOrganizationShippingChargesFetching, isSuccess: isGetOrganizationShippingChargesSuccess, data: isGetOrganizationShippingChargesData }] = useLazyGetOrganizationShippingChargesQuery();

    useEffect(() => {
        if (isAddEditOrganizationShippingChargesSuccess && isAddEditOrganizationShippingChargesData) {
          ToastService.success(isAddEditOrganizationShippingChargesData.errorMessage);
          getOrganizationShippingCharges();
        }
      }, [isAddEditOrganizationShippingChargesSuccess, isAddEditOrganizationShippingChargesData]);


    useEffect(()=>{
        getOrganizationShippingCharges();   
    },[])

      const handleAddEditShippingChargesDetail=()=>{

        let shippingChargesData = organizationShippingChargesRef.current.getFormData();
        const request={
            ...shippingChargesData,
            organizationShippingChargeId: shippingChargesData.organizationShippingChargeId,
            domesticOvernight:shippingChargesData.domesticOvernight,
            domesticSecondDay:shippingChargesData.domesticSecondDay,
            domesticGround:shippingChargesData.domesticGround,
            internationalPriority:shippingChargesData.internationalPriority,
            internationalEconomy:shippingChargesData.internationalEconomy,    

        }
            if(!shippingChargesData.organizationShippingChargeId && shippingChargesData){
                addEditOrganizationShippingCharges(request);
            }
            else if(shippingChargesData.organizationShippingChargeId && shippingChargesData ){
                addEditOrganizationShippingCharges(request);
            }
           
      }

    useEffect(() => {
        if (!isGetOrganizationShippingChargesFetching && isGetOrganizationShippingChargesSuccess && isGetOrganizationShippingChargesData) {
            let formData = { ...organizationShippingChargesData };
            formData.initialState = {
                ...isGetOrganizationShippingChargesData, 
            };
            setOrganizationShippingChargesData(formData);
        }
    }, [isGetOrganizationShippingChargesFetching, isGetOrganizationShippingChargesSuccess, isGetOrganizationShippingChargesData,]);


    return(<>
    
    <div className="row mt-2 add-address-form">
                <FormCreator config={organizationShippingChargesData}
                    ref={organizationShippingChargesRef}
                   {...organizationShippingChargesData}
   
                />       
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditShippingChargesDetail}
                         isLoading={isAddEditOrganizationShippingChargesLoading}
                    />
                </div>
            </div>
        </div>
    </>)
}
export default OrganizationShippingChargesDetail;