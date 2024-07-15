/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { setFieldSetting, setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { addressFormData } from "../../../../../pages/customerDetail/features/addressDetail/features/config/AddressForm.data";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllAddressTypesQuery, useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";

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

    useEffect(() => {
        const fetchData = async () => {
            if (editMode || isModelOpen) {
                await Promise.all([
                    getAllStates(),
                    getAllCities(),
                    getAllCountries(),
                    getAllAddressTypes()
                ]);
            }
        };

        fetchData();
    }, [editMode, isModelOpen]);


    useEffect(() => {
        const handleResponse = (success, data) => {
            if (success && data) {
                handleAddressResponse(success, data);
            }
        };
        handleResponse(isAddSuccess, isAddData);
        handleResponse(isUpdateSuccess, isUpdateData);
    }, [isAddSuccess, isAddData, isUpdateSuccess, isUpdateData]);

    useEffect(() => {
        if (isSupplier && isModelOpen) {
            onResetSupplier();
            setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, true);
        } else if (!isModelOpen) {
            onResetForm(addressFormData, setFormData, null);
        }
    }, [isSupplier, isModelOpen]);

    const handleStateOption = (responseData) => {
        setDropDownOptionField(responseData, 'stateId', 'name', addressFormData, 'stateId');
    }
    const handleCityOption = (responseData) => {
        setDropDownOptionField(responseData, 'cityId', 'name', addressFormData, 'cityId');
    }

    useEffect(() => {
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', addressFormData, 'countryId');
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
            setDropDownOptionField(allGetAllAddressTypesData, 'addressTypeId', 'type', addressFormData, 'addressTypeId', filterCondition);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData, isGetAllAddressTypesSucess, allGetAllAddressTypesData]);

    useEffect(() => {
        if (!isGetByIdFetching && isGetByIdSuccess && isGetByIdData) {
            const { countryId, stateId } = isGetByIdData;
            const form = { ...formData };

            if (!isButtonDisable) {
                setFieldSetting(form, 'cityId', FieldSettingType.DISABLED, false);
                setFieldSetting(form, 'stateId', FieldSettingType.DISABLED, false);
            }

            if (countryId) {
                handleStateOption(allGetAllStatesData);
            }

            if (stateId) {
                handleCityOption(allGetAllCitiesData);
            }

            form.initialState = { ...isGetByIdData };
            setFormData(form);

            if (!isSupplier) {
                const modifyFormFields = removeFormFields(addressFormData, ['isShippingAndBilling']);
                setFormData(modifyFormFields);
            }
        }
    }, [isGetByIdFetching, isGetByIdSuccess, isGetByIdData]);


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
        if (data) {
            const transformedData = {
                ...data,
                [isSupplier ? 'supplierId' : 'customerId']: keyId,
                addressTypeId: extractValue(data.addressTypeId),
                countryId: extractValue(data.countryId),
                stateId: extractValue(data.stateId),
                cityId: extractValue(data.cityId)
            };

            if (editMode) {
                update(transformedData);
            } else {
                add(transformedData);
            }
        }
    };

    const extractValue = (field) => {
        return field && typeof field === "object" ? field.value : field;
    };

    const handleEdit = (addressId) => {
        addressId && getById(addressId);
    }

    const handleChangeDropdownList = (data, dataField) => {
        const manageData = { ...formData };

        if (dataField === "countryId") {
            setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
            setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
            ref.current.updateFormFieldValue({
                countryId: data.value,
                stateId: null,
            });
        } else if (dataField === "stateId") {
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
            setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
            ref.current.updateFormFieldValue({
                stateId: data.value,
                cityId: null,
            });
        } else if (!isSupplier && dataField === "addressTypeId") {
            let filteredFormFields;
            switch (data.label) {
                case "Billing":
                    filteredFormFields = editMode ? addressFormData.formFields.filter(field => field.dataField !== "isPreferredShipping" && field.dataField !== "isShippingAndBilling")
                        : addressFormData.formFields.filter(field => field.dataField !== "isPreferredShipping");
                    break;
                case "Shipping":
                    filteredFormFields = editMode ? addressFormData.formFields.filter(field => field.dataField !== "isPreferredBilling" && field.dataField !== "isShippingAndBilling")
                        : addressFormData.formFields.filter(field => field.dataField !== "isPreferredBilling");
                    break;
                case "AP":
                case "Primary":
                    filteredFormFields = addressFormData.formFields.filter(field => field.dataField !== "isPreferredBilling" && field.dataField !== "isPreferredShipping" && field.dataField !== "isShippingAndBilling");
                    break;
                default:
                    filteredFormFields = addressFormData.formFields;
            }

            manageData.formFields = filteredFormFields;
            manageData.initialState = {
                ...(editMode ? formData.initialState : addressFormData.initialState),
                addressTypeId: data.value,
            };

            setFormData(manageData);
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
        const modifyFormFields = removeFormFields(formData, ['isPreferredShipping', 'isShippingAndBilling', 'isPreferredBilling']);
        setFormData(modifyFormFields);
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