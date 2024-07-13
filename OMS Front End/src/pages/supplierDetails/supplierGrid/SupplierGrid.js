import Suppliers from "../suppliers/Suppliers";

const SupplierGrid = () => {

    return (
        <AddSupplierContextProvider>
            <Suppliers />
        </AddSupplierContextProvider>
    )
}

export default SupplierGrid;