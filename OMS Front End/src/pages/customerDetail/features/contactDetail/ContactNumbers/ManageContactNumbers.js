import React, { useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { useDeleteContactPhoneMutation, useLazyGetPhoneByContactIdQuery } from "../../../../../app/services/phoneNumberAPI";
//** Component's */
const ContactNumberList = React.lazy(() => import("./ContactNumberList"));
const AddEditContactNumber = React.lazy(() => import("./AddEditContactNumber"));

const ManageContactNumbers = () => {

    //** State */
    const molGridRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const { contactId, setPhoneNumberData } = useContext(BasicDetailContext);

    //** API Call's */
    const [getList, { isFetching: isGetContactFetching, isSuccess: isGetContactSucess, data: isGetContactData }] = useLazyGetPhoneByContactIdQuery();
    const [deletePhoneNumber, { isFetching: isDeleteFetching, isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteContactPhoneMutation();

    //** UseEffect */
    useEffect(() => {
        contactId && getList(contactId);
    }, [contactId])

    useEffect(() => {
        if (isGetContactSucess && isGetContactData && !isGetContactFetching) {
            setPhoneNumberData(isGetContactData);
        }
    }, [isGetContactSucess, isGetContactData, isGetContactFetching]);

    useEffect(() => {
        if (isDeleteSucess && isDeleteData && !isDeleteFetching) {
            ToastService.success(isDeleteData.errorMessage);
            contactId && getList(contactId);
        }
    }, [isDeleteSucess, isDeleteData, isDeleteFetching]);

    //** Handle Changes */
    const handleToggleModal = () => {
        if (contactId > 0) {
            setShowModal(!showModal);
            setIsEdit(false);
        } else {
            ToastService.warning("Please save the first contact details fields before proceeding");
        }
    };

    //** Success */
    const onSuccess = () => {
        setShowModal(!showModal);
        setIsEdit(false);
        contactId && getList(contactId);
    };

    //** Action Handler */
    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }
    const handleDeleteClick = (data) => {
        deletePhoneNumber(data.phoneId);
    }
    const actionHandler = {
        EDIT: handleEditModal,
        DELETE: handleDeleteClick,
    };

    return (
        <React.Fragment>
            <ContactNumberList molGridRef={molGridRef} handleToggleModal={handleToggleModal} actionHandler={actionHandler} />
            {showModal && (
                <AddEditContactNumber handleToggleModal={handleToggleModal} onSuccess={onSuccess} showModal={showModal} editFormData={editFormData} isEdit={isEdit} />
            )}
        </React.Fragment>
    )

}

export default ManageContactNumbers;