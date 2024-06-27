import React, { useContext } from 'react';
import AddSupplierContext from '../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
//** Service */
import { useAddEditContactMutation, useLazyGetContactBySupplierIdQuery } from '../../../../../app/services/contactAPI'
//** Component's */
const ContactDetail = React.lazy(() => import("../../../../customerDetail/features/contactDetail/Contact/ContactDetail"));

const SupplierContactDetail = (isEditSupplierPage) => {

  const { supplierId } = useContext(AddSupplierContext);

  return (
    //** Also, We replace the API Name and mainId based on the customer and supplier module*/
    <ContactDetail isSupplier={true} isEditablePage={isEditSupplierPage} mainId={supplierId ? supplierId : 0}
      getContactByIdQuery={useLazyGetContactBySupplierIdQuery} addEditContactMutation={useAddEditContactMutation} />
  )
}

export default SupplierContactDetail