import { useState, useEffect } from "react";
import { useLazyGetDetailsbyCustomerIDQuery } from "../../../../app/services/customerSettingsAPI";

const CustomerSupplierNotes = ({ mainId, isSupplierApproval, onGetByIdNotes }) => {

    const [notes, setNotes] = useState();
    const [invoiceNote, setInvoiceNote] = useState();

    const [getNoteById, { isFetching: isGetNotesFetching, isSuccess: isGetNotesSuccess, data: isGetNotesData }] = onGetByIdNotes();
    const [GetDetailsbyCustomerID, { isFetching: isGetDetailByCustomerIdFetching, isSuccess: isGetDetailByCustomerIdSuccess, data: isGetDetailByCustomerIdData }] = useLazyGetDetailsbyCustomerIDQuery();

    useEffect(() => {
        if (mainId) {
            getNoteById(mainId);
            GetDetailsbyCustomerID(mainId);
        }
    }, [mainId]);

    useEffect(() => {
        if (!isGetDetailByCustomerIdFetching && isGetDetailByCustomerIdSuccess && isGetDetailByCustomerIdData) {
            setInvoiceNote(isGetDetailByCustomerIdData.invoiceSubmissionInstruction);
        }
    }, [isGetDetailByCustomerIdFetching, isGetDetailByCustomerIdSuccess, isGetDetailByCustomerIdData]);

    useEffect(() => {
        if (!isGetNotesFetching && isGetNotesSuccess && isGetNotesData) {
            const latestNote = isGetNotesData[0]; // get the latest note
            setNotes(latestNote.note);
        }
    }, [isGetNotesFetching, isGetNotesSuccess, isGetNotesData])

    return (
        <>
            {/* This Note for only Customer */}
            {!isSupplierApproval &&
                <div>
                    <h6>Invoice Submission Instruction:</h6>
                    <span className="validation-msg" dangerouslySetInnerHTML={{ __html: invoiceNote }} />
                </div>
            }
            <div>
                <h6>Note:</h6>
                <span className="validation-msg" dangerouslySetInnerHTML={{ __html: notes }} />
            </div>
        </>
    )
}

export default CustomerSupplierNotes;