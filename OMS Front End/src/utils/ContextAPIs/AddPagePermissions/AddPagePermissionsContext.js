import { createContext, useState } from 'react';
import { hasFunctionalPermission } from '../../AuthorizeNavigation/authorizeNavigation';

// Create the context
export const AddPagePermissionsContext = createContext();


export const AddPagePermissionsProvider = ({ children }) => {
    const [hasAccess, setHasAccess] = useState(false);

    const CheckAddPermission = (keyName) => {
        const permission = keyName ? hasFunctionalPermission(keyName) : '';
        if (permission && permission.hasAccess === true) {
            setHasAccess(true);
        } else {
            setHasAccess(false);
        }
    }

    return (
        <AddPagePermissionsContext.Provider value={{ hasAccess, CheckAddPermission }}>
            {children}
        </AddPagePermissionsContext.Provider>
    );
};