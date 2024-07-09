import { useRef, useState } from 'react';
import { createContext } from 'react';

const CustomerSupplierContext = createContext();

export default CustomerSupplierContext;


export const CustomerSupplierContextProvider = ({ children }) => {

    const nextRef = useRef(null);
    const settingRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);

    const [isResponsibleCustomerUser, setIsResponsibleCustomerUser] = useState(true);
    const [isResponsibleSupplierUser, setIsResponsibleSupplierUser] = useState(true);

    //** Shipping Method's */
    const [carriersList, setCarriersList] = useState([]);
    const [deliveryMethodsList, setDeliveryMethodsList] = useState([]);
    //** */

    //** Using for Contact  */
    const [phoneNumberData, setPhoneNumberData] = useState();
    const [emailAddressData, setEmailAddressData] = useState();
    //** */

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };
    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const moveNextPageValidation = (data) => {
        if (customerId > 0) {
            moveNextPage();
        }
        else {
            if (nextRef.current) {
                nextRef.current.handleAddBasicDetails();
            }
        }
        if (data === 5) {
            if (settingRef.current) {
                settingRef.current.onhandleEdit();
            }
        }
    }

    return (
        <CustomerSupplierContext.Provider value={{
            customerId, setCustomerId, supplierId, setSupplierId, isResponsibleCustomerUser, setIsResponsibleCustomerUser,
            isResponsibleSupplierUser, setIsResponsibleSupplierUser, moveNextPage, movePreviewPage, moveNextPageValidation,
            phoneNumberData, setPhoneNumberData, emailAddressData, setEmailAddressData, carriersList, setCarriersList, deliveryMethodsList, setDeliveryMethodsList
        }}>
            {children}
        </CustomerSupplierContext.Provider>
    );
};