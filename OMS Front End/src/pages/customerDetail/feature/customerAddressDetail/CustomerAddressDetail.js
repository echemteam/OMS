/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
//** Service */
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';
import { useAddAddressMutation, useDeleteAddressMutation, useLazyGetAddresssByCustomerIdQuery, useLazyGetCustomerAddresssByAddressIdQuery, useUpdateAddAddressMutation } from '../../../../app/services/addressAPI';
import { securityKey } from '../../../../data/SecurityKey';
import PropTypes from 'prop-types';
//** Component's */
const AddressGrid = React.lazy(() => import("../../../../common/features/component/Address/AddressGrid"));

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERADDRESS,
    EDIT: securityKey.EDITCUSTOMERADDRESS,
}

const CustomerAddressDetail = ({ isEditablePage, customerStatusId }) => {

    const { customerId, subCustomer, isResponsibleUser, setIsAddressChange, getCustomerCompletionCount } = useContext(BasicDetailContext);

    const getCompletionCount = () => {
        getCustomerCompletionCount(customerId, subCustomer);
    }

    return (
        <AddressGrid
            isSupplier={false}
            isEditablePage={isEditablePage}
            keyId={customerId || 0}
            SecurityKey={!isResponsibleUser ? customerSecurityKey : null}
            getAddresssByCustomerId={useLazyGetAddresssByCustomerIdQuery}
            getAddresssById={useLazyGetCustomerAddresssByAddressIdQuery}
            addAddress={useAddAddressMutation}
            updateAddress={useUpdateAddAddressMutation}
            deleteAddress={useDeleteAddressMutation}
            customerStatusId={customerStatusId}
            setIsAddressChange={setIsAddressChange}
            getCompletionCount={getCompletionCount}
        />
    )
}

CustomerAddressDetail.propTypes = {
    isEditablePage: PropTypes.bool.isRequired
};
export default CustomerAddressDetail
