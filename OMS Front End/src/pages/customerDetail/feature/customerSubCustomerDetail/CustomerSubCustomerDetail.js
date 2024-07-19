import { useContext } from "react";
import SubCustomerGrid from "../../../../common/features/component/SubCustomer/SubCustomerGrid";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";


const CustomerSubCustomerDetail=()=>{

    const { customerId, isSubCustomer } = useContext(BasicDetailContext);
 return(<>
     <SubCustomerGrid  customerId={customerId} isSubCustomer={isSubCustomer}/>
 </>)
}
export default CustomerSubCustomerDetail;