import React, { useContext } from 'react';
import { securityKey } from '../../../../../../../data/SecurityKey';
import AddSupplierContext from '../../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
//** Service */
import { useLazyDownloadCustomerDocumentQuery } from '../../../../../../../app/services/documentAPI';
import { useAddSupplierDocumentsMutation, useDeleteSupplierDocumentsByIdMutation, useLazyGetSupplierDocumentsByIdQuery } from '../../../../../../../app/services/supplierDocuementsAPI';
//** Component's */
const DocumentDetails = React.lazy(() => import("../../../../../../customerDetail/features/documentsDetail/DocumentDetails"));

const supplierSecurityKey = {
    ADD: securityKey.ADDSUPPLIERDOCUMENT,
    DELETE: securityKey.DELETESUPPLIERDOCUMENT,
    DOWNALOD: securityKey.DOWNALODSUPPLIERDOCUMENT,
}

const SupplierDocumentDetail = ({ isEditablePage }) => {
    const { supplierId, isResponsibleUser } = useContext(AddSupplierContext);

    return (
        /* NOTE:- 
            API Call
            The "addDocuments","downloadDocument","deleteDocumentsById","getDocumentsById" function is passed dynamically as a prop.
            This allows the DocumentDetails component to be reused with different API call functions.
        */
        <DocumentDetails keyId={supplierId ? supplierId : 0} isSupplier={true} isEditablePage={isEditablePage} SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
            addDocuments={useAddSupplierDocumentsMutation} downloadDocument={useLazyDownloadCustomerDocumentQuery}
            deleteDocumentsById={useDeleteSupplierDocumentsByIdMutation} getDocumentsById={useLazyGetSupplierDocumentsByIdQuery} />
    )
}

export default SupplierDocumentDetail;