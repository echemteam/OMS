import React, { useContext } from 'react'
import TimeLine from '../HistoryDetail/features/TimeLine'
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service's */
import { useGetCustomerAuditHistoryByCustomerIdMutation } from '../../../../app/services/customerHistoryAPI';

export const HistoryDetail = ({ isEditablePage }) => {

    const { customerId } = useContext(BasicDetailContext);

    return (
        /* NOTE:- 
            API Call
            The "getAuditHistory" function is passed dynamically as a prop.
            This allows the TimeLine component to be reused with different API call functions.
        */
        <div className="history-part">
            <TimeLine isSupplier={false} isEditablePage={isEditablePage} keyId={customerId ? customerId : 0}
                getAuditHistory={useGetCustomerAuditHistoryByCustomerIdMutation} />
        </div>
    )
}
