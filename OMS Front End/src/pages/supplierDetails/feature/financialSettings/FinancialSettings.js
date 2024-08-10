import React from "react";
import PropTypes from "prop-types";
import FinancialSettingsgGrid from "../../../../common/features/component/supplierSetting/SupplierSettingGrid";

const FinancialSettings = ({ supplierId , isEditablePage }) => {
  return (
    <div>
      <FinancialSettingsgGrid
        supplierId={supplierId}
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
