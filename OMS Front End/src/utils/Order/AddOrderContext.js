import { useRef, useState } from 'react';
import { createContext } from 'react';

const AddOrderContext = createContext();

export default AddOrderContext;


export const AddOrderContextProvider = ({ children }) => {
    const nextStepRef = useRef(null);
    const conatctRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [orderCustomerId, setOrderCustomerId] = useState(0);
    const [orderId, setOrderId] = useState(0);

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };

    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const addOrder = (data) => {
        if (orderId > 0 && data === 1) {
            if (nextStepRef.current) {
                nextStepRef.current.handleAddOrder();
            }
        } else if (orderId > 0) {
            setActiveTab((prev) => prev + 1)
        } else if (data === 2) {
            if (conatctRef.current) {
                conatctRef.current.handleAddOrderConatct();
            }
        }
        else {
            if (nextStepRef.current) {
                nextStepRef.current.handleAddOrder();
            }
        }
    }

    return (
        <AddOrderContext.Provider value={{
            nextStepRef, orderCustomerId, setOrderCustomerId, moveNextPage, movePreviewPage, addOrder, activeTab, setActiveTab, orderId, setOrderId, conatctRef
        }}>
            {children}
        </AddOrderContext.Provider>
    );
};