import React from 'react'
import { AddSupplierContextProvider } from '../../../utils/ContextAPIs/Supplier/AddSupplierContext'
import AddSupplier from './AddSupplier'

const ManageAddSupplier = () => {
    return (
       <AddSupplierContextProvider>
        <AddSupplier />
       </AddSupplierContextProvider>
    )
}

export default ManageAddSupplier