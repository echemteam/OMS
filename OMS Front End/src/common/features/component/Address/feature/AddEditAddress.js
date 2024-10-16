/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import { AddressType, FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { setFieldSetting, setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { addressFormData } from "../config/AddressForm.data";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllAddressTypesQuery, useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import PropTypes from 'prop-types';
import { getValue } from "../../../../../utils/CommonUtils/CommonUtilsMethods";

const SetInitialCountry = {
    ...addressFormData.initialState,
    countryId: { label: "United States", value: 233 }
}

const AddEditAddress = forwardRef(({ addressContactType,isModelOpenUpdateAddress,isOrderAddress,keyId, isSupplier, updateAddress, addAddress, getAddresssById, isModelOpen, editMode, isButtonDisable, getCompletionCount,
    onSidebarClose, editRef, isOrderManage, getAddressTypeIdOrder, onHandleOrderInfoRepeatCall, orderCustomerId, isEditablePage, customerStatusId }) => {

    //** States */
    const ref = useRef();
    const [formData, setFormData] = useState(addressFormData);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [addressEditTableId, setAddressEditTableId] = useState(0);
    const [selectedCheckboxFeild, setSelectedCheckboxFeild] = useState(null);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    //** API Call's */
    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierAddressDetails OR CustomerAddressDetails component.
    */
    const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = addAddress();
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = updateAddress();
    const [getById, { isFetching: isGetByIdFetching, isSuccess: isGetByIdSuccess, data: isGetByIdData }] = getAddresssById();

    const [getAllCities, { isSuccess: isGetAllCitiesSucess, isFetching: isFetchingCities, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllAddressTypes, { isSuccess: isGetAllAddressTypesSucess, data: allGetAllAddressTypesData }] = useLazyGetAllAddressTypesQuery();

    useEffect(() => {
        const fetchData = async () => {
            if (editMode || isModelOpen || !isOrderManage) {
                await Promise.all([
                    getAllStates(),
                    getAllCountries(),
                    getAllAddressTypes()
                ]);
            }
        };
        fetchData();
    }, [editMode, isModelOpen]);

    useEffect(() => {
        if (isOrderManage) {
            setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED, true);
            let form = { ...addressFormData };
            if (getAddressTypeIdOrder === AddressType.BILLING) {
                form = removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredShipping']);
            } else if (getAddressTypeIdOrder === AddressType.SHIPPING) {
                form = removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredBilling']);
            }
            form.initialState = {
                ...form.initialState,
                addressTypeId: getAddressTypeIdOrder,
            }
            setFormData(form);
        
        } else {
            setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED);
        }
    }, [isOrderManage, isModelOpen])

    const handleResponse = (success, data) => {
        if (success && data) {
            handleAddressResponse(success, data);
        }
    };

    useEffect(() => {
        handleResponse(isAddSuccess, isAddData);
    }, [isAddSuccess, isAddData]);

    useEffect(() => {
        handleResponse(isUpdateSuccess, isUpdateData);
    }, [isUpdateSuccess, isUpdateData]);

    useEffect(() => {
        if (isSupplier && isModelOpen) {
            setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, true);
            setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, true);
            if (editMode) {
                setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, false);
            }
        } else if (!isModelOpen && !isOrderManage) {
            onResetForm(addressFormData, setFormData, null);
        } else if (!isSupplier && !isOrderManage) {
            setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, false);
        }
    }, [isSupplier, isModelOpen]);

    useEffect(() => {
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', addressFormData, 'countryId');
        }
    }, [isGetAllCountriesSucess, allGetAllCountriesData]);

    useEffect(() => {
        if (!isFetchingCities & isGetAllCitiesSucess && allGetAllCitiesData) {
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', formData, 'cityId', null, setFormData);
        }
    }, [isGetAllCitiesSucess, allGetAllCitiesData, isFetchingCities]);

    useEffect(() => {
        if (isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
            const filterCondition = (item) => {
                return isSupplier ? item.isForSuppliers : item.isForCustomers;
            };
            setDropDownOptionField(allGetAllAddressTypesData, 'addressTypeId', 'type', addressFormData, 'addressTypeId', filterCondition);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isGetAllAddressTypesSucess, allGetAllAddressTypesData, isSupplier]);

    useEffect(() => {
        if (!isGetByIdFetching && isGetByIdSuccess && isGetByIdData) {
            setAddressEditTableId(isGetByIdData.addressId);
            let form = { ...formData };
            let data = isGetByIdData;
            if (!isButtonDisable) {
                setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED);
                setFieldSetting(formData, 'stateId', FieldSettingType.DISABLED);
            } else if (isButtonDisable) {
                setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, true);
                setFieldSetting(formData, 'stateId', FieldSettingType.DISABLED, true);
            }
            if (data.countryId) {
                setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', form, 'stateId', item => item.countryId === data.countryId);
            }
            if (data.stateId) {
                getAllCities(data.stateId)
            }
            form.initialState = {
                customerId: isSupplier === false ? keyId : 0,
                supplierId: isSupplier === true ? keyId : 0,
                addressTypeId: data.addressTypeId,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                addressLine3: data.addressLine3,
                addressLine4: data.addressLine4,
                addressLine5: data.addressLine5,
                countryId: data.countryId,
                stateId: data.stateId,
                cityId: data.cityId,
                zipCode: data.zipCode,
                isPreferredShipping: data.isPreferredShipping,
                isPreferredBilling: data.isPreferredBilling,
            };
            setFormData(form);
        }
    }, [isGetByIdFetching, isGetByIdSuccess, isGetByIdData]);

    const setInitialValue = () => {
        if (!editMode) {
            let updatedFormData;
            updatedFormData = removeFormFields(addressFormData, ['isPreferredShipping', 'isShippingAndBilling', 'isPreferredBilling']);
            if (allGetAllStatesData) {
                setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, true);
                handleColumnChange("countryId", SetInitialCountry);
            }
            setFormData(updatedFormData)
        }
    }

    useEffect(() => {
        if (!isOrderManage) {
            setInitialValue()
        }
    }, [allGetAllStatesData, isModelOpen])

    useEffect(() => {
        if (isGetByIdData) {
            let updatedFormData = { ...formData };
            if (isGetByIdData.type === "Billing") {
                updatedFormData = removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredShipping']);
            } else if (isGetByIdData.type === "Shipping") {
                updatedFormData = removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredBilling']);
            } else if (isGetByIdData.type === "AP" || isGetByIdData.type === "Primary") {
                updatedFormData = removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredBilling', 'isPreferredShipping']);
            }
            updatedFormData.initialState = {
                customerId: isSupplier === false ? keyId : 0,
                supplierId: isSupplier === true ? keyId : 0,
                addressTypeId: isGetByIdData.addressTypeId,
                addressLine1: isGetByIdData.addressLine1,
                addressLine2: isGetByIdData.addressLine2,
                addressLine3: isGetByIdData.addressLine3,
                addressLine4: isGetByIdData.addressLine4,
                addressLine5: isGetByIdData.addressLine5,
                countryId: isGetByIdData.countryId,
                stateId: isGetByIdData.stateId,
                cityId: isGetByIdData.cityId,
                zipCode: isGetByIdData.zipCode,
                isPreferredShipping: isGetByIdData.isPreferredShipping,
                isPreferredBilling: isGetByIdData.isPreferredBilling,
            };
            setFormData(updatedFormData);
        }
    }, [isGetByIdData])

    const handleAddressResponse = (isSuccess, responseData) => {
        if (isSuccess && responseData) {
            getCompletionCount && getCompletionCount();
            if (responseData.errorMessage.includes("exists")) {
                ToastService.warning(responseData.errorMessage);
                getById(keyId);
                return;
            }
            onResetForm(addressFormData, setFormData, null);
            ToastService.success(responseData.errorMessage);
            if (!isOrderManage) {
                getById(keyId);
                onSidebarClose();
            } else {
                onHandleOrderInfoRepeatCall()
            }
            onSidebarClose();
        }
    }
    const getAddressTypeId = (data, isSupplier, editMode) => {
        if (isSupplier) {
            if (editMode) {
                return data.addressTypeId && typeof data.addressTypeId === "object"
                    ? String(data.addressTypeId.value)
                    : String(data.addressTypeId);
            } else {
                return Array.isArray(data.addressTypeId)
                    ? data.addressTypeId.map(String).join(",")
                    : data.addressTypeId;
            }
        } else {
            return data.addressTypeId && typeof data.addressTypeId === "object"
                ? String(data.addressTypeId.value)
                : String(data.addressTypeId);
        }
    };

    const buildTransformedData = (data, isSupplier, keyId, editMode) => {
        const addressTypeIdValue = getAddressTypeId(data, isSupplier, editMode);
        const transformLocationData = (locationData, nameField) => {
            if (typeof locationData === 'object') {
                if (locationData.isNew) {
                    return {
                        id: 0, // Set id to 0 for new entries
                        name: locationData.text || "", // Use the text for the name, or an empty string if not provided
                    };
                } else {
                    return {
                        id: locationData.value || locationData.id || 0, // Use existing value or id, or fallback to 0
                        name: nameField || "", // Use existing nameField or fallback to an empty string
                    };
                }
            }
            return {
                id: locationData || 0, // Use locationData if present, otherwise 0
                name: nameField || "", // Use nameField if present, otherwise an empty string
            };
        };

        const { id: stateId, name: stateName } = transformLocationData(data.stateId, data.stateName);
        const { id: cityId, name: cityName } = transformLocationData(data.cityId, data.cityName);

        return {
            ...data,
            [isSupplier ? 'supplierId' : 'customerId']: keyId,
            addressTypeId: extractValue(addressTypeIdValue),
            countryId: extractValue(data.countryId),
            stateId,
            cityId,
            stateName,
            cityName,
        };
    };

    const getCustomerAddressId = (isSupplier, isGetByIdData) => {
        return isSupplier === false
            ? isGetByIdData ? isGetByIdData.customerAddressId : 0
            : 0;
    };

    const getSupplierAddressId = (isSupplier, isGetByIdData) => {
        return isSupplier === true
            ? isGetByIdData ? isGetByIdData.supplierAddressId : 0
            : 0;
    };

    const buildUpdateData = (transformedData, isGetByIdData, isSupplier) => {
        const customerAddressId = getCustomerAddressId(isSupplier, isGetByIdData);
        const supplierAddressId = getSupplierAddressId(isSupplier, isGetByIdData);
        return {
            ...transformedData,
            addressId: isGetByIdData === null ? addressEditTableId : isGetByIdData.addressId,
            customerAddressId,
            supplierAddressId,
        };
    };

    const handleAddEdit = async () => {
        const data = ref.current.getFormData();
        if (!data) return;
        const transformedData = buildTransformedData(data, isSupplier, keyId, editMode);
        if (editMode) {
            const updateData = buildUpdateData(transformedData, isGetByIdData, isSupplier);
            update(updateData);
        } else {
            // // Add mode
            const customerId = orderCustomerId ? orderCustomerId : transformedData.customerId;
            const req = {
                ...transformedData,
                customerId: customerId,
            };
            add(req);
        }
    };

    const extractValue = (field) => {
        return field && typeof field === "object" ? field.value : field;
    };

    const handleEdit = (addressId) => {
        addressId && getById(addressId);
    }

    const handleColumnChange = (dataField, updatedData) => {
        let manageData = { ...formData };
        const stateId = getValue(updatedData.stateId);
        const countryId = getValue(updatedData.countryId);
        const addressTypeId = getValue(updatedData.addressTypeId);
        if (dataField === "countryId") {
            setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === countryId);
            setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
            setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED);
            manageData.initialState = {
                ...updatedData,
                stateId: null,
                cityId: null
            }
        } else if (dataField === "stateId") {
            if (stateId) {
                getAllCities(stateId);
                setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED);
                manageData.initialState = {
                    ...updatedData,
                    stateId: stateId,
                    countryId: countryId,
                    cityId: null
                }
            } else {
                manageData.initialState = {
                    ...updatedData,
                    cityId: null
                }
            }
        }
        else if (!isSupplier && dataField === "addressTypeId") {
            const billingFields = ["isPreferredShipping"];
            const billingEditFields = ["isPreferredShipping", "isShippingAndBilling"];
            const shippingFields = ["isPreferredBilling"];
            const shippingEditFields = ["isPreferredBilling", "isShippingAndBilling"];
            const primaryExclusions = ["isPreferredBilling", "isPreferredShipping", "isShippingAndBilling"];
            switch (addressTypeId) {
                case AddressType.BILLING:
                    manageData = editMode ? removeFormFields(addressFormData, billingEditFields)
                        : removeFormFields(addressFormData, billingFields);
                    break;
                case AddressType.SHIPPING:
                    manageData = editMode ?
                        removeFormFields(addressFormData, shippingEditFields)
                        : removeFormFields(addressFormData, shippingFields)
                    break;
                default:
                    manageData = removeFormFields(addressFormData, primaryExclusions);
            }
            manageData.initialState = {
                ...(editMode ? formData.initialState : addressFormData.initialState),
                addressTypeId: addressTypeId,
            };
        }
        if (dataField === 'isShippingAndBilling') {
            setSelectedCheckboxFeild(dataField);
            setSelectedCheckbox(updatedData.isShippingAndBilling);
            manageData = { ...addressFormData };
            manageData.initialState = {
                ...updatedData
            }
        } else if (dataField === 'isPreferredBilling') {
            setSelectedCheckboxFeild(dataField);
            setSelectedCheckbox(updatedData.isShippingAndBilling);
            manageData.initialState = {
                ...updatedData
            }
        } else if (dataField === 'isPreferredShipping') {
            setSelectedCheckboxFeild(dataField);
            setSelectedCheckbox(updatedData.isShippingAndBilling);
            manageData.initialState = {
                ...updatedData
            }
        }
        setFormData(manageData);
    };

    useEffect(() => {
        let data = { ...formData }
        if (selectedCheckboxFeild === "isShippingAndBilling" && selectedCheckbox === false && data.initialState.addressTypeId === 1) {
            let updatedFormData;
            updatedFormData = removeFormFields(formData, ['isPreferredShipping']);
            setFormData(updatedFormData)
        } else if (selectedCheckboxFeild === "isShippingAndBilling" && selectedCheckbox === false && data.initialState.addressTypeId === 2) {
            let updatedFormData;
            updatedFormData = removeFormFields(formData, ['isPreferredBilling']);
            setFormData(updatedFormData)
        }
    }, [selectedCheckbox, selectedCheckboxFeild])

    //** Use Imperative Handle */
    useImperativeHandle(editRef, () => ({
        callChildEditFunction: handleEdit
    }));

    return (
        <div className="row mt-2 add-address-form">
            <FormCreator config={formData} ref={ref}
                key={shouldRerenderFormCreator} onColumnChange={handleColumnChange} />
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

AddEditAddress.propTypes = {
    keyId: PropTypes.number.isRequired,
    isSupplier: PropTypes.bool.isRequired,
    updateAddress: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
    getAddresssById: PropTypes.func.isRequired,
    isModelOpen: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    isButtonDisable: PropTypes.bool.isRequired,
    onSidebarClose: PropTypes.func,
    editRef: PropTypes.object,
    orderCustomerId: PropTypes.number,
    isOrderManage: PropTypes.bool,
    getAddressTypeIdOrder: PropTypes.string,
    onHandleOrderInfoRepeatCall: PropTypes.func,
};

export default AddEditAddress;