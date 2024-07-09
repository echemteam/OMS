import React, { useContext } from 'react';
import TimeLine from '../../../../../../customerDetail/features/HistoryDetail/features/TimeLine'
import AddSupplierContext from '../../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
//** Service's */
import { useGetSupplierAuditHistoryBySupplierIdMutation, useLazyGetEventNameAndUserNameBySupplierIdQuery } from '../../../../../../../app/services/supplierHistoryAPI';

export const SupplierHistoryDetail = ({ isEditablePage }) => {

    const { supplierId } = useContext(AddSupplierContext);

    return (
        /* NOTE:- 
            API Call
            The "getAuditHistory" function is passed dynamically as a prop.
            This allows the TimeLine component to be reused with different API call functions.
        */
        <div className="history-part">
            <TimeLine isSupplier={true} isEditablePage={isEditablePage} keyId={supplierId ? supplierId : 0}
                getAuditHistory={useGetSupplierAuditHistoryBySupplierIdMutation} 
                getSearchFilterBindHistory={useLazyGetEventNameAndUserNameBySupplierIdQuery}
                />
        </div>
    )
}
