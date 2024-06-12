import { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { createContext } from 'react';
import SwalAlert from '../../../services/swalService/SwalService';
import { addEditEmailFormData } from '../../../pages/customerDetail/features/contactDetail/EmailAddress/config/AddEditEmailForm.data';
import { useAddContactEmailMutation, useUpdateContactEmailMutation } from '../../../app/services/contactAPI';
import ToastService from '../../../services/toastService/ToastService';
import BasicDetailContext from './BasicDetailContext';

const ContactContext = createContext();

export default ContactContext;


export const ContactContextProvider = ({ children }) => {

    const formRef = useRef();
    const molGridRef = useRef();
    const [formData, setFormData] = useState(addEditEmailFormData);

    const [contactId, setContactId] = useState(0);
    const [contactNumbers, setContactNumbers] = useState();
    const [emailAddressData, setEmailAddressData] = useState();

    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [editFormData, setEditFormData] = useState();

    //** API Call's */
    const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddContactEmailMutation();
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateContactEmailMutation();


    useEffect(() => {
        if (isAddSuccess && isAddData) {
            handleSubToggleModal();
            ToastService.success(isAddData.errorMessage);
            onResetData();
        }
    }, [isAddSuccess, isAddData]);

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            handleSubToggleModal();
            console.log('contactNumbers',emailAddressData);
            ToastService.success(isUpdateData.errorMessage);
            onResetData();
        }
    }, [isUpdateSuccess, isUpdateData]);


    //** Reset Data */
    const onResetData = () => {
        let form = { ...addEditEmailFormData };
        form.initialState = { ...addEditEmailFormData.initialState };
        setFormData(form);
    };

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = formRef.current.getFormData();
        if (data && !data.emailId) {
            let request = {
                ...data,
                contactId: contactId
            }
            add(request);
        } else if (data && data.emailId) {
            update(data);
        }
    };

    const handleEditMode = () => {
        if (isEdit && editFormData) {
            let form = { ...addEditEmailFormData };
            form.initialState = editFormData;
            setFormData(form);
        }
    }

    const handleToggleModal = () => {
        onResetData();
        setShowModal(!showModal);
        setIsEdit(false);
    };

    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }

    const handleSubToggleModal = () => {
        onResetData();
        setShowSubModal(!showSubModal);
        setIsEdit(false);
    };

    const handleSubEditModal = (data) => {
        setShowSubModal(!showSubModal);
        setIsEdit(true);
        setEditFormData(data)
    }




    return (
        <ContactContext.Provider value={{
            editFormData, isEdit, handleAddEdit, handleEditMode, formData, formRef, isAddLoading, showModal, handleSubToggleModal, setShowSubModal, showSubModal,
            contactId, setContactId, contactNumbers, setContactNumbers, emailAddressData, setEmailAddressData, handleToggleModal, handleEditModal, molGridRef,
            handleSubEditModal
        }}>
            {children}
        </ContactContext.Provider>
    );
};