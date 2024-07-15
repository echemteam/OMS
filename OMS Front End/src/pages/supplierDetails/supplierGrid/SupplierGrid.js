import Suppliers from "./feature/supplierList/Suppliers";
import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";

const SupplierGrid = () => {

    return (
        <AddSupplierContextProvider>
            <Suppliers />
        </AddSupplierContextProvider>
    )
}

export default SupplierGrid;