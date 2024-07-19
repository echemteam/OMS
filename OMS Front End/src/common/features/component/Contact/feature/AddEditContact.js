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
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
//** Component's */
const EmailAddressGrid = React.lazy(() => import("../../EmailAddress/EmailAddressGrid"));
const ContactNumbersGrid = React.lazy(() => import("../../ContactNumber/ContactNumbersGrid"));

const AddEditContact = forwardRef(({ keyId, addEditContactMutation, onSidebarClose, onSuccess, childRef, editRef, SecurityKey,
    isEditablePage, isSupplier, isEdit, isOpen, getContactById }) => {

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

    //** API Call's */
    /**
        * This hook dynamically sets the API call based on the module (customer or supplier).
        * The API endpoint and parameters are configured within the SupplierContactDetail OR CustomerContactDetail component.
    */
    const [getById, { isFetching: isGetByIdFetching, isSuccess: isGetByIdSucess, data: isGetByIdData }] = getContactById();
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = addEditContactMutation();

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data) {
            let contactTypeId = null;
            if (isEdit) {
                contactTypeId = data.contactTypeId && typeof data.contactTypeId === "object" ? String(data.contactTypeId.value) : String(data.contactTypeId);
            } else {
                contactTypeId = Array.isArray(data.contactTypeId) ? data.contactTypeId.map(String).join(",") : data.contactTypeId;
            }

            let request = {
                ...data,
                contactId: contactId,
                contactTypeId: contactTypeId,
                [isSupplier ? 'supplierId' : 'customerId']: keyId,
                emailList: emailAddressList.length > 0 ? emailAddressList : null,
                phoneList: phoneNumberList.length > 0 ? modifyPhoneNumberData(phoneNumberList) : null,
                [isSupplier ? 'supplierContactId' : 'customerContactId']: isSupplier ? supplierContactId : customerContactId,
            }
            addEdit(request);
        }
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
        if (!isEdit) {
            let form = { ...contactDetailFormData };
            // setFieldSetting(form, 'contactTypeId', FieldSettingType.MULTISELECT, isSupplier ? false : true);
            setFormData(form);
            if (isOpen) {
                setContactId(0);
                setEditMode(false);
                setPhoneNumberList([]);
                setEmailAddressList([])
            }
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
                        <FormCreator config={formData} ref={ref} {...formData} />
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
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText='Save'
                            isLoading={isAddEditLoading}
                            onClick={handleAddEdit}
                            isDisable={isButtonDisable} />
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

export default AddEditContact;
