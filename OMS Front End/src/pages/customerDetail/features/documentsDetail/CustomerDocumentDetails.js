import React, { useContext } from 'react';
import { securityKey } from '../../../../data/SecurityKey';
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service */
import { useAddCustomerDocumentsMutation, useDeleteCustomerDocumentsByIdMutation, useLazyDownloadCustomerDocumentQuery, useLazyGetCustomerDocumentsByIdQuery } from '../../../../app/services/documentAPI';
//** Component's */
const DocumentDetails = React.lazy(() => import("./DocumentDetails"));

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERDOCUMENT,
    DELETE: securityKey.DELETECUSTOMERDOCUMENT,
    DOWNALOD: securityKey.DOWNALODCUSTOMERDOCUMENT,
}

const CustomerDocumentDetails = ({ isEditablePage }) => {

    const { customerId } = useContext(BasicDetailContext);

    return (
        //** Also, We replace the API Name and mainId based on the customer and supplier module*/
        <DocumentDetails mainId={customerId ? customerId : 0} isEditablePage={isEditablePage} SecurityKey={customerSecurityKey} addDocuments={useAddCustomerDocumentsMutation} downloadDocument={useLazyDownloadCustomerDocumentQuery}
            deleteDocumentsById={useDeleteCustomerDocumentsByIdMutation} getDocumentsById={useLazyGetCustomerDocumentsByIdQuery} />
    )
}

export default CustomerDocumentDetails;