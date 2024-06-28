import React, { useContext } from 'react';
//** Service */
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';
import { useAddAddressMutation, useLazyGetAddresssByCustomerIdQuery, useUpdateAddAddressMutation } from '../../../../app/services/addressAPI';
import { securityKey } from '../../../../data/SecurityKey';
//** Component's */
const AddressDetail = React.lazy(() => import("./features/config/AddressDetail"));

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERADDRESS,
    EDIT: securityKey.EDITCUSTOMERADDRESS,
}

const CustomerAddressDetails = ({ isEditablePage }) => {

    const { customerId, isResponsibleUser } = useContext(BasicDetailContext);

    return (
        <>{console.log(isResponsibleUser)}
            <AddressDetail isSupplier={false}
                isEditablePage={isEditablePage}
                mainId={customerId ? customerId : 0}
                SecurityKey={!isResponsibleUser ? customerSecurityKey : null}
                getAddresssByCustomerId={useLazyGetAddresssByCustomerIdQuery}
                addAddressMutation={useAddAddressMutation}
                updateAddAddressMutation={useUpdateAddAddressMutation}
            />
        </>
    )
}

export default CustomerAddressDetails