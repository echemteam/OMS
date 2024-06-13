import React, { useContext, useEffect, useRef, useState } from "react";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { useDeleteContactEmailMutation, useLazyGetEmailByContactIdQuery } from "../../../../../app/services/emailAddressAPI";
//** Component's */
const EmailAddressList = React.lazy(() => import("./EmailAddressList"));
const AddEditEmailModal = React.lazy(() => import("./AddEditEmailAddress"));

const ManageEmailAddress = () => {

    //** State */
    const molGridRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const { contactId, setEmailAddressData } = useContext(BasicDetailContext);

    //** API Call's */
    const [getEmailList, { isFetching: isGetContactFetching, isSuccess: isGetContactSucess, data: isGetContactData }] = useLazyGetEmailByContactIdQuery();
    const [deleteContactEmail, { isFetching: isDeleteFetching, isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteContactEmailMutation();

    //** UseEffect */
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

    //** Handle Changes */
    const handleToggleModal = () => {
        if (contactId > 0) {
            setShowModal(!showModal);
            setIsEdit(false);
        } else {
            ToastService.warning("Please save the first contact details fields before proceeding.");
        }
    };

    //** Success */
    const onSuccess = () => {
        setShowModal(!showModal);
        setIsEdit(false);
        contactId && getEmailList(contactId);
    };

    //** Action Handler */
    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }
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