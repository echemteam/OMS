import { useContext } from "react";
import SubCustomerGrid from "../../../../common/features/component/SubCustomer/SubCustomerGrid";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";


const CustomerSubCustomerDetail=()=>{

    const { customerId, isSubCompany } = useContext(BasicDetailContext);
 return(<>
     <SubCustomerGrid  customerId={customerId} isSubCompany={isSubCompany}/>
 </>)
}
export default CustomerSubCustomerDetail;