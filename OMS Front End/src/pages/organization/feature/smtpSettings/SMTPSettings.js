/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { SMTPSettingsData } from './config/SMTPSettings.data';
import FormCreator from '../../../../components/Forms/FormCreator';
import Buttons from '../../../../components/ui/button/Buttons';
import { useAddEditSmtpSettingsMutation, useLazyGetSmtpSettingsQuery } from '../../../../app/services/organizationAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { ErrorMessage } from '../../../../data/appMessages';
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';
import { decryptUrlData, encryptAES } from '../../../../services/CryptoService';

const SMTPSettings = (props) => {
    const smtpRef = useRef();
    const [smtpSettingData, setSmtpSettingData] = useState(SMTPSettingsData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    const [addEditSmtpSetting, { isLoading: isAddEditSmtpSettingLoading, isSuccess: isAddEditSmtpSettingSuccess, data: isAddEditSmtpSettingData }] = useAddEditSmtpSettingsMutation();
    const [getSmtpSettings, { isFetching: isGetSmtpSettingsFetching, isSuccess: isGetSmtpSettingsSuccess, data: isGetSmtpSettingsData }] = useLazyGetSmtpSettingsQuery();

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
                emailProvider: encryptAES(data.emailProvider),
                smtpServer: encryptAES(data.smtpServer),
                smtpUserName: encryptAES(data.smtpUserName),
                smtpPassword: encryptAES(data.smtpPassword),
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
        if (props.organizationId > 0) {
            getSmtpSettings()
        } else if (props.organizationId === 0 && props.activeTabId === 1) {
            ToastService.warning(ErrorMessage.FieldRequired.replace("{0}", "Organization Profile Management Data"))
        }
    }, [props.activeTabId])

    useEffect(() => {
        if (!isGetSmtpSettingsFetching && isGetSmtpSettingsSuccess && isGetSmtpSettingsData) {
            let formData = { ...SMTPSettingsData };
            formData.initialState = {
                emailProvider: decryptUrlData(isGetSmtpSettingsData.emailProvider),
                smtpServer: decryptUrlData(isGetSmtpSettingsData.smtpServer),
                smtpPort: isGetSmtpSettingsData.smtpPort,
                smtpUserName: decryptUrlData(isGetSmtpSettingsData.smtpUserName),
                smtpPassword: decryptUrlData(isGetSmtpSettingsData.smtpPassword),
                useSsl: isGetSmtpSettingsData.useSsl,
            };
            setSmtpSettingData(formData);
            props.onHandleSmtp(isGetSmtpSettingsData.smtpSettingId)
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetSmtpSettingsFetching, isGetSmtpSettingsSuccess, isGetSmtpSettingsData,]);

    return (
        <div className="row mt-2 add-address-form">
            {!isGetSmtpSettingsFetching ?
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
                </div>
            </div>
        </div>
    )
}

SMTPSettings.propTypes = {
    activeTabId: PropTypes.number.isRequired,
    organizationId: PropTypes.number,
    smtpSettingId: PropTypes.number,
    onHandleSmtp: PropTypes.func.isRequired
};

export default SMTPSettings