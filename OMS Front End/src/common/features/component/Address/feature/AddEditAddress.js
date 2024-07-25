/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
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

const SetInitialCountry = {
    label: "United States",
    value: 233
}

const AddEditAddress = forwardRef(({ keyId, isSupplier, updateAddress, addAddress, getAddresssById, isModelOpen, editMode, isButtonDisable, onSidebarClose, editRef }) => {

    //** States */
    const ref = useRef();
    const [formData, setFormData] = useState(addressFormData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    // const [getByIdValue, setGetByIdValue] = useState();
    // const [addressDataField, setAddressDataField] = useState();
    const [selectedCheckboxFeild, setSelectedCheckboxFeild] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    // const [stateChage, setStateChange] = useState(null)

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
                    // getAllCities(),
                    getAllCountries(),
                    getAllAddressTypes()
                ]);
            }
        };

        fetchData();
    }, [editMode, isModelOpen]);

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
            // onResetSupplier();
            setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, true);
            setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED, false);
            setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, true);
            if (editMode) {
                setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, false);
                setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED, true);
            }
        } else if (!isModelOpen) {
            onResetForm(addressFormData, setFormData, null);
        } else if (!isSupplier) {
            setFieldSetting(formData, 'addressTypeId', FieldSettingType.MULTISELECT, false);
            setFieldSetting(addressFormData, 'addressTypeId', FieldSettingType.DISABLED, false);
        }
    }, [isSupplier, isModelOpen]);


    const handleStateOption = (responseData) => {
        setDropDownOptionField(responseData, 'stateId', 'name', addressFormData, 'stateId');
    }
    // const handleCityOption = (responseData) => {
    //     setDropDownOptionField(responseData, 'cityId', 'name', addressFormData, 'cityId');
    // }

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
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', addressFormData, 'cityId');
            // handleCityOption(allGetAllCitiesData);
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
            let form = { ...formData };
            let data = isGetByIdData;
            // setGetByIdValue(data);

            if (!isButtonDisable) {
                setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED);
                setFieldSetting(formData, 'stateId', FieldSettingType.DISABLED);
            } else if (isButtonDisable) {
                setFieldSetting(formData, 'cityId', FieldSettingType.DISABLED, true);
                setFieldSetting(formData, 'stateId', FieldSettingType.DISABLED, true);
            }

            if (data.countryId) {
                handleStateOption(allGetAllStatesData);
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
            // let removeData;
            // if (!isSupplier) {
            //     removeData = removeFormFields(addressFormData, ['isShippingAndBilling']);
            //     setFormData(removeData)
            // }
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
            // onResetForm(updatedFormData, setFormData, null);
        }
    }

    useEffect(() => {
        setInitialValue()
    }, [allGetAllStatesData, isModelOpen])

    useEffect(() => {
        if (isGetByIdData) {
            let updatedFormData = { ...formData };
            // let updatedFormData;
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
            getById(keyId);
            onSidebarClose();
        }
    }

    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data) {

            let addressTypeId = null;

            if (isSupplier === true) {
                if (editMode) {
                    addressTypeId = data.addressTypeId && typeof data.addressTypeId === "object" ? String(data.addressTypeId.value) : String(data.addressTypeId);
                } else {
                    addressTypeId = Array.isArray(data.addressTypeId) ? data.addressTypeId.map(String).join(",") : data.addressTypeId;
                }
            } else {
                addressTypeId = data.addressTypeId && typeof data.addressTypeId === "object" ? String(data.addressTypeId.value) : String(data.addressTypeId);
            }

            let transformedData = {
                ...data,
                [isSupplier ? 'supplierId' : 'customerId']: keyId,
                addressTypeId: extractValue(addressTypeId),
                countryId: extractValue(data.countryId),
                stateId: extractValue(data.stateId),
                cityId: extractValue(data.cityId)
            };

            if (editMode) {
                let updateData = {
                    ...transformedData,
                    addressId: isGetByIdData.addressId,
                    customerAddressId: isSupplier === false ? (isGetByIdData ? isGetByIdData.customerAddressId : isGetByIdData.customerAddressId) : 0,
                    supplierAddressId: isSupplier === true ? (isGetByIdData ? isGetByIdData.supplierAddressId : isGetByIdData.supplierAddressId) : 0,
                }
                update(updateData);
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
        // setAddressDataField(data)
        if (dataField === "countryId") {
            setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
            setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
            ref.current.updateFormFieldValue({
                countryId: data.value,
                stateId: null,
            });
        } else if (dataField === "stateId") {
            // setStateChange(data.value)
            getAllCities(data.value)
            // setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
            setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
            ref.current.updateFormFieldValue({
                stateId: data.value,
                cityId: null,
            });
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

    //** Action Handler */
    const formActionHandler = {
        DDL_CHANGED: handleChangeDropdownList,
        CHECK_CHANGE: handleCheckboxChanges
    };

    //** Reset  */
    // const onResetSupplier = () => {
    //     let updatedFormData;
    //     onResetForm(addressFormData, setFormData, null);
    //     updatedFormData = removeFormFields(formData, ['isPreferredShipping', 'isShippingAndBilling', 'isPreferredBilling']);
    //     setFormData(updatedFormData)
    // };

    return (
        <div className="row mt-2 add-address-form">
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

AddEditAddress.propTypes = {
    keyId: PropTypes.number.isRequired,
    isSupplier: PropTypes.bool.isRequired,
    updateAddress: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
    getAddresssById: PropTypes.func.isRequired,
    isModelOpen: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    isButtonDisable: PropTypes.bool.isRequired,
    onSidebarClose: PropTypes.func.isRequired,
    editRef: PropTypes.object
};

export default AddEditAddress;