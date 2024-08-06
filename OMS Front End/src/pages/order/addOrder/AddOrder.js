import AddOrderTab from "./features/AddOrderTab";
import "../Order.scss";
import { AddOrderContextProvider } from "../../../utils/Order/AddOrderContext";

const AddOrder = () => {

    return (
        <AddOrderContextProvider>
            <AddOrderTab />
        </AddOrderContextProvider>
    )
}

export default AddOrder;