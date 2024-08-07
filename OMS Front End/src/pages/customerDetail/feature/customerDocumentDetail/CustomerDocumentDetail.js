import React, { useContext } from 'react';
import { securityKey } from '../../../../data/SecurityKey';
import PropTypes from 'prop-types';
//** Service */
import { useAddCustomerDocumentsMutation, useDeleteCustomerDocumentsByIdMutation, useLazyDownloadDocumentQuery, useLazyGetCustomerDocumentsByIdQuery } from '../../../../app/services/documentAPI';
//** Component's */
import DocumentGrid from '../../../../common/features/component/Document/DocumentGrid';
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERDOCUMENT,
    DELETE: securityKey.DELETECUSTOMERDOCUMENT,
    DOWNALOD: securityKey.DOWNALODCUSTOMERDOCUMENT,
}

const CustomerDocumentDetail = ({ isEditablePage }) => {

    const { customerId, isResponsibleUser } = useContext(BasicDetailContext);

    return (
        /**
            * This component displays an DocumentGrid for the supplier module.
            * This hook dynamically sets the API call based on the module (customer or supplier).
        */
        <DocumentGrid keyId={customerId || 0} isSupplier={false} isEditablePage={isEditablePage}
            SecurityKey={!isResponsibleUser ? customerSecurityKey : null}
            addDocuments={useAddCustomerDocumentsMutation} downloadDocument={useLazyDownloadDocumentQuery}
            deleteDocumentsById={useDeleteCustomerDocumentsByIdMutation} getDocumentsById={useLazyGetCustomerDocumentsByIdQuery} />
    )
}
CustomerDocumentDetail.propTypes = {
    isEditablePage: PropTypes.bool.isRequired
};
export default CustomerDocumentDetail;