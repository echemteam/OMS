import React, { useContext } from 'react';
//** Service */
import AddSupplierContext from '../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
import { useLazyGetAddresssBySupplierIdQuery } from '../../../../../app/services/supplierAddressAPI'
import AddressDetail from '../../../../customerDetail/features/addressDetail/features/config/AddressDetail';
import { useAddAddressMutation, useUpdateAddAddressMutation } from '../../../../../app/services/addressAPI';
import { securityKey } from '../../../../../data/SecurityKey';
//** Component's */

const supplierSecurityKey = {
    ADD: securityKey.ADDSUPPLIERADDRESS,
    EDIT: securityKey.EDITSUPPLIERADDRESS,
}

const SuplierAddressDetails = ({ isEditablePage }) => {

    const { supplierId, isResponsibleUser } = useContext(AddSupplierContext);

    return (
        //** Also, We replace the API Name and mainId based on the customer and supplier module*/
        <AddressDetail isSupplier={true}
            isEditablePage={isEditablePage}
            mainId={supplierId ? supplierId : 0}
            SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
            getAddresssByCustomerId={useLazyGetAddresssBySupplierIdQuery}
            addAddressMutation={useAddAddressMutation}
            updateAddAddressMutation={useUpdateAddAddressMutation}
        />
    )
}

export default SuplierAddressDetails