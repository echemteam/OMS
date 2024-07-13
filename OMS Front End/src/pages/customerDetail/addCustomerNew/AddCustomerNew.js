import { BasicDetailContextProvider } from "../../../utils/ContextAPIs/Customer/BasicDetailContext";
import AddCustomer from "../AddCustomer";

const AddCustomerNew = () => {

    return (
        <BasicDetailContextProvider>
            <AddCustomer />
        </BasicDetailContextProvider>
    )
}

export default AddCustomerNew;