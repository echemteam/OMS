/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { OtherSettingsData } from './config/OtherSettings.data';
import Buttons from '../../../components/ui/button/Buttons';
import FormCreator from '../../../components/Forms/FormCreator';
import { useLazyGetAllPaymentTermsQuery } from '../../../app/services/customerSettingsAPI';
import { setDropDownOptionField } from '../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import { useAddEditOrganizationOtherSettingsMutation, useLazyGetOrganizationOtherSettingsByIdQuery } from '../../../app/services/organizationAPI';
import ToastService from '../../../services/toastService/ToastService';
import { ErrorMessage } from '../../../data/appMessages';
import DataLoader from '../../../components/ui/dataLoader/DataLoader';
import { onResetForm } from '../../../utils/FormFields/ResetForm/handleResetForm';

const OtherSettings = (props) => {
    const otherSetting = useRef();
    const [otherSettingData, setOtherSettingData] = useState(OtherSettingsData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData, },] = useLazyGetAllPaymentTermsQuery();

    const [addEditOrganizationOtherSettings, { isLoading: isAddEditOrganizationOtherSettingsLoading, isSuccess: isAddEditOrganizationOtherSettingsSuccess, data: isAddEditOrganizationOtherSettingsData }] = useAddEditOrganizationOtherSettingsMutation();
    const [getOrganizationOtherSettingsById, { isFetching: isOrganizationOtherSettingsByIdFetching, isSuccess: isOrganizationOtherSettingsByIdSuccess, data: isOrganizationOtherSettingsByIdData }] = useLazyGetOrganizationOtherSettingsByIdQuery();

    useEffect(() => {
        getAllPaymentTerms();
    }, []);

    useEffect(() => {
        if (!isGetAllPaymentTermsFetching && isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
            setDropDownOptionField(isGetAllPaymentTermsData, "paymentTermId", "paymentTerm", OtherSettingsData, "paymentTermId");
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetAllPaymentTermsFetching, isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData]);

    const handleAddEditOrganizationOther = () => {
        let data = otherSetting.current.getFormData();
        if (data) {
            let request = {
                ...data,
                defaultPaymentTerms: data.paymentTermId.value,
                organizationId: props.organizationId,
                organizationOtherSettingId: props.organizationOtherSettingId
            }
            if (props.smtpSettingId > 0 && props.organizationId > 0) {
                addEditOrganizationOtherSettings(request)
            } else {
                ToastService.warning(ErrorMessage.FieldRequired.replace("{0}", "SMTP Settings Data"))
            }
        }
    }

    useEffect(() => {
        handleResponse(isAddEditOrganizationOtherSettingsSuccess, isAddEditOrganizationOtherSettingsData);
    }, [isAddEditOrganizationOtherSettingsSuccess, isAddEditOrganizationOtherSettingsData]);

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
            props.onHandleOrganizationOtherSetting(responseData.keyValue)
        }
    }

    useEffect(() => {
        if (props.organizationOtherSettingId > 0) {
            getOrganizationOtherSettingsById(props.organizationOtherSettingId)
        } else if (props.smtpSettingId === 0 && props.activeTabId === 2) {
            ToastService.warning(ErrorMessage.FieldRequired.replace("{0}", "SMTP Settings Data"))
        }
    }, [props.organizationOtherSettingId, props.activeTabId])

    useEffect(() => {
        if (!isOrganizationOtherSettingsByIdFetching && isOrganizationOtherSettingsByIdSuccess && isOrganizationOtherSettingsByIdData) {
            let formData = { ...OtherSettingsData };
            formData.initialState = {
                paymentTermId: isOrganizationOtherSettingsByIdData.defaultPaymentTerms,
                fedexAccountDetail: isOrganizationOtherSettingsByIdData.fedexAccountDetail,
            };
            setOtherSettingData(formData);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isOrganizationOtherSettingsByIdFetching, isOrganizationOtherSettingsByIdSuccess, isOrganizationOtherSettingsByIdData,]);


    // const onHandleReset = () => {
    //     onResetForm(OtherSettingsData, setOtherSettingData, null);
    // }

    return (
        <div className="row mt-2 add-address-form">
            {!isOrganizationOtherSettingsByIdFetching ?
                <FormCreator config={otherSettingData}
                    ref={otherSetting}
                    {...otherSettingData}
                    key={shouldRerenderFormCreator} />
                : <DataLoader />
            }
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditOrganizationOther}
                        isLoading={isAddEditOrganizationOtherSettingsLoading}
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

export default OtherSettings