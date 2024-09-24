/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { OrganizationProfileManagementdata } from './config/OrganizationProfileManagement.data';
import Buttons from '../../../../components/ui/button/Buttons';
import FormCreator from '../../../../components/Forms/FormCreator';
import { useAddEditOrganizationProfileMutation, useLazyGetOrganizationProfileQuery } from '../../../../app/services/organizationAPI';
import ToastService from '../../../../services/toastService/ToastService';
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { securityKey } from '../../../../data/SecurityKey';
import { useSelector } from 'react-redux';


const OrganizationProfileManagement = ({isEditablePage,setCompanyName}) => {
    const organizationProfileRef = useRef();
    const [organizationProfileData, setOrganizationProfileData] = useState(OrganizationProfileManagementdata);
    const [addEditOrganization, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddEditOrganizationProfileMutation();
    const [getOrganizationProfile, { isFetching: isGetOrganizationProfileFetching, isSuccess: isGetOrganizationProfileSuccess, data: isGetOrganizationProfileData }] = useLazyGetOrganizationProfileQuery();
    const [profileId, setProfileId] = useState(0);
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const { formSetting } = OrganizationProfileManagementdata;
    const roles = useSelector((state) => state.auth.roles.roleName );

   
   useEffect(() => {
    if (isEditablePage) {
      if (roles?.includes("Developer")) {  
        setIsButtonDisable(false);
        formSetting.isViewOnly = false;
      } else {
        setIsButtonDisable(true);
        formSetting.isViewOnly = true;
      }
    }
  }, [isEditablePage, roles]);
    
    useEffect(() => {
        getOrganizationProfile()

    }, [])

    useEffect(() => {

        if (!isGetOrganizationProfileFetching && isGetOrganizationProfileSuccess && isGetOrganizationProfileData) {
            let formData = { ...organizationProfileData };
            formData.initialState = {
                organizationProfileId: isGetOrganizationProfileData.organizationProfileId,
                registeredName: isGetOrganizationProfileData.registeredName,
                dBAName: isGetOrganizationProfileData.dbaName,
                dateIncorporated: isGetOrganizationProfileData.dateIncorporated,
                nAICSCode: isGetOrganizationProfileData.naicsCode,
                eIN: isGetOrganizationProfileData.ein,
                tXTaxpayerNumber: isGetOrganizationProfileData.txTaxpayerNumber,
                sOSFileNumber: isGetOrganizationProfileData.sosFileNumber,
                webFileNumber: isGetOrganizationProfileData.webFileNumber,
                tWCTaxAccountNumber: isGetOrganizationProfileData.twcTaxAccountNumber,
            };
            setOrganizationProfileData(formData);
            setProfileId(isGetOrganizationProfileData.organizationProfileId);
            setCompanyName(isGetOrganizationProfileData.registeredName);

        }
    }, [isGetOrganizationProfileFetching, isGetOrganizationProfileSuccess, isGetOrganizationProfileData,]);

    useEffect(() => {
        if (isAddSuccess && isAddData) {
            ToastService.success(isAddData.errorMessage);
            getOrganizationProfile();
        }
    }, [isAddSuccess, isAddData]);

    const handleAddEdit = () => {
        let profileFormData = organizationProfileRef.current.getFormData();
        if (profileFormData) {
            let request = {
                ...profileFormData,
                organizationProfileId: profileId,
                registeredName: profileFormData.registeredName,
                dBAName: profileFormData.dBAName,
                dateIncorporated: profileFormData.dateIncorporated,
                nAICSCode: profileFormData.nAICSCode,
                eIN: profileFormData.eIN,
                tXTaxpayerNumber: profileFormData.tXTaxpayerNumber,
                sOSFileNumber: profileFormData.sOSFileNumber,
                webFileNumber: profileFormData.webFileNumber,
                tWCTaxAccountNumber: profileFormData.tWCTaxAccountNumber,
            }
            addEditOrganization(request)
        }
    }

    if (isGetOrganizationProfileFetching) {
        return <div><DataLoader /></div>; // Replace with a proper loading spinner or component
    }

    return (
        <div className="row mt-2 add-address-form">
            {/* <h4 className='organization-tab-title'>
                Organization Profile
            </h4> */}
            <FormCreator
                config={organizationProfileData}
                ref={organizationProfileRef}
            />

        {isEditablePage ?
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEdit}
                        isLoading={isAddLoading}
                        isDisable={isButtonDisable}
                    />
                </div>
            </div>
             : null}
        </div>
        
    );
};


export default OrganizationProfileManagement;
