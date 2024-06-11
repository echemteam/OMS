import AddCustomer from "./AddCustomer";
import { BasicDetailContextProvider } from "../../utils/ContextAPIs/Customer/BasicDetailContext";

const ManageAddCustomer = () => {
    return (
        <BasicDetailContextProvider>
            <AddCustomer />
        </BasicDetailContextProvider>
    )
}

export default ManageAddCustomer;