/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../data/appIcons";
import CardSection from "../../../../components/ui/card/CardSection";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { addressFormData } from "../../../../pages/customerDetail/features/addressDetail/features/config/AddressForm.data";
//** Compoent's */
const AddEditAddress = React.lazy(() => import("./feature/AddEditAddress"));
const AddressDetailCard = React.lazy(() => import("./feature/AddressDetailCard"));

const AddressGrid = ({ keyId, isSupplier, isEditablePage, SecurityKey, getAddresssByCustomerId, updateAddress, addAddress, getAddresssById }) => {

    //** States */
    const editRef = useRef();
    const getByIdRef = useRef();
    const { formSetting } = addressFormData;
    const [editMode, setEditMode] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [showEditIcon, setShowEditIcon] = useState(true);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [isButtonDisable, setIsButtonDisable] = useState(false);

    //** Use Effect */
    useEffect(() => {
        if (isEditablePage) {
            if (SecurityKey) {
                const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
                const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);
                if (hasAddPermission) {
                    if (hasAddPermission.hasAccess === true) {
                        setButtonVisible(true);
                    }
                    else {
                        setButtonVisible(false);
                    }
                }
                if (hasEditPermission && formSetting) {
                    if (editMode) {
                        if (hasEditPermission.isViewOnly === true) {
                            formSetting.isViewOnly = true;
                            setIsButtonDisable(true);
                        } else {
                            formSetting.isViewOnly = false;
                            setIsButtonDisable(false);
                        }
                    } else if (!editMode) {
                        if (hasAddPermission.hasAccess === true) {
                            formSetting.isViewOnly = false;
                            setIsButtonDisable(false);
                        }
                        if (hasEditPermission && hasEditPermission.isViewOnly === true) {
                            setShowEditIcon(true);
                        } else if (hasEditPermission.isEditable === true) {
                            setShowEditIcon(true);
                        } else {
                            setShowEditIcon(false);
                        }
                    }
                }
            }
        }
    }, [isEditablePage, isSupplier, SecurityKey, editMode]);

    //** Handle Changes */
    const handleToggleModal = () => {
        setEditMode(false);
        setIsModelOpen(true);
    };
    const handleEditAddress = (data) => {
        setIsModelOpen(true);
        setEditMode(true);
        if (editRef.current) {
            editRef.current.callChildEditFunction(data?.addressId);
        }
    }
    const onSidebarClose = () => {
        setIsModelOpen(false);
        setEditMode(false);
        if (getByIdRef.current) {
            getByIdRef.current.callChildFunction();
        }
    };


    return (
        <React.Fragment>
            <CardSection cardTitle="Address" buttonClassName="theme-button" textWithIcon={true} iconImg={AppIcons.PlusIcon}
                rightButton={buttonVisible ? true : false} buttonText="Add" titleButtonClick={handleToggleModal}>
                <AddressDetailCard keyId={keyId} getAddresssByCustomerId={getAddresssByCustomerId} onHandleEditAddress={handleEditAddress}
                    showEditIcon={showEditIcon} getByIdRef={getByIdRef} />
            </CardSection>
            <div className="address-model">
                <SidebarModel modalTitle={editMode ? "Update Address" : "Add Address"} contentClass="content-40" onClose={onSidebarClose}
                    modalTitleIcon={AppIcons.AddIcon} isOpen={isModelOpen}>
                    <AddEditAddress editRef={editRef} isSupplier={isSupplier} isModelOpen={isModelOpen} editMode={editMode} keyId={keyId}
                        isButtonDisable={isButtonDisable} updateAddress={updateAddress} addAddress={addAddress} getAddresssById={getAddresssById}
                        onSidebarClose={onSidebarClose} />
                </SidebarModel>
            </div>
        </React.Fragment>
    );
}

export default AddressGrid;