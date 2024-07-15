/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import { emailConfig } from "./config/AddEditEmailForm.data";
import { Message } from "./utils/ContactMessages";
import { deleteData } from "./utils/ContactEmailAddressUtil";
//** Service's */
import SwalAlert from "../../../../services/swalService/SwalService";
import ToastService from "../../../../services/toastService/ToastService";
import { useDeleteContactEmailMutation } from "../../../../app/services/emailAddressAPI";
//** Component's */
const EmailAddressList = React.lazy(() => import("./feature/EmailAddressList"));
const AddEditEmailModal = React.lazy(() => import("./feature/AddEditEmailAddress"));

const ManageEmailAddress = ({ contactId, emailAddressList, setEmailAddressList, isButtonDisable }) => {

    //** State */
    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();

    //** API Call's */
    const [deleteContactEmail, { isFetching: isDeleteFetching, isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteContactEmailMutation();

    //** UseEffect */

    useEffect(() => {
        if (isDeleteSucess && isDeleteData && !isDeleteFetching) {
            ToastService.success(isDeleteData.errorMessage);
        }
    }, [isDeleteSucess, isDeleteData, isDeleteFetching]);

    useEffect(() => {
        const actionColumn = emailConfig.columns.find(column => column.name === "Action");
        if (isButtonDisable && actionColumn) {
            actionColumn.defaultAction.allowEdit = false;
            actionColumn.defaultAction.allowDelete = false;
        } else if (actionColumn) {
            actionColumn.defaultAction.allowEdit = true;
            actionColumn.defaultAction.allowDelete = true;
        }
    }, [isButtonDisable]);

    //** Handle Changes */
    const handleToggleModal = () => {
        if (emailAddressList?.length < 2) {
            setShowModal(!showModal);
            setIsEdit(false);
        } else {
            if (showModal) {
                setShowModal(!showModal);
            } else {
                ToastService.warning("You have reached the maximum number of Email Address. Please remove an existing email address before adding a new one.")
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
                deleteData(data.emailId, data.id, deleteContactEmail, emailAddressList, setEmailAddressList, Message.EmailDelete, true)
            }
        });
    }
    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <React.Fragment>
            <EmailAddressList molGridRef={molGridRef} handleToggleModal={handleToggleModal} actionHandler={actionHandler}
                isButtonDisable={isButtonDisable} emailAddressList={emailAddressList} />
            {showModal && (
                <AddEditEmailModal contactId={contactId} handleToggleModal={handleToggleModal} onSuccess={onSuccess} showModal={showModal}
                    editFormData={editFormData} isEdit={isEdit} emailAddressList={emailAddressList} setEmailAddressList={setEmailAddressList} />
            )}
        </React.Fragment>
    )

}

export default ManageEmailAddress