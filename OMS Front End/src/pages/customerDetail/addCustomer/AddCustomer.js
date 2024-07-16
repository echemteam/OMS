import { BasicDetailContextProvider } from "../../../utils/ContextAPIs/Customer/BasicDetailContext";
import AddCustomerTab from "./features/AddCustomerTab";

const AddCustomer = () => {

    return (
        <BasicDetailContextProvider>
            <AddCustomerTab />
        </BasicDetailContextProvider>
    )
}

export default AddCustomer;