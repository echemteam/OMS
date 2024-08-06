import { useRef, useState } from 'react';
import { createContext } from 'react';

const CommonContext = createContext();

export default CommonContext;


export const CommonContextProvider = ({ children }) => {

    const nextRef = useRef(null);
    const settingRef = useRef(null);
    const [customerId, setCustomerId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);

    const [isResponsibleCustomerUser, setIsResponsibleCustomerUser] = useState(true);
    const [isResponsibleSupplierUser, setIsResponsibleSupplierUser] = useState(true);
 

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
        <CommonContext.Provider value={{
            customerId, setCustomerId, supplierId, setSupplierId, isResponsibleCustomerUser, setIsResponsibleCustomerUser, supplierContactId, setSupplierContactId,
            isResponsibleSupplierUser, setIsResponsibleSupplierUser, moveNextPage, movePreviewPage, moveNextPageValidation, customerContactId, setCustomerContactId
        }}>
            {children}
        </CommonContext.Provider>
    );
};