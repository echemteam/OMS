import React, { useContext } from 'react';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service */
import { useAddEditContactMutation, useLazyGetContactByCustomerIdQuery } from '../../../../../app/services/contactAPI';
//** Component's */
const ContactDetail = React.lazy(() => import("./ContactDetail"));

const CustomerContactDetails = () => {

    const { customerId } = useContext(BasicDetailContext);

    return (
        //** Also, We replace the API Name and mainId based on the customer and supplier module*/
        <ContactDetail isSupplier={false} mainId={customerId ? customerId : 0} getContactByIdQuery={useLazyGetContactByCustomerIdQuery} addEditContactMutation={useAddEditContactMutation} />
    )
}

export default CustomerContactDetails