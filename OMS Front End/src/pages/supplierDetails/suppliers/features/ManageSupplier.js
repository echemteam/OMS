import React from 'react'
import { AddSupplierContextProvider } from '../../../../utils/ContextAPIs/Supplier/AddSupplierContext'
import SupplierDetails from './updateSupplierDetails/SupplierDetails'

const ManageSupplier = () => {
    return (
        <AddSupplierContextProvider>
            <SupplierDetails />
        </AddSupplierContextProvider>
    )
}

export default ManageSupplier