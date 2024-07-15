import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../data/appIcons";
import { ErrorMessage } from "../../../../data/appMessages";
import CardSection from "../../../../components/ui/card/CardSection";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { useLazyGetAllContactTypesQuery } from "../../../../app/services/contactAPI";
import { findFieldData, setOptionFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Component's */
const AddEditContact = React.lazy(() => import("./feature/AddEditContact"));
const ContactDetailCard = React.lazy(() => import("./feature/ContactDetailCard"));

const ContactGrid = ({ keyId, getContactByKeyId, addEditContactMutation, isSupplier, isEditablePage, SecurityKey, getContactById, isSearchFilterShow }) => {

    //** State */
    const editRef = useRef();
    const childRef = useRef();
    const getListRef = useRef();
    const [search, setSearch] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [contactType, setContactType] = useState("")
    const [isModelOpen, setisModelOpen] = useState(false);
    const [showEditIcon, setShowEditIcon] = useState(true);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

    //** API Call's  */
    const [getAllContactTypes, { isSuccess: isGetAllContactTypesSucess, data: allGetAllContactTypesData }] = useLazyGetAllContactTypesQuery();

    //** UseEffect  */

    useEffect(() => {
        if (isEditablePage && SecurityKey) {
            const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
            const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);

            if (hasAddPermission) {
                if (hasAddPermission.hasAccess === true) {
                    setButtonVisible(true);
                } else {
                    setButtonVisible(false);
                }
            }
            if (hasEditPermission && hasEditPermission.isViewOnly === true) {
                setShowEditIcon(true);
            } else if (hasEditPermission.isEditable === true) {
                setShowEditIcon(true);
            } else {
                setShowEditIcon(false);
            }
        }
    }, [isEditablePage, isSupplier, SecurityKey]);

    useEffect(() => {
        getAllContactTypes();
    }, [keyId]);

    useEffect(() => {
        if (isGetAllContactTypesSucess && allGetAllContactTypesData) {
            const filterCondition = (item) => {
                let condition = isSupplier ? item.isForSuppliers : item.isForCustomers
                return condition;
            };
            setOptionFieldSetting(allGetAllContactTypesData, 'contactTypeId', 'type', contactDetailFormData, 'contactTypeId', filterCondition);
            const contactOption = findFieldData(contactDetailFormData, 'contactTypeId');
            setContactType(contactOption?.fieldSetting?.options);
        }
    }, [isGetAllContactTypesSucess, allGetAllContactTypesData]);


    //** Handle Change's */
    const handleChange = (event) => {
        setSearch(event.target.value.trim());
    }
    const onhandleSearch = () => {
        if (search.length >= 3 || selectedDrpvalues.length > 0) {
            onGetContactList();
        } else {
            ToastService.warning(ErrorMessage.CommonErrorMessage)
        }
    }
    const onhandleClear = () => {
        setSearch("");
        setContactType("");
        setSelectedDrpvalues("");
        setShouldRerenderFormCreator((prevState) => !prevState);
    };
    const handleToggleModal = () => {
        setIsEdit(false);
        setisModelOpen(true);
        if (childRef.current) {
            childRef.current.callChildFunction();
        }
    };
    const handleChangeDropdown = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        if (selectedValues.length > 0) {
            setSelectedDrpvalues(selectedValues);
        } else {
            setSelectedDrpvalues("");
        }
    };

    const handleEdit = (contactId) => {
        setIsEdit(true);
        setisModelOpen(!isModelOpen);
        if (editRef.current) {
            editRef.current.callEditFunction(contactId);
        }
    };

    const onGetContactList = () => {
        let request = {
            id: keyId,
            searchText: search,
            contactType: Array.isArray(selectedDrpvalues) ? selectedDrpvalues.join(",") : String(selectedDrpvalues)
        }
        if (getListRef.current) {
            getListRef.current.callChildListFunction(request);
        }
    }

    //** Success */
    const onSuccess = () => {
        onGetContactList();
        setisModelOpen(!isModelOpen);
    };

    const onSidebarClose = () => {
        setisModelOpen(false);
        onGetContactList();
    };


    return (
        <div key={shouldRerenderFormCreator}>
            <CardSection cardTitle={isSearchFilterShow ? "" : "Contact"} handleChange={handleChange} searchInputName="Search By Name and Email"
                searchInput={isSearchFilterShow ? true : false} buttonClassName="theme-button" textWithIcon={true} iconImg={AppIcons.PlusIcon}
                rightButton={buttonVisible ? true : false} buttonText="Add" titleButtonClick={handleToggleModal} clearButton={isSearchFilterShow ? true : false}
                clearTitleButtonClick={onhandleClear} clearButtonText="Clear" searchButton={isSearchFilterShow ? true : false} searchbuttonText="Search"
                searchTitleButtonClick={onhandleSearch} searchFilter={isSearchFilterShow ? true : false} handleChangeDropdown={handleChangeDropdown}
                selectedOptions={selectedDrpvalues} optionsValue={contactType} isMultiSelect={true} placeholder="Search by Contact Type" isCardSection={true}
                isdropdownOpen={true} clearButtonClassName="dark-btn">
                {/* Contact Detail Card */}
                <ContactDetailCard keyId={keyId} getListRef={getListRef} handleEdit={handleEdit} showEditIcon={showEditIcon} getContactByKeyId={getContactByKeyId} />

            </CardSection>
            <div className="sidebar-contact-model">
                <SidebarModel modalTitle="Add/Edit Contact" contentClass="content-45" onClose={onSidebarClose} modalTitleIcon={AppIcons.AddIcon} isOpen={isModelOpen} >
                    {/* Add-Edit Contact */}
                    <AddEditContact isSupplier={isSupplier} onSidebarClose={onSidebarClose} childRef={childRef} onSuccess={onSuccess} isEdit={isEdit}
                        editRef={editRef} SecurityKey={SecurityKey} onGetContactList={onGetContactList} addEditContactMutation={addEditContactMutation}
                        keyId={keyId} isEditablePage={isEditablePage} isOpen={isModelOpen} getContactById={getContactById} />

                </SidebarModel>
            </div>
        </div>
    )
}

export default ContactGrid;