import { useRef } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import AddEditSubCustomer from "./feature/AddEditSubCustomer";
import SubCustomerList from "./feature/SubCustomerList";

const SubCustomerGrid=({customerId,isSubCompany})=>{
    const childRef = useRef();

    const onSuccess = () => {
        if (childRef.current) {
            childRef.current.callChildFunction();
        }
    };
    return(<>

     <CardSection
        cardTitle="Link Customer"
        buttonClassName="theme-button"
      >
       <AddEditSubCustomer customerId={customerId} onSuccess={onSuccess} isSubCompany={isSubCompany}/>
     <SubCustomerList customerId={customerId} childRef={childRef} />

      </CardSection>
      </>)
}
export default SubCustomerGrid;