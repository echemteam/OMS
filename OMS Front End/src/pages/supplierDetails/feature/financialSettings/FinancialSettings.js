import React from "react";
import FinancialSettingsgGrid from "../../../../common/features/component/supplierSetting/SupplierSettingGrid";

const FinancialSettings = ({ supplierId , isEditablePage }) => {
  return (
    <div>
      <FinancialSettingsgGrid
        supplierId={supplierId.supplierId}
        isEditablePage={isEditablePage}
      />
    </div>
  );
};

export default FinancialSettings;
