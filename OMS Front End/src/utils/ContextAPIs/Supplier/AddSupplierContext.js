import { useRef, useState } from 'react';
import { createContext } from 'react';

const AddSupplierContext = createContext();

export default AddSupplierContext;


export const AddSupplierContextProvider = ({ children }) => {
    const nextStepRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [supplierId, setSupplierId] = useState(0);
    const [allCountries, setAllCountries] = useState(false);

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };

    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };

    const addSupplier = () => {
        if (supplierId > 0) {
            setActiveTab((prev) => prev + 1);
        }
        else {
            if (nextStepRef.current) {
                nextStepRef.current.handleAddSupplierBasicDetails();
            }
        }
    }

    return (
        <AddSupplierContext.Provider value={{
            nextStepRef, supplierId, setSupplierId, activeTab, setActiveTab, moveNextPage, movePreviewPage, addSupplier , setAllCountries,allCountries
        }}>
            {children}
        </AddSupplierContext.Provider>
    );
};