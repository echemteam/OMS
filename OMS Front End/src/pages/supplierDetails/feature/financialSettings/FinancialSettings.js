import React from "react";

import SupplierSettingGrid from "../../../../common/features/component/supplierSetting/SupplierSettingGrid";

const financialSettings = ({ supplierId }) => {
  return (
    <div>
      <SupplierSettingGrid
        supplierId={supplierId.supplierId}
      />
    </div>
  );
};

export default financialSettings;
