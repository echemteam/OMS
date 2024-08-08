import React, { useContext } from "react";
import PropTypes from 'prop-types'; 
import { securityKey } from "../../../../data/SecurityKey";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Service */
import { useAddEditContactMutation, useLazyGetContactBySupplierIdQuery, useLazyGetSupllierContactByContactQuery, } from "../../../../app/services/contactAPI";
//** Component's */
const ContactGrid = React.lazy(() => import("../../../../common/features/component/Contact/ContactGrid"));

const supplierSecurityKey = {
  ADD: securityKey.ADDSUPPLIERCONTACT,
  EDIT: securityKey.EDITSUPPLIERCONTACT,
};

const SupplierContactDetail = ({ isEditablePage, isSearchFilterShow }) => {
  const { supplierId, isResponsibleUser } = useContext(AddSupplierContext);

  return (
    /**
      * This component displays an ContactGrid for the supplier module.
      * This hook dynamically sets the API call based on the module (customer or supplier).
    */
    <div className="supplier-contacts">
      <ContactGrid
        isSupplier={true}
        isEditablePage={isEditablePage}
        keyId={supplierId || 0}
        isSearchFilterShow={isSearchFilterShow}
        getContactByKeyId={useLazyGetContactBySupplierIdQuery}
        addEditContactMutation={useAddEditContactMutation}
        SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
        getContactById={useLazyGetSupllierContactByContactQuery}
        contryIdCode={null}
      />
    </div>
  );
};

SupplierContactDetail.propTypes = {
  isEditablePage: PropTypes.bool.isRequired,
  isSearchFilterShow: PropTypes.bool.isRequired,
};
export default SupplierContactDetail;
