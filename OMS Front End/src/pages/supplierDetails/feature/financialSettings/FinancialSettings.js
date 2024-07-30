import React from "react";

import SupplierSettingGrid from "../../../../common/features/component/supplierSetting/SupplierSettingGrid";

const financialSettings = ({ supplierId , isEditablePage }) => {
  return (
    <div>
      <SupplierSettingGrid
        supplierId={supplierId.supplierId}
        isEditablePage={isEditablePage}
      />
    </div>
  );
};

export default financialSettings;
