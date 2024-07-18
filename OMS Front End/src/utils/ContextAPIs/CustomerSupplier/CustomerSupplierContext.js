import { useRef, useState } from 'react';
import { createContext } from 'react';

const CustomerSupplierContext = createContext();

export default CustomerSupplierContext;


export const CustomerSupplierContextProvider = ({ children }) => {

    const supplierNextRef = useRef(null);
    const customerNextRef = useRef(null);
    const customerSettingRef = useRef(null);

    const [customerId, setCustomerId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);

    const [customerActiveTab, setCustomerActiveTab] = useState(0);
    const [supplierActiveTab, setSupplierActiveTab] = useState(0);

    const [isResponsibleCustomerUser, setIsResponsibleCustomerUser] = useState(true);
    const [isResponsibleSupplierUser, setIsResponsibleSupplierUser] = useState(true);

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };
    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const moveSupplierNextPageValidation = (data) => {
        if (supplierId > 0 && data === 1) {
            if (supplierNextRef.current) {
                supplierNextRef.current.handleAddEditSupplier();
            }
        } else if (supplierId > 0) {
            setActiveTab((prev) => prev + 1)
        }
        else {
            if (supplierNextRef.current) {
                supplierNextRef.current.handleAddEditSupplier();
            }
        }
    }

    const moveCustomerNextPageValidation = (data) => {
        if (customerId > 0 && data === 1) {
            if (customerNextRef.current) {
                customerNextRef.current.handleAddBasicDetails();
            }
        } else if (customerId > 0) {
            setActiveTab((prev) => prev + 1)
        }
        else {
            if (customerNextRef.current) {
                customerNextRef.current.handleAddBasicDetails();
            }
        }
        if (data === 5) {
            setShowSubBackButton(false);
        }
    }


    const saveFinacialSetting = () => {
        if (customerSettingRef.current) {
            customerSettingRef.current.onhandleEdit();
        }
    }

    return (
        <CustomerSupplierContext.Provider value={{ nextRef, }}>
            {children}
        </CustomerSupplierContext.Provider>
    );
};