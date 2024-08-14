import React, { useContext } from "react";
import PropTypes from "prop-types";
import FinancialSettingsgGrid from "../../../../common/features/component/supplierSetting/SupplierSettingGrid";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";

const FinancialSettings = ({ isEditablePage }) => {
  const { supplierId  } = useContext(AddSupplierContext);
  return (
    <div className="financial-setting">
      <FinancialSettingsgGrid
        supplierId={supplierId || 0}
        isEditablePage={isEditablePage}
      />
    </div>
  );
};

// PropTypes for the component
FinancialSettings.propTypes = {
  supplierId: PropTypes.shape({
    supplierId: PropTypes.number.isRequired,
  }).isRequired,
  isEditablePage: PropTypes.bool.isRequired,
};

export default FinancialSettings;
