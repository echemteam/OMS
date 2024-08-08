/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "../config/ContactDetailForm.data";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import { modifyPhoneNumberData } from "../../../../../utils/TransformData/TransformAPIData";
import { setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import PropTypes from "prop-types";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
//** Component's */
const EmailAddressGrid = React.lazy(() => import("../../EmailAddress/EmailAddressGrid"));
const ContactNumbersGrid = React.lazy(() => import("../../ContactNumber/ContactNumbersGrid"));

const AddEditContact = forwardRef(({ keyId, addEditContactMutation, onSidebarClose, onSuccess, childRef, editRef, SecurityKey,
    isEditablePage, isSupplier, isEdit, isOpen, getContactById, getContectTypeId, customerId, isOrderManage, onhandleApiCall, enableDisableButton }) => {

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
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);


    //** API Call's */
    /**
        * This hook dynamically sets the API call based on the module (customer or supplier).
        * The API endpoint and parameters are configured within the SupplierContactDetail OR CustomerContactDetail component.
    */
    const [getById, { isFetching: isGetByIdFetching, isSuccess: isGetByIdSucess, data: isGetByIdData }] = getContactById();
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = addEditContactMutation();


    const handleAddEdit = () => {
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
            // customerId: 1093,
            contactTypeId: String(contactTypeId),
            [isSupplier ? 'supplierId' : 'customerId']: keyId,
            emailList: emailAddressList.length > 0 ? emailAddressList : null,
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
        setFieldSetting(contactDetailFormData, 'contactTypeId', FieldSettingType.DISABLED, true);
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


    return (
        <div>
            {!isGetByIdFetching ?
                <React.Fragment>
                    <div className="row mt-2 addEditContact-form">
                        <FormCreator config={formData} ref={ref} {...formData} key={shouldRerenderFormCreator} />
                    </div>
                    <div className="row">
                        <EmailAddressGrid isButtonDisable={isButtonDisable} emailAddressList={emailAddressList}
                            setEmailAddressList={setEmailAddressList} contactId={contactId} />
                        <ContactNumbersGrid isButtonDisable={isButtonDisable} phoneNumberList={phoneNumberList}
                            setPhoneNumberList={setPhoneNumberList} contactId={contactId} />
                    </div>
                </React.Fragment>
                : <DataLoader />
            }
            <div className="col-md-12 mt-3">
                <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                        {!enableDisableButton &&
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText='Save'
                                isLoading={isAddEditLoading}
                                onClick={handleAddEdit}
                                isDisable={isButtonDisable} />
                        }
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
