import React, { useContext } from 'react';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service */
import { useAddEditContactMutation, useLazyGetContactByCustomerIdQuery } from '../../../../../app/services/contactAPI';
import { securityKey } from '../../../../../data/SecurityKey';
//** Component's */
const ContactDetail = React.lazy(() => import("./ContactDetail"));

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERCONTACT,
    EDIT: securityKey.EDITCUSTOMERCONTACT,
}

const CustomerContactDetails = ({ isEditablePage }) => {

    const { customerId } = useContext(BasicDetailContext);

    return (
        //** Also, We replace the API Name and mainId based on the customer and supplier module*/
        <ContactDetail isSupplier={false} isEditablePage={isEditablePage} mainId={customerId ? customerId : 0} SecurityKey={customerSecurityKey}
            getContactByIdQuery={useLazyGetContactByCustomerIdQuery} addEditContactMutation={useAddEditContactMutation} />
    )
}

export default CustomerContactDetails