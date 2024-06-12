import { BasicDetailContextProvider } from "../../utils/ContextAPIs/Customer/BasicDetailContext";
import ViewCustomer from "./ViewCustomer";

const ManageViewCustomer = () => {
    return (
        <BasicDetailContextProvider>
            <ViewCustomer />
        </BasicDetailContextProvider>
    )
}

export default ManageViewCustomer;