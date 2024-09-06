/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import { ContactType, FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "../config/ContactDetailForm.data";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import { modifyEmailAddressData, modifyPhoneNumberData } from "../../../../../utils/TransformData/TransformAPIData";
import { setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import PropTypes from "prop-types";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { useValidateAndAddApprovalRequests } from "../../../../../utils/CustomHook/useValidateAndAddApproval";
//** Component's */
const EmailAddressGrid = React.lazy(() => import("../../EmailAddress/EmailAddressGrid"));
const ContactNumbersGrid = React.lazy(() => import("../../ContactNumber/ContactNumbersGrid"));

const AddEditContact = forwardRef(({ keyId, addEditContactMutation, onSidebarClose, onSuccess, childRef, editRef, SecurityKey,
    isEditablePage, isSupplier, isEdit, isOpen, getContactById, getContectTypeId, customerId, isOrderManage, onhandleApiCall, contryIdCode, orderResetValue }) => {

    //** State */
    const ref = useRef();
    const { formSetting } = contactDetailFormData;
    const [contactId, setContactId] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [customerContactId, setCustomerContactId] = useState(0);
    const [supplierContactId, setSupplierContactId] = useState(0);
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const [phoneNumberList, setPhoneNumberList] = useState([]);
    const [emailAddressList, setEmailAddressList] = useState([]);
    const [formData, setFormData] = useState(contactDetailFormData);
    const { ValidateRequestByApprovalRules, getEventName, isApprovelLoading } = useValidateAndAddApprovalRequests();

    //** API Call's */
    /**
        * This hook dynamically sets the API call based on the module (customer or supplier).
        * The API endpoint and parameters are configured within the SupplierContactDetail OR CustomerContactDetail component.
    */
    const [getById, { isFetching: isGetByIdFetching, isSuccess: isGetByIdSucess, data: isGetByIdData }] = getContactById();
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = addEditContactMutation();


    const handleAddEdit = async () => {
        if (isSupplier) {
            handlWithoutApprovalAddEdit();
        } else if (isEditablePage) {
            handleApprovalAddEdit()
        } else {
            handlWithoutApprovalAddEdit();
        }
    }

    const handleApprovalAddEdit = async () => {
        const data = ref.current.getFormData();
        if (!data) return;
        const { filteredTypeIds, matchTypeIds } = isContactType(data.contactTypeId, isEdit);

        let eventName;
        let eventNameArr = [];
        if (Array.isArray(data.contactTypeId) && data.contactTypeId.length === 1) {
            eventName = getEventName(data.contactTypeId[0], isEdit, 'AddEditContactCustomer');
        } else if (Array.isArray(data.contactTypeId) && data.contactTypeId.length >= 2) {
            eventNameArr = data.contactTypeId.map((id) => {
                return getEventName(id, isEdit, 'AddEditContactCustomer');
            }).filter(event => event);
        } else {
            eventName = getEventName(data.contactTypeId, isEdit, 'AddEditContactCustomer');
        }
        if (matchTypeIds.length > 0 || matchTypeIds?.value) {
            if (eventNameArr.length > 0) {
                const matchTypeIdsArray = matchTypeIds.split(',');
                for (let index = 0; index < eventNameArr.length; index++) {
                    const event = eventNameArr[index];
                    const currentTypeId = matchTypeIdsArray[index];
                    const request = requestData(data, currentTypeId, isSupplier, keyId, emailAddressList, phoneNumberList, supplierContactId, customerContactId);
                    let req = {
                        ...request,
                        customerId: customerId ? customerId : request.customerId
                    }
                    await handleApprovalRequest(req, formData.initialState, event, filteredTypeIds.length);
                }
            } else if (eventName) {
                const request = requestData(data, matchTypeIds, isSupplier, keyId, emailAddressList, phoneNumberList, supplierContactId, customerContactId);
                let req = {
                    ...request,
                    customerId: customerId ? customerId : request.customerId
                }
                await handleApprovalRequest(req, formData.initialState, eventName, filteredTypeIds.length);
            }

        }
        if (filteredTypeIds.length > 0) {
            const request = requestData(data, filteredTypeIds, isSupplier, keyId, emailAddressList, phoneNumberList, supplierContactId, customerContactId);
            let req = {
                ...request,
                customerId: customerId ? customerId : request.customerId
            }
            addEdit(req);
        }
    };
    // Normalize typeIds to an array of values
    const normalizeTypeIds = (typeIds) => {
        if (Array.isArray(typeIds)) {
            return typeIds;
        }
        if (typeof typeIds === 'object' && typeIds.value !== undefined) {
            return [typeIds.value];
        }
        if (typeof typeIds === 'number') {
            return [typeIds];
        }
        return [];
    };
    const isContactType = (typeIds, isEdit) => {
        let filteredTypeIds = [];
        let matchTypeIds = [];

        const typeIdsArray = normalizeTypeIds(typeIds);

        if (isEdit) {
            if (typeIdsArray.includes(ContactType.INVOICESUBMISSION) || typeIdsArray.includes(ContactType.INVOICEFOLLOWUP)) {
                return {
                    filteredTypeIds: [],
                    matchTypeIds: getCustomerContactTypeId(typeIdsArray)
                };
            } else {
                return {
                    filteredTypeIds: getCustomerContactTypeId(typeIdsArray),
                    matchTypeIds: []
                };
            }
        } else if (!isEdit) {
            if (isSupplier) {
                // Remove the supplier-related contact type if it exists.
                //filteredTypeIds = typeIdsArray.filter(id => id !== ContactType.INVOICESUBMISSION);
            } else if (!isSupplier) {
                // Remove customer-related contact types (INVOICESUBMISSION and AP) if they exist.
                filteredTypeIds = typeIdsArray?.filter(id => id !== ContactType.INVOICESUBMISSION && id !== ContactType.INVOICEFOLLOWUP);
                matchTypeIds = typeIdsArray.filter(id => id === ContactType.INVOICESUBMISSION || id === ContactType.INVOICEFOLLOWUP);
            }
        }
        return {
            filteredTypeIds: filteredTypeIds.length > 0 ? getCustomerContactTypeId(filteredTypeIds, isEdit) : filteredTypeIds, // Values remaining after filtering
            matchTypeIds: matchTypeIds.length > 0 ? getCustomerContactTypeId(matchTypeIds, isEdit) : matchTypeIds,      // Values that were removed
        };
    };
    const handleApprovalRequest = async (newValue, oldValue, eventName, remainingContactLength) => {
        const request = { newValue, oldValue, isFunctional: true, eventName, isFunctionalObjMatch: true };
        const modifyData = await ValidateRequestByApprovalRules(request);
        if (remainingContactLength === 0) {
            if (modifyData.newValue && onSuccess) {
                onSuccess();
            }
        }
    };
    const getCustomerContactTypeId = (contactTypeId, isEdit) => {
        return Array.isArray(contactTypeId) ? contactTypeId.map(String).join(",") : contactTypeId;
    };
    const handlWithoutApprovalAddEdit = () => {
        const data = ref.current.getFormData();
        if (!data) return;

        const contactTypeId = getContactTypeId(data.contactTypeId, isEdit);
        const request = requestData(data, contactTypeId, isSupplier, keyId, emailAddressList, phoneNumberList, supplierContactId, customerContactId);
        let req = {
            ...request,
            customerId: customerId ? customerId : request.customerId
        }
        addEdit(req);
    };

    const getContactTypeId = (contactTypeId, isEdit) => {
        if (isEdit) {
            return contactTypeId && typeof contactTypeId === "object" ? String(contactTypeId.value) : String(contactTypeId);
        } else {
            return Array.isArray(contactTypeId) ? contactTypeId.map(String).join(",") : contactTypeId;
        }
    };

    const requestData = (data, contactTypeId, isSupplier, keyId, emailAddressList, phoneNumberList, supplierContactId, customerContactId) => {
        return {
            ...data,
            contactId: contactId,
            contactTypeId: String(contactTypeId),
            [isSupplier ? 'supplierId' : 'customerId']: keyId,
            emailList: emailAddressList.length > 0 ? modifyEmailAddressData(emailAddressList) : null,
            phoneList: phoneNumberList.length > 0 ? modifyPhoneNumberData(phoneNumberList) : null,
            [isSupplier ? 'supplierContactId' : 'customerContactId']: isSupplier ? supplierContactId : customerContactId,
        };
    };

    //** UseEffect */
    useEffect(() => {
        if (isAddEditSuccess && isAddEditData) {

            if (isAddEditData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isAddEditData.errorMessage);
                return;
            }
            if (onSuccess) {
                onSuccess();
                setContactId(isAddEditData?.keyValue);
                ToastService.success(isAddEditData.errorMessage);
                if (isOrderManage) {
                    onhandleApiCall(getContectTypeId)
                }
            }
        }
    }, [isAddEditSuccess, isAddEditData]);

    useEffect(() => {
        if (!isGetByIdFetching && isGetByIdSucess && isGetByIdData) {
            let data = isGetByIdData;
            let form = { ...contactDetailFormData };
            form.initialState = {
                firstName: data.firstName,
                lastName: data.lastName,
                contactTypeId: data.contactTypeId,
                isPrimary: data.isPrimary
            }
            setFormData(form);
            setContactId(data.contactId);
            isSupplier ? setSupplierContactId(data?.supplierContactId) : setCustomerContactId(data?.customerContactId);
            setFieldSetting(form, 'contactTypeId', FieldSettingType.MULTISELECT);

            const modifyPhoneNumberList = isGetByIdData.phoneNumberList.map((item, index) => ({
                ...item,
                id: index + 1,
                extension: item.extension === 0 ? '-' : item.extension
            }));
            const modifyEmailAddressLst = isGetByIdData.emailAddressList.map((item, index) => ({
                ...item,
                id: index + 1
            }));
            setPhoneNumberList(modifyPhoneNumberList);
            setEmailAddressList(modifyEmailAddressLst);
        }
    }, [isGetByIdFetching, isGetByIdSucess]);

    //** Use Imperative Handle  */
    useImperativeHandle(editRef, () => ({
        callEditFunction: handleEditMode,
    }));

    useEffect(() => {
        if (isEditablePage && SecurityKey) {
            const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);
            const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
            if (hasEditPermission && formSetting) {
                if (editMode) {
                    if (hasEditPermission.isViewOnly === true) {
                        formSetting.isViewOnly = true;
                        setIsButtonDisable(true);
                    }
                    else {
                        formSetting.isViewOnly = false;
                        setIsButtonDisable(false);
                    }
                }
                else if (!editMode) {
                    if (hasAddPermission.hasAccess === true) {
                        formSetting.isViewOnly = false;
                        setIsButtonDisable(false);
                    }
                }
            }
        }
    }, [editMode, editRef, SecurityKey])

    const handleEditMode = (contactId) => {
        setEditMode(true);
        contactId && getById(contactId);
        // setFieldSetting(contactDetailFormData, 'contactTypeId', FieldSettingType.DISABLED, true);
    }

    useEffect(() => {
        if (!isEdit && !isOrderManage) {
            if (isSupplier) {
                setFieldSetting(contactDetailFormData, 'contactTypeId', FieldSettingType.MULTISELECT, false);
            } else {
                setFieldSetting(contactDetailFormData, 'contactTypeId', FieldSettingType.MULTISELECT, true);
            }
            let form = { ...contactDetailFormData };

            setFormData(form);
            if (isOpen) {
                setContactId(0);
                setEditMode(false);
                setPhoneNumberList([]);
                setEmailAddressList([])
            }
        }
        if (isOrderManage) {
            setFieldSetting(contactDetailFormData, 'contactTypeId', FieldSettingType.DISABLED, true);
            setFieldSetting(contactDetailFormData, 'contactTypeId', FieldSettingType.MULTISELECT, false);
            let form = { ...contactDetailFormData };
            form.initialState = {
                ...form.initialState,
                contactTypeId: getContectTypeId,
            }
            setFormData(form);
            // setShouldRerenderFormCreator((prevState) => !prevState);
        }
    }, [isOpen])

    //** Reset Data */
    const onResetData = () => {
        setFieldSetting(contactDetailFormData, 'contactTypeId', FieldSettingType.DISABLED, false);
        let form = { ...contactDetailFormData };
        form.initialState = { ...contactDetailFormData.initialState };
        setFormData(form);
        setCustomerContactId(0);
        setSupplierContactId(0);
    };

    //** Use Imperative Handle  */
    useImperativeHandle(childRef, () => ({
        callChildFunction: onResetData,
    }));

    useEffect(() => {
        if (orderResetValue && isOrderManage) {
            setPhoneNumberList([]);
            setEmailAddressList([])
        }
    }, [orderResetValue])

    return (
        <div>
            {!isGetByIdFetching ?
                <React.Fragment>
                    <div className="row mt-2 addEditContact-form">
                        <FormCreator config={formData} ref={ref} {...formData} />
                    </div>
                    <div className="row">
                        <EmailAddressGrid isButtonDisable={isButtonDisable} emailAddressList={emailAddressList}
                            setEmailAddressList={setEmailAddressList} contactId={contactId} isOrderManage={isOrderManage} />
                        <ContactNumbersGrid isButtonDisable={isButtonDisable} phoneNumberList={phoneNumberList}
                            setPhoneNumberList={setPhoneNumberList} contactId={contactId} contryIdCode={contryIdCode} isOrderManage={isOrderManage} />
                    </div>
                </React.Fragment>
                : <DataLoader />
            }
            <div className="col-md-12 mt-3">
                <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                        {/* {!enableDisableButton && */}
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText='Save'
                            isLoading={isApprovelLoading || isAddEditLoading}
                            onClick={handleAddEdit}
                            isDisable={isButtonDisable} />
                        {/* } */}
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={onSidebarClose} />
                    </div>
                </div>
            </div>
        </div>
    );
});

AddEditContact.propTypes = {
    keyId: PropTypes.number,
    addEditContactMutation: PropTypes.func.isRequired,
    onSidebarClose: PropTypes.func,
    onSuccess: PropTypes.func,
    childRef: PropTypes.shape({
        current: PropTypes.object
    }),
    editRef: PropTypes.shape({
        current: PropTypes.object
    }),
    SecurityKey: PropTypes.shape({
        EDIT: PropTypes.string,
        ADD: PropTypes.string
    }),
    isEditablePage: PropTypes.bool,
    isSupplier: PropTypes.bool,
    isEdit: PropTypes.bool,
    isOpen: PropTypes.bool,
    getContactById: PropTypes.func.isRequired,
    getContectTypeId: PropTypes.string,
    customerId: PropTypes.number,
    isOrderManage: PropTypes.bool,
    onhandleApiCall: PropTypes.func
};

export default AddEditContact;
