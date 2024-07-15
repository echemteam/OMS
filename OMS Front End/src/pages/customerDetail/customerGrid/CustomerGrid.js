import { BasicDetailContextProvider } from "../../../utils/ContextAPIs/Customer/BasicDetailContext";
import ViewCustomer from "../ViewCustomer";

const CustomerGrid = () => {
    return (
        <BasicDetailContextProvider>
            <ViewCustomer />
        </BasicDetailContextProvider>
    )
}

export default CustomerGrid;