import { useRef } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const BasicDetailContext = createContext();

export default BasicDetailContext;


export const BasicDetailContextProvider = ({ children }) => {

    const molGridRef = useRef();

    //****  If we have supplier page we have set main id as supplierId. and If we have customer page we have set main id as customerId   */
    const [mainId, setMainId] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    //** */

    //** Shipping Method's */
    const [deliveryMethodsList, setDeliveryMethodsList] = useState([]);
    const [carriersList, setCarriersList] = useState([]);
    //** */

    //** Using for Contact  */
    const [contactId, setContactId] = useState(0);
    const [contactNumbers, setContactNumbers] = useState();
    const [phoneNumberData, setPhoneNumberData] = useState();
    const [emailAddressData, setEmailAddressData] = useState();
    const [contactMainModal, setContactMainModal] = useState(false);
    //** */

    //** Set Cuntries Data */
    const [allCountries, setAllCountries] = useState(false);
    //** */

    //** Use for Tab's */
    const nextRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };
    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };
    //** */

    //** Use for Move next step */
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
    //** */

    return (
        <BasicDetailContext.Provider value={{
            nextRef, customerId, setCustomerId, activeTab, setActiveTab, moveNextPage, movePreviewPage, addCustomer, contactMainModal, setPhoneNumberData,
            phoneNumberData, setAllCountries, allCountries, setMainId, mainId, contactId, setContactId, contactNumbers, setContactNumbers, setContactMainModal,
            emailAddressData, setEmailAddressData, molGridRef, setDeliveryMethodsList, deliveryMethodsList, setCarriersList, carriersList
        }}>
            {children}
        </BasicDetailContext.Provider>
    );
};