import { useContext } from "react";
import HistotyList from "../../../../common/features/component/History/HistotyList";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { useGetCustomerAuditHistoryByCustomerIdMutation, useLazyGetEventNameAndUserNameByCustomerIdQuery } from "../../../../app/services/customerHistoryAPI";

export const CustomerHistory = () => {

    const { customerId } = useContext(BasicDetailContext);

    return (
        /**
         * This component displays an HistotyList for the supplier module.
         * This hook dynamically sets the API call based on the module (customer or supplier).
        */
        <div className="history-part">
            <HistotyList isSupplier={false} keyId={customerId || 0}
                getAuditHistory={useGetCustomerAuditHistoryByCustomerIdMutation}
                getSearchFilterBindHistory={useLazyGetEventNameAndUserNameByCustomerIdQuery} />
        </div>
    )
}