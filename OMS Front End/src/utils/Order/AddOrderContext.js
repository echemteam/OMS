import { useRef, useState } from 'react';
import { createContext } from 'react';

const AddOrderContext = createContext();

export default AddOrderContext;


export const AddOrderContextProvider = ({ children }) => {
    const nextStepRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [orderCustomerId, setOrderCustomerId] = useState(0);

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };

    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const addOrder = (data) => {
        setActiveTab((prev) => prev + 1);

        // if (supplierId > 0 && data === 1) {
        //     if (nextStepRef.current) {
        //         nextStepRef.current.handleAddEditSupplier();
        //     }
        // } else if (supplierId > 0) {
        //     setActiveTab((prev) => prev + 1)
        // }
        // else {
        //     if (nextStepRef.current) {
        //         nextStepRef.current.handleAddEditSupplier();
        //     }
        // }
    }

    return (
        <AddOrderContext.Provider value={{
            nextStepRef, orderCustomerId, setOrderCustomerId, moveNextPage, movePreviewPage, addOrder, activeTab, setActiveTab
        }}>
            {children}
        </AddOrderContext.Provider>
    );
};