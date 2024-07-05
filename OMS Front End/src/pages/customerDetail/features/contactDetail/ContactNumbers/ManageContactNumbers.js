/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { Message } from "../Util/ContactMessages";
import { deleteData } from "../Util/ContactEmailAddressUtil";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import SwalAlert from "../../../../../services/swalService/SwalService";
import ToastService from "../../../../../services/toastService/ToastService";
import { useDeleteContactPhoneMutation, useGetAllPhoneTypesQuery, useLazyGetPhoneByContactIdQuery } from "../../../../../app/services/phoneNumberAPI";
import { addEditContactsFormData } from "./config/AddEditContactsForm.data";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Component's */
const ContactNumberList = React.lazy(() => import("./ContactNumberList"));
const AddEditContactNumber = React.lazy(() => import("./AddEditContactNumber"));

const ManageContactNumbers = ({ onGetContactList, isSupplier }) => {

    //** State */
    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const { contactId, setPhoneNumberData, phoneNumberData } = useContext(isSupplier ? AddSupplierContext : BasicDetailContext);

    //** API Call's */
    const [getList, { isFetching: isGetContactFetching }] = useLazyGetPhoneByContactIdQuery();
    const [deletePhoneNumber, { isFetching: isDeleteFetching, isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteContactPhoneMutation();
    const { data, isSuccess } = useGetAllPhoneTypesQuery();

    //** UseEffect */
    useEffect(() => {
        contactId && getList(contactId);
    }, [contactId]);

    useEffect(() => {
        if (isSuccess && data) {
            const getData = data.map(item => ({
                value: item.phoneTypeId,
                label: item.type
            }))
            const dropdownField = addEditContactsFormData.formFields.find(item => item.dataField === "phoneTypeId");
            dropdownField.fieldSetting.options = getData;
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isDeleteSucess && isDeleteData && !isDeleteFetching) {
            ToastService.success(isDeleteData.errorMessage);
            contactId && getList(contactId);
            onGetContactList();
        }
    }, [isDeleteSucess, isDeleteData, isDeleteFetching]);

    //** Handle Changes */
    const handleToggleModal = () => {
        if (phoneNumberData?.length < 5) {
            setShowModal(!showModal);
            setIsEdit(false);
        } else {
            if (showModal) {
                setShowModal(!showModal);
            } else {
                ToastService.warning("You have reached the maximum number of contacts. Please remove an existing contact before adding a new one.")
            }
        }
    };

    //** Success */
    const onSuccess = () => {
        setShowModal(!showModal);
        setIsEdit(false);
    };

    //** Action Handler */
    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }
    const handleDeleteClick = (data) => {
        confirm("Delete?",
            "Are you sure you want to Delete?",
            "Delete", "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                deleteData(data.phoneId, data.id, deletePhoneNumber, phoneNumberData, setPhoneNumberData, Message.ContactNumberDelete, false)
            }
        });
    }
    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <React.Fragment>
            <ContactNumberList isSupplier={isSupplier} molGridRef={molGridRef} handleToggleModal={handleToggleModal} actionHandler={actionHandler} isLoading={isGetContactFetching} />
            {showModal && (
                <AddEditContactNumber isSupplier={isSupplier} handleToggleModal={handleToggleModal} onSuccess={onSuccess} showModal={showModal} editFormData={editFormData} isEdit={isEdit} />
            )}
        </React.Fragment>
    )

}

export default ManageContactNumbers;