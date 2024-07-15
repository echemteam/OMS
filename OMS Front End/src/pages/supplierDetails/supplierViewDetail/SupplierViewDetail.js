import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import SupplierDetails from "../supplierGrid/feature/SupplierViewDetail/SupplierDetails";

const SupplierViewDetail = () => {

    return (
        <AddSupplierContextProvider>
            <SupplierDetails />
        </AddSupplierContextProvider>
    )
}

export default SupplierViewDetail;