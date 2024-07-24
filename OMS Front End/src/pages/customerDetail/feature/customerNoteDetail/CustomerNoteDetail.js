import { useContext } from "react";
import { securityKey } from "../../../../data/SecurityKey";
import NoteGrid from "../../../../common/features/component/Note/NoteGrid";
import { useAddCustomerNotesMutation, useLazyGetCustomerNoteByCustomerIdQuery, useUpdateCustomerNotesMutation } from "../../../../app/services/notesAPI";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import PropTypes from 'prop-types';

const customerSecurityKey = {
    ADD: securityKey.ADDCUSTOMERNOTE,
    EDIT: securityKey.EDITCUSTOMERNOTE,
}

const CustomerNoteDetail = ({ isEditablePage }) => {

    const { customerId, isResponsibleUser } = useContext(BasicDetailContext);

    return (
        /**
            * This component displays an NoteGrid for the supplier module.
            * This hook dynamically sets the API call based on the module (customer or supplier).
        */
        <NoteGrid keyId={customerId ? customerId : 0} isEditablePage={isEditablePage} SecurityKey={!isResponsibleUser ? customerSecurityKey : null} isSupplier={false}
            onAddNotes={useAddCustomerNotesMutation} onUpdateNotes={useUpdateCustomerNotesMutation} onGetByIdNotes={useLazyGetCustomerNoteByCustomerIdQuery} />
    )
}

CustomerNoteDetail.propTypes = {
    isEditablePage: PropTypes.bool.isRequired,
};

export default CustomerNoteDetail;