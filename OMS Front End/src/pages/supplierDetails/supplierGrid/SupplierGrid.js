import React from "react";
import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";

//** Component's */
const Suppliers = React.lazy(() => import("./feature/supplierList/Suppliers"));

const SupplierGrid = () => {

    return (
        <AddSupplierContextProvider>
            <Suppliers />
        </AddSupplierContextProvider>
    )
}

export default SupplierGrid;