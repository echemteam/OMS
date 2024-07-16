import { BasicDetailContextProvider } from "../../../utils/ContextAPIs/Customer/BasicDetailContext";
import Customers from "../../customerDetail/customerGrid/feature/customerList/Customers";

const CustomerGrid = () => {
    return (
        <BasicDetailContextProvider>
            <Customers />
        </BasicDetailContextProvider>
    )
}

export default CustomerGrid;