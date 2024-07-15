import { AddSupplierContextProvider } from "../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import AddSupplier from "./features/AddSupplier";

const AddSupplierNew = () => {

    return (
        <AddSupplierContextProvider>
            <AddSupplier />
        </AddSupplierContextProvider>
    )
}

export default AddSupplierNew;