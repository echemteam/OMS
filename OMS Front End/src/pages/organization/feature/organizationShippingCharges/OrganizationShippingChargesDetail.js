/* eslint-disable react-hooks/exhaustive-deps */
import { useRef,useState,useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationShippingChargesFormData } from "./config/OrganizationShippingCharges.data";
import { useAddEditOrganizationShippingChargesMutation, useLazyGetOrganizationShippingChargesQuery } from "../../../../app/services/organizationAPI";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { useSelector } from "react-redux";

const OrganizationShippingChargesDetail=(isEditablePage)=>{
    const organizationShippingChargesRef = useRef();
    const [organizationShippingChargesData, setOrganizationShippingChargesData] = useState(OrganizationShippingChargesFormData);
    const [addEditOrganizationShippingCharges, { isLoading: isAddEditOrganizationShippingChargesLoading, isSuccess: isAddEditOrganizationShippingChargesSuccess, data: isAddEditOrganizationShippingChargesData }] =useAddEditOrganizationShippingChargesMutation();
    const [getOrganizationShippingCharges, { isFetching: isGetOrganizationShippingChargesFetching, isSuccess: isGetOrganizationShippingChargesSuccess, data: isGetOrganizationShippingChargesData }] = useLazyGetOrganizationShippingChargesQuery();
    const[shippingChargeId,setShippingChargeId]=useState(0);
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const { formSetting } = OrganizationShippingChargesFormData;
    const roles = useSelector((state) => state.auth.roles.roleName );

   
   useEffect(() => {
    if (isEditablePage) {
      if (roles?.includes("Admin")) {  
        setIsButtonDisable(false);
        formSetting.isViewOnly = false;
      } else {
        setIsButtonDisable(true);
        formSetting.isViewOnly = true;
      }
    }
  }, [isEditablePage, roles]);

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
        <h4 className="organization-tab-title">Shipping Charges</h4>
                <FormCreator config={organizationShippingChargesData}
                    ref={organizationShippingChargesRef}
                   {...organizationShippingChargesData}
   
                />   
            {isEditablePage ?    
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditShippingChargesDetail}
                         isLoading={isAddEditOrganizationShippingChargesLoading}
                         isDisable={isButtonDisable}
                    />
                </div>
            </div>:null}
        </div>
    )
}
export default OrganizationShippingChargesDetail;