/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { Message } from "../Util/ContactMessages";
import { deleteData } from "../Util/ContactEmailAddressUtil";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import SwalAlert from "../../../../../services/swalService/SwalService";
import ToastService from "../../../../../services/toastService/ToastService";
import { useDeleteContactEmailMutation } from "../../../../../app/services/emailAddressAPI";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { emailConfig } from "./config/AddEditEmailForm.data";
//** Component's */
const EmailAddressList = React.lazy(() => import("./EmailAddressList"));
const AddEditEmailModal = React.lazy(() => import("./AddEditEmailAddress"));

const ManageEmailAddress = ({ onGetContactList, isSupplier, isButtonDisable }) => {

    //** State */
    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const { setEmailAddressData, emailAddressData } = useContext(isSupplier ? AddSupplierContext : BasicDetailContext);

    //** API Call's */
    const [deleteContactEmail, { isFetching: isDeleteFetching, isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteContactEmailMutation();

    //** UseEffect */

    useEffect(() => {
        if (isDeleteSucess && isDeleteData && !isDeleteFetching) {
            ToastService.success(isDeleteData.errorMessage);
            onGetContactList();
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
        if (emailAddressData?.length < 2) {
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
                deleteData(data.emailId, data.id, deleteContactEmail, emailAddressData, setEmailAddressData, Message.EmailDelete, true)
            }
        });
    }
    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <React.Fragment>
            <EmailAddressList isSupplier={isSupplier} molGridRef={molGridRef} handleToggleModal={handleToggleModal} actionHandler={actionHandler}
                isButtonDisable={isButtonDisable} />
            {showModal && (
                <AddEditEmailModal isSupplier={isSupplier} handleToggleModal={handleToggleModal} onSuccess={onSuccess} showModal={showModal} editFormData={editFormData} isEdit={isEdit} />
            )}
        </React.Fragment>
    )

}

export default ManageEmailAddress