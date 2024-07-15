import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import AddSupplierTab from "./features/AddSupplierTab";

const AddSupplier = () => {

    return (
        <AddSupplierContextProvider>
            <AddSupplierTab />
        </AddSupplierContextProvider>
    )
}

export default AddSupplier;