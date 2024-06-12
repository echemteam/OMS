import { useState } from 'react';
import { useRef } from 'react';
import { createContext } from 'react';
import SwalAlert from '../../../services/swalService/SwalService';

const BasicDetailContext = createContext();

export default BasicDetailContext;


export const BasicDetailContextProvider = ({ children }) => {

    const nextRef = useRef(null);
    const { error } = SwalAlert();
    const [activeTab, setActiveTab] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [addressId, setAddressId] = useState(0);

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };

    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const addCustomer = () => {
        if (customerId > 0) {
            if (addressId > 0) {
                setActiveTab((prev) => prev + 1);
            } else {
                error("Please enter Address");
            }
        } else {
            if (nextRef.current) {
                nextRef.current.handleAddBasicDetails();
            }
        }
    };

    return (
        <BasicDetailContext.Provider value={{ nextRef, customerId, setCustomerId, activeTab, setActiveTab, moveNextPage, movePreviewPage, addCustomer, setAddressId }}>
            {children}
        </BasicDetailContext.Provider>
    );
};