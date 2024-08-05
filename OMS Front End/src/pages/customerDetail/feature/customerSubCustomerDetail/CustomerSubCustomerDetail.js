import { useContext } from "react";
import SubCustomerGrid from "../../../../common/features/component/SubCustomer/SubCustomerGrid";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";


const CustomerSubCustomerDetail = () => {

    const { customerId } = useContext(BasicDetailContext);

    return (
        <SubCustomerGrid customerId={customerId} />
    )
}
export default CustomerSubCustomerDetail;