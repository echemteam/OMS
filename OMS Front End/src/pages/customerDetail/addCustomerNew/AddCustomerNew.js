import { BasicDetailContextProvider } from "../../../utils/ContextAPIs/Customer/BasicDetailContext";
import AddCustomerTab from "./features/AddCustomerTab";

const AddCustomerNew = () => {

    return (
        <BasicDetailContextProvider>
            <AddCustomerTab />
        </BasicDetailContextProvider>
    )
}

export default AddCustomerNew;