import React, { useContext } from 'react';
import AddSupplierContext from '../../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
 
const DocumentDetails = React.lazy(() => import("./DocuementDetails"));

const SupplierDocumentDetail = () => {
    const { supplierId } = useContext(AddSupplierContext);
    return (
        <DocumentDetails mainId={supplierId ? supplierId : 0}  />
    )
}

export default SupplierDocumentDetail;