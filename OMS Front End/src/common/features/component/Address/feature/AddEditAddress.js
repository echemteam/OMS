/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import { AddressType, FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { setFieldSetting, setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { addressFormData } from "../config/AddressForm.data";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllAddressTypesQuery, useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import PropTypes from 'prop-types';
import { FunctionalitiesName } from "../../../../../utils/Enums/ApprovalFunctionalities";
import { useValidateAndAddApprovalRequests } from "../../../../../utils/CustomHook/useValidateAndAddApproval";
import { isCustomerOrSupplierApprovedStatus } from "../../../../../utils/CustomerSupplier/CustomerSupplierUtils";
import { getDropdownLabelName } from "../../../../../utils/CommonUtils/CommonUtilsMethods";

const SetInitialCountry = {
    label: "United States",
    value: 233
}

const AddEditAddress = forwardRef(({ keyId, isSupplier, updateAddress, addAddress, getAddresssById, isModelOpen, editMode, isButtonDisable,
    onSidebarClose, editRef, isOrderManage, getAddressTypeIdOrder, onHandleOrderInfoRepeatCall, orderCustomerId, isEditablePage, customerStatusId }) => {

    //** States */
    const ref = useRef();
    const [formData, setFormData] = useState(addressFormData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    const [selectedCheckboxFeild, setSelectedCheckboxFeild] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [addressEditTableId, setAddressEditTableId] = useState(0)
    const { ValidateRequestByApprovalRules, getEventName, isApprovelLoading } = useValidateAndAddApprovalRequests();

    // const [stateChage, setStateChange] = useState(null)

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
                    // getAllCities(),
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
            setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED, false);
            setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, true);
            if (editMode) {
                setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, false);
                setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED, true);
            }
        } else if (!isModelOpen && !isOrderManage) {
            onResetForm(addressFormData, setFormData, null);
        } else if (!isSupplier && !isOrderManage) {
            setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, false);
            setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED, false);
        }
    }, [isSupplier, isModelOpen]);

    useEffect(() => {
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', addressFormData, 'countryId');
        }
    }, [isGetAllCountriesSucess, allGetAllCountriesData]);

    // useEffect(() => {
    //     if (isGetAllStatesSucess && allGetAllStatesData) {
    //         handleStateOption(allGetAllStatesData);
    //     }
    // }, [isGetAllStatesSucess, allGetAllStatesData]);

    useEffect(() => {
        if (!isFetchingCities & isGetAllCitiesSucess && allGetAllCitiesData) {
            const cities = allGetAllCitiesData.map((item) => ({
                value: item.cityId,
                label: item.name,
            }));
            let data = { ...formData };
            const dropdownField = data?.formFields?.find(data => data.id === "cityId");
            dropdownField.fieldSetting.options = cities;
            setFormData(data);
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
            setAddressEditTableId(isGetByIdData.addressId)
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
                handleChangeDropdownList(SetInitialCountry, "countryId");
                setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, true);
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

        const dropdownLabelRequestsFromData = createDropdownLabelRequests(data, allGetAllAddressTypesData,
            allGetAllCountriesData, allGetAllStatesData, allGetAllCitiesData);

        const dropdownLabelRequestsFromInitialState = createDropdownLabelRequests(formData.initialState, allGetAllAddressTypesData,
            allGetAllCountriesData, allGetAllStatesData, allGetAllCitiesData);

        if (editMode) {
            const updateData = buildUpdateData(transformedData, isGetByIdData, isSupplier);
            if (!isSupplier && isEditablePage && isCustomerOrSupplierApprovedStatus(customerStatusId)) {
                let request = {
                    ...updateData,
                    ...dropdownLabelRequestsFromData
                }
                let initialStateRequest = {
                    ...formData.initialState,
                    ...dropdownLabelRequestsFromInitialState
                }
                const eventName = isSupplier ? FunctionalitiesName.SUPPLIERADDADDRESS : getEventName(updateData.addressTypeId, true, 'AddEditAddressCustomer');
                await handleApprovalRequest(request, initialStateRequest, eventName);
            } else {
                update(updateData);
            }
        } else {
            // Add mode
            const customerId = orderCustomerId ? orderCustomerId : transformedData.customerId;
            const req = {
                ...transformedData,
                customerId: customerId,
                ...dropdownLabelRequestsFromData
            };
            const eventName = isSupplier ? FunctionalitiesName.SUPPLIERADDADDRESS : getEventName(req.addressTypeId, false, 'AddEditAddressCustomer');
            if (!isSupplier && isEditablePage && eventName && isCustomerOrSupplierApprovedStatus(customerStatusId)) {
                await handleApprovalRequest(req, null, eventName);
            } else {
                add(req);
            }
        }
    };

    const handleApprovalRequest = async (newValue, oldValue, eventName) => {
        const request = { newValue, oldValue, isFunctional: true, eventName, isFunctionalObjMatch: true };
        const modifyData = await ValidateRequestByApprovalRules(request);
        if (modifyData.newValue) onSidebarClose();
    };

    const createDropdownLabelRequests = (sourceData, addressTypesData, countriesData, statesData, citiesData) => {
        return {
            addressTypeName: getDropdownLabelName(addressTypesData, 'addressTypeId', 'type', sourceData.addressTypeId),
            countryName: getDropdownLabelName(countriesData, 'countryId', 'name', sourceData.countryId),
            stateName: getDropdownLabelName(statesData, 'stateId', 'name', sourceData.stateId),
            cityName: getDropdownLabelName(citiesData, 'cityId', 'name', sourceData.cityId)
        };
    }


    const extractValue = (field) => {
        return field && typeof field === "object" ? field.value : field;
    };

    const handleEdit = (addressId) => {
        addressId && getById(addressId);
    }

    const handleChangeDropdownList = (data, dataField) => {
        const manageData = { ...formData };
        // setAddressDataField(data)
        if (dataField === "countryId") {
            setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
            setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
            setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
            ref.current.updateFormFieldValue({
                countryId: data.value,
                stateId: null,
                cityId: null
            });
        } else if (dataField === "stateId") {
            // setStateChange(data.value)
            if (data) {
                getAllCities(data.value)
                // const updatedFormFields = manageData?.formFields?.map(field => {
                //     if (field.dataField === "cityId") {
                //         return {
                //             ...field,
                //             fieldType: FormFieldTypes.EDITABLEDROPDOWN,  // Replace the fieldType
                //         };
                //     }
                //     return field;
                // });
                // manageData.formFields = updatedFormFields;
                // setFormData(manageData);
                setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
                ref.current.updateFormFieldValue({
                    stateId: data.value,
                    cityId: null,
                });
            } else {
                // setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, true);
                ref.current.updateFormFieldValue({
                    // stateId: data.value,
                    cityId: null,
                });
                // const updatedFormFields = manageData?.formFields?.map(field => {
                //     if (field.dataField === "cityId" && field.fieldType === FormFieldTypes.EDITABLEDROPDOWN) {
                //         return {
                //             ...field,
                //             fieldType: FormFieldTypes.INPUT,  // Replace the fieldType
                //         };
                //     }
                //     return field;
                // });
                // manageData.formFields = updatedFormFields;
                // setFormData(manageData);
                // ref.current.updateFormFieldValue({
                //     // stateId: data.value,
                //     cityId: null,
                // });
            }

        }
        else if (!isSupplier && dataField === "addressTypeId") {
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

    const handleCheckboxChanges = (data, dataField) => {
        setSelectedCheckbox(data)
        setSelectedCheckboxFeild(dataField)
        if (dataField === "isShippingAndBilling" && data) {
            const manageData = { ...formData };
            let filteredFormFields;
            filteredFormFields = addressFormData.formFields
            manageData.formFields = filteredFormFields;
            setFormData(manageData)
        }
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

    const handleDropdownAction = (data, dataField) => {
        if (dataField === 'stateId') {
            setFieldSetting(formData, 'cityId', FieldSettingType.ISTEXT, data);
            // const selectField = getFieldData(formData, 'cityId');
            // selectField.fieldSetting.isText = data;
            ref.current.updateFormFieldValue({ cityId: null });
            // setFormData(formData);
            // setShouldRerenderFormCreator((prevState) => !prevState);
        } else if (dataField === 'cityId') {
            if (!data) {
                setFieldSetting(formData, 'stateId', FieldSettingType.ISTEXT, data);
                ref.current.updateFormFieldValue({ cityId: null });
            }
        }
    }

    //** Action Handler */
    const formActionHandler = {
        DDL_CHANGED: handleChangeDropdownList,
        CHECK_CHANGE: handleCheckboxChanges,
        DA_CHANGED: handleDropdownAction
    };


    return (
        <div className="row mt-2 add-address-form">
            <FormCreator config={formData} ref={ref} {...formData} onActionChange={formActionHandler} onDropdownAction={formActionHandler}
                onCheckBoxChange={formActionHandler} key={shouldRerenderFormCreator} />
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText={editMode ? "Update" : "Save"}
                        onClick={handleAddEdit}
                        isLoading={isApprovelLoading || isAddLoading || isUpdateLoading}
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