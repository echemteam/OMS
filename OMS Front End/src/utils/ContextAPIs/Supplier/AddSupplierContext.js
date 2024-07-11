import { useRef, useState } from 'react';
import { createContext } from 'react';

const AddSupplierContext = createContext();

export default AddSupplierContext;


export const AddSupplierContextProvider = ({ children }) => {
    const nextStepRef = useRef(null);
    const [mainId, setMainId] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [supplierId, setSupplierId] = useState(0);
    const [allCountries, setAllCountries] = useState(false);

    //** Using for Contact  */
    const [contactId, setContactId] = useState(0);
    const [contactNumbers, setContactNumbers] = useState();
    const [phoneNumberData, setPhoneNumberData] = useState();
    const [emailAddressData, setEmailAddressData] = useState();
    const [contactMainModal, setContactMainModal] = useState(false);
    //** */

    const [isResponsibleUser, setIsResponsibleUser] = useState(false);

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };

    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const addSupplier = (data) => {
        if (supplierId > 0 && data === 1) {
            if (nextStepRef.current) {
                nextStepRef.current.handleAddSupplierBasicDetails();
            }
        } else if(supplierId > 0){
            setActiveTab((prev) => prev + 1)
        }
        else {
            if (nextStepRef.current) {
                nextStepRef.current.handleAddSupplierBasicDetails();
            }
        }
    }

    return (
        <AddSupplierContext.Provider value={{
            nextStepRef, supplierId, setSupplierId, activeTab, setActiveTab, moveNextPage, movePreviewPage, addSupplier, setAllCountries, allCountries, setMainId, mainId,
            contactId, setContactId, contactMainModal, contactNumbers, setContactNumbers, setPhoneNumberData, setIsResponsibleUser, isResponsibleUser,
            phoneNumberData, emailAddressData, setEmailAddressData, setContactMainModal
        }}>
            {children}
        </AddSupplierContext.Provider>
    );
};