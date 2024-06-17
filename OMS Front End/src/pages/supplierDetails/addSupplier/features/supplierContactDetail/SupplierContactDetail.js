import React from 'react'
import ContactDetail from '../../../../customerDetail/features/contactDetail/Contact/ContactDetail'
import { useAddEditContactMutation, useLazyGetContactByCustomerIdQuery } from '../../../../../app/services/contactAPI'

const SupplierContactDetail = () => {
  return (
    <ContactDetail getContactByIdQuery={useLazyGetContactByCustomerIdQuery} useAddEditContactMutation={useAddEditContactMutation} />
  )
}

export default SupplierContactDetail