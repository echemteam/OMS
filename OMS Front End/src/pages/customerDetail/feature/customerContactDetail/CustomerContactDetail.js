import React, { useContext } from "react";
import { securityKey } from "../../../../data/SecurityKey";
//** Service */
import { useAddEditContactMutation, useLazyGetContactByCustomerIdQuery, useLazyGetCustomerContactByContactIdQuery, } from "../../../../app/services/contactAPI";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import PropTypes from "prop-types";
//** Component's */
const ContactGrid = React.lazy(() => import("../../../../common/features/component/Contact/ContactGrid"));

const customerSecurityKey = {
  ADD: securityKey.ADDCUSTOMERCONTACT,
  EDIT: securityKey.EDITCUSTOMERCONTACT,
}

const CustomerContactDetail = ({ isEditablePage, isSearchFilterShow }) => {

  const { customerId, isResponsibleUser } = useContext(BasicDetailContext);

  return (
    /**
      * This component displays an ContactGrid for the supplier module.
      * This hook dynamically sets the API call based on the module (customer or supplier).
    */
    <div className="supplier-contacts custom-card-sec">
      <ContactGrid
        isSupplier={false}
        isEditablePage={isEditablePage}
        keyId={customerId ? customerId : 0}
        isSearchFilterShow={isSearchFilterShow}
        getContactByKeyId={useLazyGetContactByCustomerIdQuery}
        addEditContactMutation={useAddEditContactMutation}
        SecurityKey={!isResponsibleUser ? customerSecurityKey : null}
        getContactById={useLazyGetCustomerContactByContactIdQuery}
      />
    </div>
  );
};

CustomerContactDetail.propTypes = {
  isEditablePage: PropTypes.bool.isRequired,
  isSearchFilterShow: PropTypes.bool.isRequired,
};
export default CustomerContactDetail;
