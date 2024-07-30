import { useRef,useState,useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationLogisticFormData } from "./config/OrganizationLogistic.data";
import { useAddEditOrganizationLogisticDetailsMutation, useLazyGetOrganizationLogisticDetailsQuery } from "../../../../app/services/organizationAPI";



const OrganizationLogisticDetail=()=>{
    const organizationLogisticRef = useRef();
    const [organizationLogisticData, setOrganizationLogisticData] = useState(OrganizationLogisticFormData);
    const [addEditOrganizationLogisticDetails, { isLoading: isAddEditOrganizationLogisticDetailsLoading, isSuccess: isAddEditOrganizationLogisticDetailsSuccess, data: isAddEditOrganizationLogisticDetailsData }] =useAddEditOrganizationLogisticDetailsMutation();
    const [getOrganizationLogisticDetails, { isFetching: isGetOrganizationLogisticDetailsFetching, isSuccess: isGetOrganizationLogisticDetailsSuccess, data: isGetOrganizationLogisticDetailsData }] = useLazyGetOrganizationLogisticDetailsQuery();

    useEffect(() => {
        if (isAddEditOrganizationLogisticDetailsSuccess && isAddEditOrganizationLogisticDetailsData) {
          ToastService.success(isAddEditOrganizationLogisticDetailsData.errorMessage);
        }
      }, [isAddEditOrganizationLogisticDetailsSuccess, isAddEditOrganizationLogisticDetailsData]);


    useEffect(()=>{
        getOrganizationLogisticDetails();
    },[])

      const handleAddEditLogisticDetail=()=>{

        let logisticData = organizationLogisticRef.current.getFormData();
        const request={
            ...logisticData,
            organizationLogisticDetailId:logisticData.organizationLogisticDetailId,
            fedExAccount:logisticData.fedExAccount,
            dHLAccount:logisticData.dHLAccount,
            uPSAccount:logisticData.uPSAccount,
            uSPSAccount:logisticData.uSPSAccount,

        }
            if(!logisticData.OrganizationLogisticDetailId && logisticData){
                addEditOrganizationLogisticDetails(request);
            }
            else if(logisticData.OrganizationLogisticDetailId && logisticData ){
                addEditOrganizationLogisticDetails(request);
            }
           
      }

    useEffect(() => {

        if (!isGetOrganizationLogisticDetailsFetching && isGetOrganizationLogisticDetailsSuccess && isGetOrganizationLogisticDetailsData) {
            let formData = { ...organizationLogisticData };
            formData.initialState = {
                ...formData,
                organizationLogisticDetailId:isGetOrganizationLogisticDetailsData.organizationLogisticDetailId,
                fedExAccount:isGetOrganizationLogisticDetailsData.fedExAccount,
                dHLAccount:isGetOrganizationLogisticDetailsData.dhlAccount,
                uPSAccount:isGetOrganizationLogisticDetailsData.upsAccount,
                uSPSAccount:isGetOrganizationLogisticDetailsData.uspsAccount,
            };
            setOrganizationLogisticData(formData);
        }
    }, [isGetOrganizationLogisticDetailsFetching, isGetOrganizationLogisticDetailsSuccess, isGetOrganizationLogisticDetailsData,]);


    return(<>
    
    <div className="row mt-2 add-address-form">
                <FormCreator config={organizationLogisticData}
                    ref={organizationLogisticRef}
                   {...organizationLogisticData}
   
                />
                
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditLogisticDetail}
                         isLoading={isAddEditOrganizationLogisticDetailsLoading}
                    />
                </div>
            </div>
        </div>
    </>)
}
export default OrganizationLogisticDetail;