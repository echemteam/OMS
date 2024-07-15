import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import SupplierDetails from "./feature/SupplierViewDetail/SupplierDetails";

const SupplierViewDetail = () => {

    return (
        <AddSupplierContextProvider>
            <SupplierDetails />
        </AddSupplierContextProvider>
    )
}

export default SupplierViewDetail;