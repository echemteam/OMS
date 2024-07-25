import React, { useContext } from 'react';
import { securityKey } from '../../../../data/SecurityKey';
import AddSupplierContext from '../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
import PropTypes from 'prop-types';
//** Service */
import { useLazyDownloadDocumentQuery } from '../../../../app/services/documentAPI';
import { useAddSupplierDocumentsMutation, useDeleteSupplierDocumentsByIdMutation, useLazyGetSupplierDocumentsByIdQuery } from '../../../../app/services/supplierDocuementsAPI';
//** Component's */
const DocumentGrid = React.lazy(() => import("../../../../common/features/component/Document/DocumentGrid"));


const supplierSecurityKey = {
    ADD: securityKey.ADDSUPPLIERDOCUMENT,
    DELETE: securityKey.DELETESUPPLIERDOCUMENT,
    DOWNALOD: securityKey.DOWNALODSUPPLIERDOCUMENT,
}

const SupplierDocumentDetail = ({ isEditablePage }) => {

    const { supplierId, isResponsibleUser } = useContext(AddSupplierContext);

    return (
        /**
            * This component displays an DocumentGrid for the supplier module.
            * This hook dynamically sets the API call based on the module (customer or supplier).
        */
        <DocumentGrid keyId={supplierId ? supplierId : 0} isSupplier={true} isEditablePage={isEditablePage}
            SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
            addDocuments={useAddSupplierDocumentsMutation} downloadDocument={useLazyDownloadDocumentQuery}
            deleteDocumentsById={useDeleteSupplierDocumentsByIdMutation} getDocumentsById={useLazyGetSupplierDocumentsByIdQuery} />
    )
}

SupplierDocumentDetail.propTypes = {
    isEditablePage: PropTypes.bool.isRequired,
};

export default SupplierDocumentDetail;