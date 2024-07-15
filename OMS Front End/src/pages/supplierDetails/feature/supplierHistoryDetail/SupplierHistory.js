import { useContext } from "react";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import HistotyList from "../../../../common/features/component/History/HistotyList";
import { useGetSupplierAuditHistoryBySupplierIdMutation, useLazyGetEventNameAndUserNameBySupplierIdQuery } from "../../../../app/services/supplierHistoryAPI";

export const SupplierHistory = () => {

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