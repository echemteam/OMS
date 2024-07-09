import React, { useContext } from 'react';
//** Lib's */
import AddSupplierContext from '../../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
//** Service */
import { securityKey } from '../../../../../../../data/SecurityKey';
import { useAddSupplierNotesMutation, useLazyGetSupplierNotesBySupplierIdQuery, useUpdateSupplierNotesMutation } from '../../../../../../../app/services/supplierNotesAPI';
//** Component's */
const NotesDetail = React.lazy(() => import("../../../../../../customerDetail/features/notesDetail/features/NotesDetail"));

const supplierSecurityKey = {
    ADD: securityKey.ADDSUPPLIERNOTE,
    EDIT: securityKey.EDITSUPPLIERNOTE,
}

const ManageSupplierNotes = ({ isEditablePage }) => {

    const { supplierId, isResponsibleUser } = useContext(AddSupplierContext);

    return (
        /* NOTE:- 
            API Call
            The "onAddNotes","onUpdateNotes","onGetByIdNotes" function is passed dynamically as a prop.
            This allows the NoteDetails component to be reused with different API call functions.
        */
        <NotesDetail keyId={supplierId ? supplierId : 0} isEditablePage={isEditablePage} SecurityKey={!isResponsibleUser ? supplierSecurityKey : null} isSupplier={true}
            onAddNotes={useAddSupplierNotesMutation} onUpdateNotes={useUpdateSupplierNotesMutation} onGetByIdNotes={useLazyGetSupplierNotesBySupplierIdQuery} />
    )
}

export default ManageSupplierNotes;