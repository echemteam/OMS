import { BasicDetailContextProvider } from "../../../utils/ContextAPIs/Customer/BasicDetailContext";
import CustomerDetails from "../customerGrid/feature/customerViewDetail/CustomerDetails"

const CustomerViewDetails = () => {

    return (
        <BasicDetailContextProvider>
            <CustomerDetails />
        </BasicDetailContextProvider>
    )
}

export default CustomerViewDetails;