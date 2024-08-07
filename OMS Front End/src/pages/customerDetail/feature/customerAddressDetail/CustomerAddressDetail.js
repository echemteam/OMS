/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
//** Service */
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';
import { useAddAddressMutation, useLazyGetAddresssByCustomerIdQuery, useLazyGetCustomerAddresssByAddressIdQuery, useUpdateAddAddressMutation } from '../../../../app/services/addressAPI';
import { securityKey } from '../../../../data/SecurityKey';
import PropTypes from 'prop-types';
//** Component's */
const AddressGrid = React.lazy(() => import("../../../../common/features/component/Address/AddressGrid"));

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERADDRESS,
    EDIT: securityKey.EDITCUSTOMERADDRESS,
}

const CustomerAddressDetail = ({ isEditablePage }) => {

    const { customerId, isResponsibleUser } = useContext(BasicDetailContext);

    return (
        <AddressGrid
            isSupplier={false}
            isEditablePage={isEditablePage}
            keyId={customerId || 0}
            SecurityKey={!isResponsibleUser ? customerSecurityKey : null}
            getAddresssByCustomerId={useLazyGetAddresssByCustomerIdQuery}
            getAddresssById={useLazyGetCustomerAddresssByAddressIdQuery}
            addAddress={useAddAddressMutation}
            updateAddress={useUpdateAddAddressMutation} />
    )
}

CustomerAddressDetail.propTypes = {
    isEditablePage: PropTypes.bool.isRequired
};
export default CustomerAddressDetail
