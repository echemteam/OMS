/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { SMTPSettingsData } from './config/SMTPSettings.data';
import FormCreator from '../../../../components/Forms/FormCreator';
import Buttons from '../../../../components/ui/button/Buttons';
import { useAddEditSmtpSettingsMutation, useLazyGetSmtpSettingsQuery } from '../../../../app/services/organizationAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { decryptUrlData, encryptAES } from '../../../../services/CryptoService';
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';
import { useSelector } from 'react-redux';

const SMTPSettings = (isEditablePage) => {
    const smtpRef = useRef();
    const [smtpSettingData, setSmtpSettingData] = useState(SMTPSettingsData);
    const [addEditSmtpSetting, { isLoading: isAddEditSmtpSettingLoading, isSuccess: isAddEditSmtpSettingSuccess, data: isAddEditSmtpSettingData }] = useAddEditSmtpSettingsMutation();
    const [getSmtpSettings, { isFetching: isGetSmtpSettingsFetching, isSuccess: isGetSmtpSettingsSuccess, data: isGetSmtpSettingsData }] = useLazyGetSmtpSettingsQuery();
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const { formSetting } = SMTPSettingsData;
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
        getSmtpSettings();
    }, [])

    useEffect(() => {
        if (isAddEditSmtpSettingSuccess && isAddEditSmtpSettingData) {
            ToastService.success(isAddEditSmtpSettingData.errorMessage);
            getSmtpSettings();
        }
    }, [isAddEditSmtpSettingSuccess, isAddEditSmtpSettingData]);

    const handleAddEditSmtpSettings = () => {

        let data = smtpRef.current.getFormData();
        if (data) {
            let request = {
                ...data,
                emailProvider: encryptAES(data?.emailProvider),
                smtpServer: encryptAES(data?.smtpServer),
                smtpUserName: encryptAES(data?.smtpUserName),
                smtpPassword: encryptAES(data?.smtpPassword),
                smtpSettingId: data?.smtpSettingId ? data.smtpSettingId : 0
            }
            addEditSmtpSetting(request)
        }
    }

    useEffect(() => {
        if (!isGetSmtpSettingsFetching && isGetSmtpSettingsSuccess && isGetSmtpSettingsData) {

            let formData = { ...smtpSettingData };
            formData.initialState = {
                emailProvider: decryptUrlData(isGetSmtpSettingsData.emailProvider),
                smtpServer: decryptUrlData(isGetSmtpSettingsData.smtpServer),
                smtpPort: isGetSmtpSettingsData.smtpPort,
                smtpUserName: decryptUrlData(isGetSmtpSettingsData.smtpUserName),
                smtpPassword: decryptUrlData(isGetSmtpSettingsData.smtpPassword),
                useSsl: isGetSmtpSettingsData.useSsl,
                smtpSettingId: isGetSmtpSettingsData.smtpSettingId,

            };
            setSmtpSettingData(formData);

        }
    }, [isGetSmtpSettingsFetching, isGetSmtpSettingsSuccess, isGetSmtpSettingsData,]);

    if (isGetSmtpSettingsFetching) {
        return <div><DataLoader /></div>; // Replace with a proper loading spinner or component
    }

    return (

        <div className="row mt-2 add-address-form">
<h4 className="organization-tab-title">SMTP Settings</h4>
            <FormCreator config={smtpSettingData}
                ref={smtpRef}
                {...smtpSettingData}

            />
             {isEditablePage ?
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditSmtpSettings}
                        isLoading={isAddEditSmtpSettingLoading}
                        isDisable={isButtonDisable}
                    />
                </div>
            </div>:null}
        </div>
    )
}


export default SMTPSettings