/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { SMTPSettingsData } from './config/SMTPSettings.data';
import FormCreator from '../../../components/Forms/FormCreator';
import Buttons from '../../../components/ui/button/Buttons';
import { useAddEditSmtpSettingsMutation, useLazyGetSmtpSettingsBySmtpSettingIdQuery } from '../../../app/services/organizationAPI';
import ToastService from '../../../services/toastService/ToastService';
import { ErrorMessage } from '../../../data/appMessages';
import DataLoader from '../../../components/ui/dataLoader/DataLoader';
// import { onResetForm } from '../../../utils/FormFields/ResetForm/handleResetForm';

const SMTPSettings = (props) => {
    const smtpRef = useRef();
    const [smtpSettingData, setSmtpSettingData] = useState(SMTPSettingsData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    const [addEditSmtpSetting, { isLoading: isAddEditSmtpSettingLoading, isSuccess: isAddEditSmtpSettingSuccess, data: isAddEditSmtpSettingData }] = useAddEditSmtpSettingsMutation();
    const [getSmtpSettingId, { isFetching: isGetSmtpSettingIdFetching, isSuccess: isgetSmtpSettingIdSuccess, data: isGetSmtpSettingIdData }] = useLazyGetSmtpSettingsBySmtpSettingIdQuery();

    useEffect(() => {
        handleResponse(isAddEditSmtpSettingSuccess, isAddEditSmtpSettingData);
    }, [isAddEditSmtpSettingSuccess, isAddEditSmtpSettingData]);

    const handleResponse = (success, data) => {
        if (success && data) {
            handleAddResponse(success, data);
        }
    };

    const handleAddResponse = (isSuccess, responseData) => {
        if (isSuccess && responseData) {
            if (responseData.errorMessage.includes("exists")) {
                ToastService.warning(responseData.errorMessage);
                return;
            }
            ToastService.success(responseData.errorMessage);
            // setOrganizationId(responseData.keyValue)
            props.onHandleSmtp(responseData.keyValue)
        }
    }

    const handleAddEditSmtpSettings = () => {
        let data = smtpRef.current.getFormData();
        if (data) {
            let request = {
                ...data,
                organizationId: props.organizationId ? props.organizationId : data.organizationId,
                smtpSettingId: props.smtpSettingId ? props.smtpSettingId : data.smtpSettingId
            }
            if (props.organizationId > 0) {
                addEditSmtpSetting(request)
            } else {
                ToastService.warning(ErrorMessage.FieldRequired.replace("{0}", "Organization Profile Management Data"))
            }
        }
    }

    useEffect(() => {
        if (props.smtpSettingId > 0) {
            getSmtpSettingId(props.smtpSettingId)
        } else if (props.organizationId === 0 && props.activeTabId === 1) {
            ToastService.warning(ErrorMessage.FieldRequired.replace("{0}", "Organization Profile Management Data"))
        }
    }, [props.smtpSettingId, props.activeTabId])

    useEffect(() => {
        if (!isGetSmtpSettingIdFetching && isgetSmtpSettingIdSuccess && isGetSmtpSettingIdData) {
            let formData = { ...SMTPSettingsData };
            formData.initialState = {
                emailProvider: isGetSmtpSettingIdData.emailProvider,
                smtpServer: isGetSmtpSettingIdData.smtpServer,
                smtpPort: isGetSmtpSettingIdData.smtpPort,
                smtpUserName: isGetSmtpSettingIdData.smtpUserName,
                smtpPassword: isGetSmtpSettingIdData.smtpPassword,
                useSsl: isGetSmtpSettingIdData.useSsl,
            };
            setSmtpSettingData(formData);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetSmtpSettingIdFetching, isgetSmtpSettingIdSuccess, isGetSmtpSettingIdData,]);

    // const onHandleReset = () => {
    //     onResetForm(SMTPSettingsData, setSmtpSettingData, null);
    // }

    return (
        <div className="row mt-2 add-address-form">
            {!isGetSmtpSettingIdFetching ?
                <FormCreator config={smtpSettingData}
                    ref={smtpRef}
                    {...smtpSettingData}
                    key={shouldRerenderFormCreator}
                />
                : <DataLoader />
            }
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditSmtpSettings}
                        isLoading={isAddEditSmtpSettingLoading}
                    // isDisable={isButtonDisable} 
                    />
                    {/* <Buttons
                        buttonTypeClassName="dark-btn ml-5"
                        buttonText="Cancel"
                        onClick={onHandleReset}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default SMTPSettings