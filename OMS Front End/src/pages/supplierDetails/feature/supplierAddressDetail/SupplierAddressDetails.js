/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
//** Lib's */
import { securityKey } from '../../../../data/SecurityKey';
import AddSupplierContext from '../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
//** Service */
import { useAddAddressMutation, useUpdateAddAddressMutation } from '../../../../app/services/addressAPI';
import { useLazyGetAddresssBySupplierIdQuery, useLazyGetSupplierAddresssByAddressIdQuery } from '../../../../app/services/supplierAddressAPI';

const AddressGrid = React.lazy(() => import("../../../../common/features/component/Address/AddressGrid"));

//** Component's */

const supplierSecurityKey = {
    ADD: securityKey.ADDSUPPLIERADDRESS,
    EDIT: securityKey.EDITSUPPLIERADDRESS,
}

const SuplierAddressDetails = ({ isEditablePage }) => {

    const { supplierId, isResponsibleUser } = useContext(AddSupplierContext);

    return (
        /**
        * This component displays an AddressGrid for the supplier module.
        * This hook dynamically sets the API call based on the module (customer or supplier).
        */
        <AddressGrid
            isSupplier={true}
            isEditablePage={isEditablePage}
            keyId={supplierId || 0}
            SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
            getAddresssByCustomerId={useLazyGetAddresssBySupplierIdQuery}
            getAddresssById={useLazyGetSupplierAddresssByAddressIdQuery}
            addAddress={useAddAddressMutation}
            updateAddress={useUpdateAddAddressMutation} />
    )
}

SuplierAddressDetails.propTypes = {
    isEditablePage: PropTypes.bool.isRequired,
};
export default SuplierAddressDetails