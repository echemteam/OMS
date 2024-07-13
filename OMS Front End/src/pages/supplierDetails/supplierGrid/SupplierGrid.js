import Suppliers from "../suppliers/Suppliers";
import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";

const SupplierGrid = () => {

    return (
        <AddSupplierContextProvider>
            <Suppliers />
        </AddSupplierContextProvider>
    )
}

export default SupplierGrid;