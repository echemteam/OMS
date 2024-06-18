import React, { useContext } from 'react';
import AddSupplierContext from '../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
//** Service */
import { useAddEditContactMutation, useLazyGetContactByCustomerIdQuery } from '../../../../../app/services/contactAPI'
//** Component's */
const ContactDetail = React.lazy(() => import("../../../../customerDetail/features/contactDetail/Contact/ContactDetail"));

const SupplierContactDetail = () => {

  const { supplierId } = useContext(AddSupplierContext);


  return (
    //** Also, We replace the API Name and mainId based on the customer and supplier module*/
    <ContactDetail isSupplier={true} mainId={supplierId ? supplierId : 0} getContactByIdQuery={useLazyGetContactByCustomerIdQuery} addEditContactMutation={useAddEditContactMutation} />
  )
}

export default SupplierContactDetail