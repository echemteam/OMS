import React, { useContext } from 'react';
import AddSupplierContext from '../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
//** Service */
import { useAddEditContactMutation, useLazyGetContactBySupplierIdQuery } from '../../../../../app/services/contactAPI'
import { securityKey } from '../../../../../data/SecurityKey';
//** Component's */
const ContactDetail = React.lazy(() => import("../../../../customerDetail/features/contactDetail/Contact/ContactDetail"));

const supplierSecurityKey = {
  ADD: securityKey.ADDSUPPLIERCONTACT,
  EDIT: securityKey.EDITSUPPLIERCONTACT,
}

const SupplierContactDetail = (isEditSupplierPage) => {

  const { supplierId , isResponsibleUser} = useContext(AddSupplierContext);

  return (
    //** Also, We replace the API Name and mainId based on the customer and supplier module*/
    <ContactDetail isSupplier={true} isEditablePage={isEditSupplierPage} mainId={supplierId ? supplierId : 0}
      getContactByIdQuery={useLazyGetContactBySupplierIdQuery} addEditContactMutation={useAddEditContactMutation}
      SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
    />
  )
}

export default SupplierContactDetail