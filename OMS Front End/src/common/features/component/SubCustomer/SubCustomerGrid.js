import { useRef } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import AddEditSubCustomer from "./feature/AddEditSubCustomer";
import SubCustomerList from "./feature/SubCustomerList";
import PropTypes from "prop-types";

const SubCustomerGrid = ({ customerId }) => {
  const childRef = useRef();
  const getLinkCustomerRef = useRef();

  const onSuccess = () => {
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const onGetLinkCustomer = () => {
    if (getLinkCustomerRef.current) {
      getLinkCustomerRef.current.callChildFunction();
    }
  };

  return (
    <div className="link-customer">
      <CardSection cardTitle="Link Customer" buttonClassName="theme-button">
        <AddEditSubCustomer
          customerId={customerId}
          onSuccess={onSuccess}
          getLinkCustomerRef={getLinkCustomerRef}
        />
        <SubCustomerList
          customerId={customerId}
          childRef={childRef}
          onGetLinkCustomer={onGetLinkCustomer}
        />
      </CardSection>
    </div>
  );
};

SubCustomerGrid.propTypes = {
  customerId: PropTypes.number.isRequired,
};
export default SubCustomerGrid;
