import React, { useContext } from 'react';
import AddSupplierContext from '../../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
import { securityKey } from '../../../../../../../data/SecurityKey';

const DocumentDetails = React.lazy(() => import("./DocuementDetails"));

const supplierSecurityKey = {
    ADD: securityKey.ADDSUPPLIERDOCUMENT,
    DELETE: securityKey.DELETESUPPLIERDOCUMENT,
    DOWNALOD: securityKey.DOWNALODSUPPLIERDOCUMENT,
}

const SupplierDocumentDetail = ({ isEditablePage }) => {
    const { supplierId , isResponsibleUser } = useContext(AddSupplierContext);
    return (
        <DocumentDetails mainId={supplierId ? supplierId : 0}
            isEditablePage={isEditablePage} SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
        />
    )
}

export default SupplierDocumentDetail;