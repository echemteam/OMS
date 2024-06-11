import { useState } from 'react';
import { useRef } from 'react';
import { createContext } from 'react';

const BasicDetailContext = createContext();

export default BasicDetailContext;


export const BasicDetailContextProvider = ({ children }) => {
    const nextRef = useRef(null);
    const [customerId, setCustomerId] = useState(0)

    return (
        <BasicDetailContext.Provider value={{ nextRef, customerId, setCustomerId }}>
            {children}
        </BasicDetailContext.Provider>
    );
};