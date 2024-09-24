/* eslint-disable react-hooks/exhaustive-deps */
import { useRef,useState,useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationOtherChargesFormData } from "./config/OrganizationOtherCharges.data";
import { useAddEditOrganizationOtherChargesMutation, useLazyGetOrganizationOtherChargesQuery } from "../../../../app/services/organizationAPI";
import { useLazyGetAllPaymentTermsQuery } from "../../../../app/services/customerSettingsAPI";
import { setDropDownOptionField } from '../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { useSelector } from "react-redux";

const OrganizationOtherChargesDetail=(isEditablePage)=>{
    const organizationOtherChargesRef = useRef();
    const [organizationOtherChargesData, setOrganizationOtherChargesData] = useState(OrganizationOtherChargesFormData);
    const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData, },] = useLazyGetAllPaymentTermsQuery();
    const [addEditOrganizationOtherCharges, { isLoading: isAddEditOrganizationOtherChargesLoading, isSuccess: isAddEditOrganizationOtherChargesSuccess, data: isAddEditOrganizationOtherChargesData }] =useAddEditOrganizationOtherChargesMutation();
    const [getOrganizationOtherCharges, { isFetching: isGetOrganizationOtherChargesFetching, isSuccess: isGetOrganizationOtherChargesSuccess, data: isGetOrganizationOtherChargesData }] = useLazyGetOrganizationOtherChargesQuery();
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    const [otherChargeId , setOtherChargeId ] = useState(0); 
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const { formSetting } = OrganizationOtherChargesFormData;
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
    
    useEffect(()=>{
        getAllPaymentTerms();
        getOrganizationOtherCharges();      
    },[])

    useEffect(() => {
        if (isAddEditOrganizationOtherChargesSuccess && isAddEditOrganizationOtherChargesData) {
          ToastService.success(isAddEditOrganizationOtherChargesData.errorMessage);
          getOrganizationOtherCharges();
        }
      }, [isAddEditOrganizationOtherChargesSuccess, isAddEditOrganizationOtherChargesData]);
    

    useEffect(() => {
        if (!isGetAllPaymentTermsFetching && isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
            setDropDownOptionField(isGetAllPaymentTermsData, "paymentTermId", "paymentTerm", OrganizationOtherChargesFormData, "paymentTermId");
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetAllPaymentTermsFetching, isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData]);



      const handleAddEditShippingChargesDetail=()=>{

        let otherChargesData = organizationOtherChargesRef.current.getFormData();
        if(otherChargesData){
        const request={
            ...otherChargesData,
            organizationOtherChargeId: otherChargeId,
            defaultPaymentTerms: otherChargesData?.paymentTermId.value,
            handlingFees:otherChargesData?.handlingFees,
            bankWireFees:otherChargesData?.bankWireFees,
            creditCardServiceFees:otherChargesData?.creditCardServiceFees,
            coldBoxFees:otherChargesData?.coldBoxFees,
            iTNFees:otherChargesData?.iTNFees,    

        }
          addEditOrganizationOtherCharges(request);
      }
    }
    useEffect(() => {
      
        if (!isGetOrganizationOtherChargesFetching && isGetOrganizationOtherChargesSuccess && isGetOrganizationOtherChargesData) {
            let formData = { ...organizationOtherChargesData };
            formData.initialState = {
                organizationOtherChargeId:isGetOrganizationOtherChargesData.organizationOtherChargeId,
                paymentTermId: isGetOrganizationOtherChargesData.defaultPaymentTerms,
                handlingFees:isGetOrganizationOtherChargesData.handlingFees,
                bankWireFees:isGetOrganizationOtherChargesData.bankWireFees,
                creditCardServiceFees:isGetOrganizationOtherChargesData.creditCardServiceFees,
                coldBoxFees:isGetOrganizationOtherChargesData.coldBoxFees,
                iTNFees:isGetOrganizationOtherChargesData.itnFees,
            };
            setOrganizationOtherChargesData(formData);
            setOtherChargeId(isGetOrganizationOtherChargesData.organizationOtherChargeId);
        }
    }, [isGetOrganizationOtherChargesFetching, isGetOrganizationOtherChargesSuccess, isGetOrganizationOtherChargesData,]);

    if (isGetOrganizationOtherChargesFetching) {
        return <div><DataLoader /></div>; // Replace with a proper loading spinner or component
    }

    return( 
    
    <div className="row mt-2 add-address-form">
        {/* <h4 className="organization-tab-title">Other Charges</h4> */}
                <FormCreator config={organizationOtherChargesData}
                    ref={organizationOtherChargesRef}
                   {...organizationOtherChargesData}
                   key={shouldRerenderFormCreator}
                />     
                 {isEditablePage ?  
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditShippingChargesDetail}
                         isLoading={isAddEditOrganizationOtherChargesLoading}
                         isDisable={isButtonDisable}
                    />
                </div>
            </div>:null}
        </div>
     )
}
export default OrganizationOtherChargesDetail;