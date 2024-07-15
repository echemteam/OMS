import { useContext } from "react";
import { securityKey } from "../../../../data/SecurityKey";
import NoteGrid from "../../../../common/features/component/Note/NoteGrid";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { useAddSupplierNotesMutation, useLazyGetSupplierNotesBySupplierIdQuery, useUpdateSupplierNotesMutation } from "../../../../app/services/supplierNotesAPI";

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
        <NoteGrid keyId={supplierId ? supplierId : 0} isEditablePage={isEditablePage} SecurityKey={!isResponsibleUser ? supplierSecurityKey : null} isSupplier={true}
            onAddNotes={useAddSupplierNotesMutation} onUpdateNotes={useUpdateSupplierNotesMutation} onGetByIdNotes={useLazyGetSupplierNotesBySupplierIdQuery} />
    )
}

export default SupplierNoteDetail;