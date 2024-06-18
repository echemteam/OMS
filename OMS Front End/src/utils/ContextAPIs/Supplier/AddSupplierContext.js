import { useState } from 'react';
import { createContext } from 'react';

const AddSupplierContext = createContext();

export default AddSupplierContext;


export const AddSupplierContextProvider = ({ children }) => {

    const [mainId, setMainId] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [supplierId, setSupplierId] = useState(0);

    return (
        <AddSupplierContext.Provider value={{
            activeTab, setActiveTab, setMainId, mainId, setSupplierId, supplierId
        }}>
            {children}
        </AddSupplierContext.Provider>
    );
};