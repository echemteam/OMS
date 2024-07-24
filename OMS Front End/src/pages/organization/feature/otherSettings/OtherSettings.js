/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { OtherSettingsData } from './config/OtherSettings.data';
import Buttons from '../../../../components/ui/button/Buttons';
import FormCreator from '../../../../components/Forms/FormCreator';
import { useLazyGetAllPaymentTermsQuery } from '../../../../app/services/customerSettingsAPI';
import { setDropDownOptionField } from '../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import { useAddEditOrganizationOtherSettingsMutation, useLazyGetOrganizationOtherSettingsQuery } from '../../../../app/services/organizationAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { ErrorMessage } from '../../../../data/appMessages';
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';

const OtherSettings = (props) => {
    const otherSetting = useRef();
    const [otherSettingData, setOtherSettingData] = useState(OtherSettingsData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData, },] = useLazyGetAllPaymentTermsQuery();

    const [addEditOrganizationOtherSettings, { isLoading: isAddEditOrganizationOtherSettingsLoading, isSuccess: isAddEditOrganizationOtherSettingsSuccess, data: isAddEditOrganizationOtherSettingsData }] = useAddEditOrganizationOtherSettingsMutation();
    const [getOrganizationOtherSettings, { isFetching: isGetOrganizationOtherSettingsFetching, isSuccess: isGetOrganizationOtherSettingsSuccess, data: isGetOrganizationOtherSettingsData }] = useLazyGetOrganizationOtherSettingsQuery();

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
            if (props.organizationId > 0) {
                addEditOrganizationOtherSettings(request)
            } else {
                ToastService.warning(ErrorMessage.FieldRequired.replace("{0}", "Organization Profile Management Data"))
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
        if (props.organizationId > 0) {
            getOrganizationOtherSettings()
        } else if (props.organizationId === 0 && props.activeTabId === 2) {
            ToastService.warning(ErrorMessage.FieldRequired.replace("{0}", "Organization Profile Management Data"))
        }
    }, [props.activeTabId])

    useEffect(() => {
        if (!isGetOrganizationOtherSettingsFetching && isGetOrganizationOtherSettingsSuccess && isGetOrganizationOtherSettingsData) {
            let formData = { ...OtherSettingsData };
            formData.initialState = {
                paymentTermId: isGetOrganizationOtherSettingsData.defaultPaymentTerms,
                fedexAccountDetail: isGetOrganizationOtherSettingsData.fedexAccountDetail,
            };
            setOtherSettingData(formData);
            props.onHandleOrganizationOtherSetting(isGetOrganizationOtherSettingsData.organizationOtherSettingId)
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetOrganizationOtherSettingsFetching, isGetOrganizationOtherSettingsSuccess, isGetOrganizationOtherSettingsData,]);

    return (
        <div className="row mt-2 add-address-form">
            {!isGetOrganizationOtherSettingsFetching ?
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
                </div>
            </div>
        </div>
    )
}

OtherSettings.propTypes = {
    activeTabId: PropTypes.number.isRequired,
    organizationId: PropTypes.number,
    smtpSettingId: PropTypes.number,
    organizationOtherSettingId: PropTypes.number,
    onHandleOrganizationOtherSetting: PropTypes.func.isRequired
};

export default OtherSettings