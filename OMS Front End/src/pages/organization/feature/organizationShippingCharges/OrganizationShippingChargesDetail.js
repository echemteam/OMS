/* eslint-disable react-hooks/exhaustive-deps */
import { useRef,useState,useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationShippingChargesFormData } from "./config/OrganizationShippingCharges.data";
import { useAddEditOrganizationShippingChargesMutation, useLazyGetOrganizationShippingChargesQuery } from "../../../../app/services/organizationAPI";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";

const OrganizationShippingChargesDetail=()=>{
    const organizationShippingChargesRef = useRef();
    const [organizationShippingChargesData, setOrganizationShippingChargesData] = useState(OrganizationShippingChargesFormData);
    const [addEditOrganizationShippingCharges, { isLoading: isAddEditOrganizationShippingChargesLoading, isSuccess: isAddEditOrganizationShippingChargesSuccess, data: isAddEditOrganizationShippingChargesData }] =useAddEditOrganizationShippingChargesMutation();
    const [getOrganizationShippingCharges, { isFetching: isGetOrganizationShippingChargesFetching, isSuccess: isGetOrganizationShippingChargesSuccess, data: isGetOrganizationShippingChargesData }] = useLazyGetOrganizationShippingChargesQuery();
    const[shippingChargeId,setShippingChargeId]=useState(0);

    useEffect(() => {
        if (isAddEditOrganizationShippingChargesSuccess && isAddEditOrganizationShippingChargesData) {
          ToastService.success(isAddEditOrganizationShippingChargesData.errorMessage);
          getOrganizationShippingCharges();
        }
      }, [isAddEditOrganizationShippingChargesSuccess, isAddEditOrganizationShippingChargesData]);

    useEffect(()=>{
        getOrganizationShippingCharges();   
    },[getOrganizationShippingCharges])

      const handleAddEditShippingChargesDetail=()=>{
         let shippingChargesData = organizationShippingChargesRef.current.getFormData();
        if(shippingChargesData){
                const request={
                    ...shippingChargesData,
                    organizationShippingChargeId: shippingChargeId,
                    domesticOvernight:shippingChargesData?.domesticOvernight,
                    domesticSecondDay:shippingChargesData?.domesticSecondDay,
                    domesticGround:shippingChargesData?.domesticGround,
                    internationalPriority:shippingChargesData?.internationalPriority,
                    internationalEconomy:shippingChargesData?.internationalEconomy,    
        
                }
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
            setShippingChargeId(isGetOrganizationShippingChargesData.organizationShippingChargeId);
        }
    }, [isGetOrganizationShippingChargesFetching, isGetOrganizationShippingChargesSuccess, isGetOrganizationShippingChargesData,]);

    if (isGetOrganizationShippingChargesFetching) {
        return <div><DataLoader /></div>; // Replace with a proper loading spinner or component
    }

    return(
    
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
    )
}
export default OrganizationShippingChargesDetail;