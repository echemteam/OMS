import React, { useContext } from "react";
import PropTypes from 'prop-types';
//** Libs's */
import { securityKey } from "../../../../data/SecurityKey";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Service's */
import { useAddSupplierNotesMutation, useLazyGetSupplierNotesBySupplierIdQuery, useUpdateSupplierNotesMutation } from "../../../../app/services/supplierNotesAPI";
//** Component's */
const NoteGrid = React.lazy(() => import("../../../../common/features/component/Note/NoteGrid"));

const supplierSecurityKey = {
    ADD: securityKey.ADDSUPPLIERNOTE,
    EDIT: securityKey.EDITSUPPLIERNOTE,
}


const SupplierNoteDetail = ({ isEditablePage }) => {

    const { supplierId, isResponsibleUser } = useContext(AddSupplierContext);

    return (
        /**
            * This component displays an NoteGrid for the supplier module.
            * This hook dynamically sets the API call based on the module (customer or supplier).
        */
        <NoteGrid keyId={supplierId || 0} isEditablePage={isEditablePage} SecurityKey={!isResponsibleUser ? supplierSecurityKey : null} isSupplier={true}
            onAddNotes={useAddSupplierNotesMutation} onUpdateNotes={useUpdateSupplierNotesMutation} onGetByIdNotes={useLazyGetSupplierNotesBySupplierIdQuery} />
    )
}

SupplierNoteDetail.propTypes = {
    isEditablePage: PropTypes.bool.isRequired
};

export default SupplierNoteDetail;