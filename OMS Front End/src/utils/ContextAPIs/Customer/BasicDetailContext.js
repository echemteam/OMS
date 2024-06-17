import { useState } from 'react';
import { useRef } from 'react';
import { createContext } from 'react';

const BasicDetailContext = createContext();

export default BasicDetailContext;


export const BasicDetailContextProvider = ({ children }) => {
    const nextRef = useRef(null);
    const molGridRef = useRef();
    const [activeTab, setActiveTab] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [addressId, setAddressId] = useState(0);
    const [contactId, setContactId] = useState(0);
    const [contactNumbers, setContactNumbers] = useState();
    const [addressDataLength, setAddressDataLength] = useState(0)
    const [emailAddressData, setEmailAddressData] = useState();
    const [phoneNumberData, setPhoneNumberData] = useState();

    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState();
    const [contactMainModal, setContactMainModal] = useState(false);
    const [allCountries, setAllCountries] = useState(false);

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };

    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const addCustomer = () => {
        if (customerId > 0) {
            setActiveTab((prev) => prev + 1);
        }
        else {
            if (nextRef.current) {
                nextRef.current.handleAddBasicDetails();
            }
        }
    }

    const handleToggleModal = () => {
        setShowModal(!showModal);
        setIsEdit(false);
    };

    const handleEditModal = (data) => {
        setShowModal(!showModal);
        setIsEdit(true);
        setEditFormData(data)
    }


    return (
        <BasicDetailContext.Provider value={{
            nextRef, customerId, setCustomerId, activeTab, setActiveTab, moveNextPage, movePreviewPage, addCustomer, setAddressId, showModal, editFormData, isEdit, setContactMainModal,
            contactMainModal, setPhoneNumberData, phoneNumberData, setAllCountries, allCountries,
            contactId, setContactId, contactNumbers, setContactNumbers, emailAddressData, setEmailAddressData, handleToggleModal, handleEditModal, molGridRef, setAddressDataLength
        }}>
            {children}
        </BasicDetailContext.Provider>
    );
};