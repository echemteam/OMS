/* eslint-disable react-hooks/exhaustive-deps */
import { useRef,useState ,useEffect} from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationBankFormData } from "./config/OrganizationBank.data";
import { useAddEditOrganizationBankDetailsMutation, useLazyGetOrganizationBankDetailsQuery } from "../../../../app/services/organizationAPI";


const OrganizationBankDetail=()=>{
    const organizationBankRef = useRef();
    const [organizationBankData, setOrganizationBankData] = useState(OrganizationBankFormData);
    const [addEditOrganizationBankDetails, { isLoading: isAddEditOrganizationBankDetailsLoading, isSuccess: isAddEditOrganizationBankDetailsSuccess, data: isAddEditOrganizationBankDetailsData }] =useAddEditOrganizationBankDetailsMutation();
    const [getOrganizationBankDetails, { isFetching: isGetOrganizationBankDetailsFetching, isSuccess: isGetOrganizationBankDetailsSuccess, data: isGetOrganizationBankDetailsData }] = useLazyGetOrganizationBankDetailsQuery();

    useEffect(() => {
        if (isAddEditOrganizationBankDetailsSuccess && isAddEditOrganizationBankDetailsData) {
          ToastService.success(isAddEditOrganizationBankDetailsData.errorMessage);
          getOrganizationBankDetails();
        }
      }, [isAddEditOrganizationBankDetailsSuccess, isAddEditOrganizationBankDetailsData]);


    useEffect(()=>{
        getOrganizationBankDetails();
    },[])

      const handleAddEditBankDetail=()=>{
        let bankData = organizationBankRef.current.getFormData();
        const request={
            ...bankData,
            organizationBankDetailId:bankData.organizationBankDetailId,
            beneficiaryName:bankData.beneficiaryName,
            checkingAccountNumber:bankData.checkingAccountNumber,
            routingAccountNumber:bankData.routingAccountNumber,
            swiftCode:bankData.swiftCode,
            bankAddress:bankData.bankAddress,
            bankBranch:bankData.bankBranch,

        }
            if(!bankData.organizationBankDetailId && bankData){
                addEditOrganizationBankDetails(request);
            }
            else if(bankData.organizationBankDetailId && bankData ){
                addEditOrganizationBankDetails(request);
            }
           
      }

    useEffect(() => {
   
        if (!isGetOrganizationBankDetailsFetching && isGetOrganizationBankDetailsSuccess && isGetOrganizationBankDetailsData) {
            let formData = { ...organizationBankData };
            formData.initialState = {
                ...isGetOrganizationBankDetailsData,
    
            };
            setOrganizationBankData(formData);
        }
    }, [isGetOrganizationBankDetailsFetching, isGetOrganizationBankDetailsSuccess, isGetOrganizationBankDetailsData,]);


    return(<>
    
    <div className="row mt-2 add-address-form">
                <FormCreator config={organizationBankData}
                    ref={organizationBankRef}
                   {...organizationBankData}
   
                />
                
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                          onClick={handleAddEditBankDetail}
                         isLoading={isAddEditOrganizationBankDetailsLoading}
            
                    />
                </div>
            </div>
        </div>
    </>)
}
export default OrganizationBankDetail;