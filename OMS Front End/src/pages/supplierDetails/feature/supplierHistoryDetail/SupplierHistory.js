import React, { useContext } from "react";
//** Lib's */
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Service's */
import { useGetSupplierAuditHistoryBySupplierIdMutation, useLazyGetEventNameAndUserNameBySupplierIdQuery } from "../../../../app/services/supplierHistoryAPI";
//** Component's */
const HistotyList = React.lazy(() => import("../../../../common/features/component/History/HistotyList"));

const SupplierHistory = () => {

    const { supplierId } = useContext(AddSupplierContext);

    return (
        /**
         * This component displays an HistotyList for the supplier module.
         * This hook dynamically sets the API call based on the module (customer or supplier).
        */
        <div className="history-part">
            <HistotyList isSupplier={true} keyId={supplierId ? supplierId : 0}
                getAuditHistory={useGetSupplierAuditHistoryBySupplierIdMutation}
                getSearchFilterBindHistory={useLazyGetEventNameAndUserNameBySupplierIdQuery} />
        </div>
    )
}
export default SupplierHistory;