/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../components/ui/button/Buttons";
import { settingTypeEnums } from "../../../../utils/Enums/enums";
import FormCreator from "../../../../components/Forms/FormCreator";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { setFieldSetting, setOptionFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { addressFormData } from "../../../../pages/customerDetail/features/addressDetail/features/config/AddressForm.data";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllCountriesQuery } from "../../../../app/services/basicdetailAPI";
import { useLazyGetAllAddressTypesQuery, useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../app/services/addressAPI";

const AddEditAddress = forwardRef(({ keyId, isSupplier, updateAddress, addAddress, getAddresssById, isModelOpen, editMode, isButtonDisable, onSidebarClose, editRef }) => {

    //** States */
    const ref = useRef();
    const [formData, setFormData] = useState(addressFormData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    //** API Call's */
    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierAddressDetails OR CustomerAddressDetails component.
    */
    const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = addAddress();
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = updateAddress();
    const [getById, { isFetching: isGetByIdFetching, isSuccess: isGetByIdSuccess, data: isGetByIdData }] = getAddresssById();

    const [getAllCities, { isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllAddressTypes, { isSuccess: isGetAllAddressTypesSucess, data: allGetAllAddressTypesData }] = useLazyGetAllAddressTypesQuery();

    //** Use Effect */
    useEffect(() => {
        if (editMode || isModelOpen) {
            getAllStates();
            getAllCities();
            getAllCountries();
            getAllAddressTypes();
        }
    }, [editMode, isModelOpen]);

    useEffect(() => {
        if (isAddSuccess && isAddData) {
            handleAddressResponse(isAddSuccess, isAddData);
        }
        if (isUpdateSuccess && isUpdateData) {
            handleAddressResponse(isUpdateSuccess, isUpdateData);
        }
    }, [isAddSuccess, isAddData, isUpdateSuccess, isUpdateData]);

    useEffect(() => {
        if (isSupplier && isModelOpen) {
            onResetSupplier();
            setFieldSetting(formData, 'cityId', settingTypeEnums.isDisabled, true);
        } else if (!isModelOpen) {
            onResetForm(addressFormData, setFormData, null);
        }
    }, [isSupplier, isModelOpen]);

    useEffect(() => {
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            handleCountryOption(allGetAllCountriesData);
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
        if (isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
            const filterCondition = (item) => {
                let condition = isSupplier ? item.isForSuppliers : item.isForCustomers
                return condition;
            };
            setOptionFieldSetting(allGetAllAddressTypesData, 'addressTypeId', 'type', addressFormData, 'addressTypeId', filterCondition);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData, isGetAllAddressTypesSucess, allGetAllAddressTypesData]);

    useEffect(() => {
        if (!isGetByIdFetching && isGetByIdSuccess && isGetByIdData) {
            let data = isGetByIdData;
            let form = { ...formData };
            if (data) {
                if (!isButtonDisable) {
                    setFieldSetting(formData, 'cityId', settingTypeEnums.isDisabled, false);
                    setFieldSetting(formData, 'stateId', settingTypeEnums.isDisabled, false);
                }
                if (data.countryId) {
                    handleStateOption(allGetAllStatesData);
                }
                if (data.stateId) {
                    handleCityOption(allGetAllCitiesData);
                }
                form.initialState = { ...isGetByIdData };
                setFormData(form);
            }
            if (!isSupplier) {
                removeFormFields(addressFormData, ['isShippingAndBilling'], setFormData);
            }
        }
    }, [isGetByIdFetching, isGetByIdSuccess, isGetByIdData]);

    //** Handle Changes */
    const handleCountryOption = (responseData) => {
        setOptionFieldSetting(responseData, 'countryId', 'name', addressFormData, 'countryId');
    }
    const handleStateOption = (responseData) => {
        setOptionFieldSetting(responseData, 'stateId', 'name', addressFormData, 'stateId');
    }
    const handleCityOption = (responseData) => {
        setOptionFieldSetting(responseData, 'cityId', 'name', addressFormData, 'cityId');
    }
    const handleAddressResponse = (isSuccess, responseData) => {
        if (isSuccess && responseData) {
            if (responseData.errorMessage.includes("exists")) {
                ToastService.warning(responseData.errorMessage);
                getById(keyId);
                return;
            }
            onResetForm(addressFormData, setFormData, null);
            ToastService.success(responseData.errorMessage);
            getById(keyId);
            onSidebarClose();
        }
    }
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data != null) {
            let request = {
                ...data,
                [isSupplier ? 'supplierId' : 'customerId']: keyId,
                addressTypeId: data.addressTypeId && typeof data.addressTypeId === "object" ? data.addressTypeId.value : data.addressTypeId,
                countryId: data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId,
                stateId: data.stateId && typeof data.stateId === "object" ? data.stateId.value : data.stateId,
                cityId: data.cityId && typeof data.cityId === "object" ? data.cityId.value : data.cityId
            };
            if (editMode) {
                update(request);
            } else {
                add(request);
            }
        }
    };
    const handleEdit = (addressId) => {
        addressId && getById(addressId);
    }
    const handleChangeDropdownList = (data, dataField) => {
        const manageData = { ...formData };
        if (dataField === "countryId") {
            const filterCondition = (item) => {
                return item.countryId === data.value;
            }
            setOptionFieldSetting(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', filterCondition);
            setFieldSetting(manageData, 'stateId', settingTypeEnums.isDisabled, false);
            ref.current.updateFormFieldValue({
                countryId: data.value,
                stateId: null,
            });
        } else if (dataField === "stateId") {
            const filterCondition = (item) => {
                return item.stateId === data.value;
            }
            setOptionFieldSetting(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', filterCondition);
            setFieldSetting(manageData, 'cityId', settingTypeEnums.isDisabled, false);
            ref.current.updateFormFieldValue({
                stateId: data.value,
                cityId: null,
            });
        } else if (isSupplier === false) {
            if (dataField === "addressTypeId") {
                let filteredFormFields;
                if (data.label === "Billing") {
                    if (editMode) {
                        filteredFormFields = addressFormData.formFields.filter((field) => field.dataField !== "isPreferredShipping" && field.dataField !== "isShippingAndBilling");
                    } else {
                        filteredFormFields = addressFormData.formFields.filter(
                            (field) => field.dataField !== "isPreferredShipping"
                        );
                    }
                } else if (data.label === "Shipping") {
                    if (editMode) {
                        filteredFormFields = addressFormData.formFields.filter((field) => field.dataField !== "isPreferredBilling" && field.dataField !== "isShippingAndBilling");
                    } else {
                        filteredFormFields = addressFormData.formFields.filter((field) => field.dataField !== "isPreferredBilling");
                    }
                } else if (data.label === "AP" || data.label === "Primary") {
                    filteredFormFields = addressFormData.formFields.filter((field) => field.dataField !== "isPreferredBilling" && field.dataField !== "isPreferredShipping" && field.dataField !== "isShippingAndBilling");
                }
                manageData.formFields = filteredFormFields;
                console.log(formData.initialState);
                if (editMode) {
                    manageData.initialState = {
                        ...formData.initialState,
                        addressTypeId: data.value,
                    };
                } else {
                    manageData.initialState = {
                        ...addressFormData.initialState,
                        addressTypeId: data.value,
                    };
                }
                setFormData(manageData);
            }
        }
    };
    const handleCheckboxChanges = (data, dataField) => { };

    //** Use Imperative Handle */
    useImperativeHandle(editRef, () => ({
        callChildEditFunction: handleEdit
    }));

    //** Action Handler */
    const formActionHandler = {
        DDL_CHANGED: handleChangeDropdownList,
        CHECK_CHANGE: handleCheckboxChanges
    };

    //** Reset  */
    const onResetSupplier = () => {
        onResetForm(addressFormData, setFormData, null);
        removeFormFields(formData, ['isPreferredShipping', 'isShippingAndBilling', 'isPreferredBilling'], setFormData);
    };

    return (
        <div className="row mt-3 add-address-form">
            <FormCreator config={formData} ref={ref} {...formData} onActionChange={formActionHandler}
                onCheckBoxChange={formActionHandler} key={shouldRerenderFormCreator} />
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText={editMode ? "Update" : "Save"}
                        onClick={handleAddEdit}
                        isLoading={isAddLoading || isUpdateLoading}
                        isDisable={isButtonDisable} />
                    <Buttons
                        buttonTypeClassName="dark-btn ml-5"
                        buttonText="Cancel"
                        onClick={onSidebarClose} />
                </div>
            </div>
        </div>
    )
});

export default AddEditAddress;