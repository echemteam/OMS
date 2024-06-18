import React, { useContext, useEffect } from 'react';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service */
import { useAddEditContactMutation, useLazyGetContactByCustomerIdQuery } from '../../../../../app/services/contactAPI';
//** Component's */
const ContactDetail = React.lazy(() => import("./ContactDetail"));

const CustomerContactDetails = () => {

    const { customerId, setMainId } = useContext(BasicDetailContext);

    useEffect(() => {
        if (customerId > 0) {
            //****  If we have supplier page we have set main id as supplierId. and If we have customer page we have set main id as customerId   */
            setMainId(customerId);
        }
    }, [customerId]);

    return (
        //** Also, We replace the API for the customer and supplier */
        <ContactDetail isSupplier={false} getContactByIdQuery={useLazyGetContactByCustomerIdQuery} addEditContactMutation={useAddEditContactMutation} />
    )
}

export default CustomerContactDetails