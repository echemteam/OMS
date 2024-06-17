import { useState } from 'react';
import { createContext } from 'react';

const AddSupplierContext = createContext();

export default AddSupplierContext;


export const AddSupplierContextProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <AddSupplierContext.Provider value={{
             activeTab, setActiveTab,
        }}>
            {children}
        </AddSupplierContext.Provider>
    );
};