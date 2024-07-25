/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { OrganizationProfileManagementdata } from './config/OrganizationProfileManagement.data';
import Buttons from '../../../../components/ui/button/Buttons';
import FormCreator from '../../../../components/Forms/FormCreator';
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from '../../../../app/services/addressAPI';
import { useLazyGetAllCountriesQuery } from '../../../../app/services/basicdetailAPI';
import { setDropDownOptionField, setFieldSetting } from '../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import { FieldSettingType } from '../../../../utils/Enums/commonEnums';
import { useAddEditOrganizationProfileMutation, useLazyGetOrganizationProfileQuery } from '../../../../app/services/organizationAPI';
import ToastService from '../../../../services/toastService/ToastService';
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';

const OrganizationProfileManagement = (props) => {
    const organizationProfile = useRef();
    const [organizationProfileData, setOrganizationProfileData] = useState(OrganizationProfileManagementdata);
    // const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    // const [getOrganizationId, setOrganizationId] = useState(0)

    const [getAllCities, {isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [addEditOrganization, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddEditOrganizationProfileMutation();
    const [getOrganizationProfile, { isFetching: isGetOrganizationProfileFetching, isSuccess: isGetOrganizationProfileSuccess, data: isGetOrganizationProfileData }] = useLazyGetOrganizationProfileQuery();

    useEffect(() => {
        getAllCountries();
        getAllStates();
        // getAllCities();
    }, []);

    useEffect(() => {
        // if (props.organizationId > 0) {
            getOrganizationProfile()
        // }
    }, [props.activeTabId])

    useEffect(() => {
        if (!isGetOrganizationProfileFetching && isGetOrganizationProfileSuccess && isGetOrganizationProfileData) {
            let formData = { ...organizationProfileData };

            if (isGetOrganizationProfileData.countryId) {
                handleStateOption(allGetAllStatesData);
                setFieldSetting(formData, 'stateId', FieldSettingType.DISABLED, false);
            }

            if (isGetOrganizationProfileData.stateId) {
                getAllCities(isGetOrganizationProfileData.stateId)
                setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, false);
            }

            formData.initialState = {
                name: isGetOrganizationProfileData.name,
                logo: isGetOrganizationProfileData.base64File,
                addressLine1: isGetOrganizationProfileData.addressLine1,
                addressLine2: isGetOrganizationProfileData.addressLine2,
                countryId: isGetOrganizationProfileData.countryId,
                stateId: isGetOrganizationProfileData.stateId,
                zipCode: isGetOrganizationProfileData.zipCode,
                cityId: isGetOrganizationProfileData.cityId,
            };
            setOrganizationProfileData(formData);
            props.onHandleOrganization(isGetOrganizationProfileData.organizationId)
        }
    }, [isGetOrganizationProfileFetching, isGetOrganizationProfileSuccess, isGetOrganizationProfileData,]);

    useEffect(() => {
        if ( isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', OrganizationProfileManagementdata, 'countryId');
        }
        if (isGetAllStatesSucess && allGetAllStatesData) {
            handleStateOption(allGetAllStatesData);
        }
        if (isGetAllCitiesSucess && allGetAllCitiesData) {
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', OrganizationProfileManagementdata, 'cityId');
        }
    }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData]);

    const handleStateOption = (responseData) => {
        setDropDownOptionField(responseData, 'stateId', 'name', OrganizationProfileManagementdata, 'stateId');
    };

    const handleChangeDropdownList = (data, dataField) => {
        const manageData = { ...organizationProfileData };
        if (dataField === "countryId") {
            setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
            setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
            organizationProfile.current.updateFormFieldValue({
                countryId: data.value,
                stateId: null,
            });
        } else if (dataField === "stateId") {
            getAllCities(data.value)
            setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
            organizationProfile.current.updateFormFieldValue({
                stateId: data.value,
                cityId: null,
            });
        }
    };

    useEffect(() => {
        handleResponse(isAddSuccess, isAddData);
    }, [isAddSuccess, isAddData]);

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
            props.onHandleOrganization(responseData.keyValue)
        }
    }


    const handleAddEdit = () => {
        let data = organizationProfile.current.getFormData();
        if (data) {
            let request = {
                ...data,
                logo:data.logo.fileName,
                base64File:data.logo.base64Data,
                cityId: data.cityId && typeof data.cityId === "object" ? data.cityId.value : data.cityId,
                stateId: data.stateId && typeof data.stateId === "object" ? data.stateId.value : data.stateId,
                countryId: data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId,
                organizationId: props.organizationId ? props.organizationId : data.organizationId
            }
            addEditOrganization(request)
        }
    }

    const formActionHandler = {
        DDL_CHANGED: handleChangeDropdownList,
    };

    return (
        <div className="row mt-2 add-address-form">
            {!isGetOrganizationProfileFetching ?
                <FormCreator
                    config={organizationProfileData}
                    ref={organizationProfile}
                    // key={shouldRerenderFormCreator}
                    onActionChange={formActionHandler}
                />
                : <DataLoader />
            }
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEdit}
                        isLoading={isAddLoading}
                    />
                </div>
            </div>
        </div>
    );
};

OrganizationProfileManagement.propTypes = {
    activeTabId: PropTypes.number.isRequired,
    organizationId: PropTypes.number,
    onHandleOrganization: PropTypes.func.isRequired
};

export default OrganizationProfileManagement;
