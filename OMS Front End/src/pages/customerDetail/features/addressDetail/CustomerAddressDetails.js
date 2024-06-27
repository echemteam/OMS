import React, { useContext } from 'react';
//** Service */
import AddressDetail from './features/config/AddressDetail';
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';
import { useAddAddressMutation, useLazyGetAddresssByCustomerIdQuery, useUpdateAddAddressMutation } from '../../../../app/services/addressAPI';
import { securityKey } from '../../../../data/SecurityKey';
//** Component's */

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERADDRESS,
    EDIT: securityKey.EDITCUSTOMERADDRESS,
}

const CustomerAddressDetails = ({ isEditablePage }) => {

    const { customerId } = useContext(BasicDetailContext);

    return (
        <AddressDetail isSupplier={false}
            isEditablePage={isEditablePage}
            mainId={customerId ? customerId : 0}
            SecurityKey={customerSecurityKey}
            getAddresssByCustomerId={useLazyGetAddresssByCustomerIdQuery}
            addAddressMutation={useAddAddressMutation}
            updateAddAddressMutation={useUpdateAddAddressMutation}
        />
    )
}

export default CustomerAddressDetails