import React, { useContext, useEffect, useRef, useState } from "react";
import EmailAddressList from "./EmailAddressList";
import AddEditEmailModal from "./AddEditEmailAddress";
import { useDeleteContactEmailMutation, useLazyGetEmailByContactIdQuery } from "../../../../../app/services/emailAddressAPI";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import ToastService from "../../../../../services/toastService/ToastService";

const ManageEmailAddress = () => {

    const molGridRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const { contactId, setEmailAddressData } = useContext(BasicDetailContext);

    const [getEmailList, { isFetching: isGetContactFetching, isSuccess: isGetContactSucess, data: isGetContactData }] = useLazyGetEmailByContactIdQuery();
    const [deleteContactEmail, { isFetching: isDeleteFetching, isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteContactEmailMutation();

    useEffect(() => {
        contactId && getEmailList(contactId);
    }, [contactId])

    useEffect(() => {
        if (isGetContactSucess && isGetContactData && !isGetContactFetching) {
            setEmailAddressData(isGetContactData);
        }
    }, [isGetContactSucess, isGetContactData, isGetContactFetching]);

    useEffect(() => {
        if (isDeleteSucess && isDeleteData && !isDeleteFetching) {
            ToastService.success(isDeleteData.errorMessage);
            contactId && getEmailList(contactId);
        }
    }, [isDeleteSucess, isDeleteData, isDeleteFetching]);

    const handleToggleModal = () => {
        setShowModal(!showModal);
        setIsEdit(false);
    };

    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }

    //** Success */
    const onSuccess = () => {
        setShowModal(!showModal);
        setIsEdit(false);
        contactId && getEmailList(contactId);
    };

    const handleDeleteClick = (data) => {
        deleteContactEmail(data.emailId);
    }

    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <React.Fragment>
            <EmailAddressList molGridRef={molGridRef} handleToggleModal={handleToggleModal} actionHandler={actionHandler} />
            {showModal && (
                <AddEditEmailModal handleToggleModal={handleToggleModal} onSuccess={onSuccess} showModal={showModal} editFormData={editFormData} isEdit={isEdit} />
            )}
        </React.Fragment>
    )

}

export default ManageEmailAddress