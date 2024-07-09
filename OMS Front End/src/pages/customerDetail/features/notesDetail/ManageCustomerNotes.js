import React, { useContext } from 'react';
//** Lib's */
import { securityKey } from '../../../../data/SecurityKey';
import BasicDetailContext from '../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service */
import { useAddCustomerNotesMutation, useLazyGetCustomerNoteByCustomerIdQuery, useUpdateCustomerNotesMutation } from '../../../../app/services/notesAPI';
//** Component's */
const NotesDetail = React.lazy(() => import("./features/NotesDetail"));

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERNOTE,
    EDIT: securityKey.EDITCUSTOMERNOTE,
}

const ManageCustomerNotes = ({ isEditablePage }) => {

    const { customerId, isResponsibleUser } = useContext(BasicDetailContext);

    return (
        /* NOTE:- 
            API Call
            The "onAddNotes","onUpdateNotes","onGetByIdNotes" function is passed dynamically as a prop.
            This allows the NoteDetails component to be reused with different API call functions.
        */
        <NotesDetail keyId={customerId ? customerId : 0} isEditablePage={isEditablePage} SecurityKey={!isResponsibleUser ? customerSecurityKey : null} isSupplier={false}
            onAddNotes={useAddCustomerNotesMutation} onUpdateNotes={useUpdateCustomerNotesMutation} onGetByIdNotes={useLazyGetCustomerNoteByCustomerIdQuery} />
    )
}

export default ManageCustomerNotes;