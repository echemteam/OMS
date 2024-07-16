import React from "react";
import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";

const SupplierDetails = React.lazy(() => import("./feature/SupplierViewDetail/SupplierDetails"));

const SupplierViewDetail = () => {

    return (
        <AddSupplierContextProvider>
            <SupplierDetails />
        </AddSupplierContextProvider>
    )
}

export default SupplierViewDetail;