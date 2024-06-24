import React from 'react'
import { AddSupplierContextProvider } from '../../../utils/ContextAPIs/Supplier/AddSupplierContext'
import AddSupplier from './AddSupplier'
import { BasicDetailContextProvider } from '../../../utils/ContextAPIs/Customer/BasicDetailContext'

const ManageAddSupplier = () => {
    return (
        <AddSupplierContextProvider>
            <BasicDetailContextProvider>
                <AddSupplier />
            </BasicDetailContextProvider >
        </AddSupplierContextProvider>
    )
}

export default ManageAddSupplier