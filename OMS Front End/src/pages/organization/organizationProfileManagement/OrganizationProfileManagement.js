/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { OrganizationProfileManagementdata } from './config/OrganizationProfileManagement.data';
import Buttons from '../../../components/ui/button/Buttons';
import FormCreator from '../../../components/Forms/FormCreator';
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from '../../../app/services/addressAPI';
import { useLazyGetAllCountriesQuery } from '../../../app/services/basicdetailAPI';
import { setDropDownOptionField, setFieldSetting } from '../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import { FieldSettingType } from '../../../utils/Enums/commonEnums';
import { useAddEditOrganizationProfileMutation, useLazyGetOrganizationProfileByOrganizationIdQuery } from '../../../app/services/organizationAPI';
import ToastService from '../../../services/toastService/ToastService';
import DataLoader from '../../../components/ui/dataLoader/DataLoader';
import { onResetForm } from '../../../utils/FormFields/ResetForm/handleResetForm';

const OrganizationProfileManagement = (props) => {
    const organizationProfile = useRef();
    const [organizationProfileData, setOrganizationProfileData] = useState(OrganizationProfileManagementdata);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    // const [getOrganizationId, setOrganizationId] = useState(0)

    const [getAllCities, { isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [addEditOrganization, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddEditOrganizationProfileMutation();
    const [getOrganizationProfileByOrganizationId, { isFetching: isgetOrganizationProfileByOrganizationIdFetching, isSuccess: isgetOrganizationProfileByOrganizationIdSuccess, data: isgetOrganizationProfileByOrganizationIdData }] = useLazyGetOrganizationProfileByOrganizationIdQuery();

    useEffect(() => {
        getAllCountries();
        getAllStates();
        getAllCities();
    }, []);

    useEffect(() => {
        if (props.organizationId > 0) {
            getOrganizationProfileByOrganizationId(props.organizationId)
        }
    }, [props.organizationId, props.activeTabId])

    useEffect(() => {
        if (!isgetOrganizationProfileByOrganizationIdFetching && isgetOrganizationProfileByOrganizationIdSuccess && isgetOrganizationProfileByOrganizationIdData) {
            let formData = { ...organizationProfileData };
            formData.initialState = {
                name: isgetOrganizationProfileByOrganizationIdData.name,
                logo: isgetOrganizationProfileByOrganizationIdData.logo,
                addressLine1: isgetOrganizationProfileByOrganizationIdData.addressLine1,
                addressLine2: isgetOrganizationProfileByOrganizationIdData.addressLine2,
                countryId: isgetOrganizationProfileByOrganizationIdData.countryId,
                stateId: isgetOrganizationProfileByOrganizationIdData.stateId,
                zipCode: isgetOrganizationProfileByOrganizationIdData.zipCode,
                cityId: isgetOrganizationProfileByOrganizationIdData.cityId,
            };
            setOrganizationProfileData(formData);
        }
    }, [isgetOrganizationProfileByOrganizationIdFetching, isgetOrganizationProfileByOrganizationIdSuccess, isgetOrganizationProfileByOrganizationIdData,]);

    useEffect(() => {
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', OrganizationProfileManagementdata, 'countryId');
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
        if (isGetAllStatesSucess && allGetAllStatesData) {
            handleStateOption(allGetAllStatesData);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
        if (isGetAllCitiesSucess && allGetAllCitiesData) {
            handleCityOption(allGetAllCitiesData);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData]);

    const handleStateOption = (responseData) => {
        setDropDownOptionField(responseData, 'stateId', 'name', OrganizationProfileManagementdata, 'stateId');
    };
    const handleCityOption = (responseData) => {
        setDropDownOptionField(responseData, 'cityId', 'name', OrganizationProfileManagementdata, 'cityId');
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
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
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

    // const onHandleReset = () => {
    //     onResetForm(OrganizationProfileManagementdata, setOrganizationProfileData, null);
    // }

    return (
        <div className="row mt-2 add-address-form">
            {!isgetOrganizationProfileByOrganizationIdFetching ?
                <FormCreator
                    config={organizationProfileData}
                    ref={organizationProfile}
                    key={shouldRerenderFormCreator}
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
                    {/* <Buttons
                        buttonTypeClassName="dark-btn ml-5"
                        buttonText="Cancel"
                        onClick={onHandleReset}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default OrganizationProfileManagement;
