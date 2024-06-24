import React from 'react';
 
const DocumentDetails = React.lazy(() => import("./DocuementDetails"));

const SupplierDocumentDetail = ({ pageId }) => {
    return (
        <DocumentDetails pageId={pageId}  />
    )
}

export default SupplierDocumentDetail;