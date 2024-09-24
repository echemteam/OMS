/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationBankFormData } from "./config/OrganizationBank.data";
import { useAddEditOrganizationBankDetailsMutation, useLazyGetOrganizationBankDetailsQuery } from "../../../../app/services/organizationAPI";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { useSelector } from "react-redux";


const OrganizationBankDetail = (isEditablePage) => {
    const organizationBankRef = useRef();
    const [organizationBankData, setOrganizationBankData] = useState(OrganizationBankFormData);
    const [addEditOrganizationBankDetails, { isLoading: isAddEditOrganizationBankDetailsLoading, isSuccess: isAddEditOrganizationBankDetailsSuccess, data: isAddEditOrganizationBankDetailsData }] = useAddEditOrganizationBankDetailsMutation();
    const [getOrganizationBankDetails, { isFetching: isGetOrganizationBankDetailsFetching, isSuccess: isGetOrganizationBankDetailsSuccess, data: isGetOrganizationBankDetailsData }] = useLazyGetOrganizationBankDetailsQuery();
    const [bankDetailId, setBankDetailId] = useState(0);
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const { formSetting } = OrganizationBankFormData;
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
        if (isAddEditOrganizationBankDetailsSuccess && isAddEditOrganizationBankDetailsData) {
            ToastService.success(isAddEditOrganizationBankDetailsData.errorMessage);
            getOrganizationBankDetails();
        }
    }, [isAddEditOrganizationBankDetailsSuccess, isAddEditOrganizationBankDetailsData]);


    useEffect(() => {
        getOrganizationBankDetails();
    }, [])

    const handleAddEditBankDetail = () => {
        let bankData = organizationBankRef.current.getFormData();
        if (bankData) {
            const request = {
                ...bankData,
                organizationBankDetailId: bankDetailId,
                beneficiaryName: bankData?.beneficiaryName,
                checkingAccountNumber: bankData?.checkingAccountNumber,
                routingAccountNumber: bankData?.routingAccountNumber,
                swiftCode: bankData?.swiftCode,
                bankAddress: bankData?.bankAddress,
                bankBranch: bankData?.bankBranch,
            }
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
            setBankDetailId(isGetOrganizationBankDetailsData.organizationBankDetailId);
        }
    }, [isGetOrganizationBankDetailsFetching, isGetOrganizationBankDetailsSuccess, isGetOrganizationBankDetailsData,]);

    if (isGetOrganizationBankDetailsFetching) {
        return <div><DataLoader /></div>; // Replace with a proper loading spinner or component
    }

    return (

        <div className="row mt-2 add-address-form">
            <h4 className="organization-tab-title">Bank Details</h4>
            <FormCreator config={organizationBankData}
                ref={organizationBankRef}
                {...organizationBankData}

            />
             {isEditablePage ?
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditBankDetail}
                        isLoading={isAddEditOrganizationBankDetailsLoading}
                        isDisable={isButtonDisable}
                    />
                </div>
            </div>:null}
        </div>
    )
}
export default OrganizationBankDetail;