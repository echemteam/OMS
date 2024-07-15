import { useEffect, useRef, useState } from "react";
//** Lib's */
import { NotesData } from "../config/Notes.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";

const AddEditNote = ({ keyId, onAddNotes, onUpdateNotes, isSupplier, isEditMode, isEditModeData, isButtonDisable, handleToggleModal, onSuccess }) => {

    //** States */
    const ref = useRef();
    const [formData, setFormData] = useState(NotesData);
    const [supplierNoteId, setSupplierNoteId] = useState(0);
    const [customerNoteId, setCustomerNoteId] = useState(0);

    //** API Call's */
    /**
        * This hook dynamically sets the API call based on the module (customer or supplier).
        * The API endpoint and parameters are configured within the SupplierNoteDetail OR CustomerNoteDetail component.
    */
    const [addNotes, { isLoading: isAddNotesLoading, isSuccess: isAddNotesSuccess, data: isAddNotesData }] = onAddNotes();
    const [updateNotes, { isLoading: isUpdateNotesLoading, isSuccess: isUpdateNotesSuccess, data: isUpdateNotesData }] = onUpdateNotes();

    //** UseEffect */
    useEffect(() => {
        if (isAddNotesSuccess && isAddNotesData) {
            handleAddEditResponse(isAddNotesSuccess, isAddNotesData);
        }
        if (isUpdateNotesSuccess && isUpdateNotesData) {
            handleAddEditResponse(isUpdateNotesSuccess, isUpdateNotesData);
        }
    }, [isAddNotesSuccess, isAddNotesData, isUpdateNotesSuccess, isUpdateNotesData]);

    useEffect(() => {
        if (isEditMode && isEditModeData) {
            const newformData = { ...formData };
            newformData.initialState = {
                note: isEditModeData.note
            };
            isSupplier ? setSupplierNoteId(isEditModeData.supplierNoteId) : setCustomerNoteId(isEditModeData.customerNoteId)
            setFormData(newformData);
        }
    }, [isEditMode, isEditModeData]);

    //** Handle Changes */
    const handleAddEditResponse = (isSuccess, responseData) => {
        if (isSuccess && responseData) {
            if (responseData.errorMessage.includes("EXISTS")) {
                ToastService.warning(responseData.errorMessage);
                return;
            }
            ToastService.success(responseData.errorMessage);
            onSuccess();
        }
    }
    const handleNotes = () => {
        let notesData = ref.current.getFormData();
        let request = {
            note: notesData.note,
            [isSupplier ? 'supplierId' : 'customerId']: keyId,
            [isSupplier ? 'supplierNoteId' : 'customerNoteId']: isSupplier ? supplierNoteId : customerNoteId,
        };
        if (notesData && (supplierNoteId || customerNoteId)) {
            updateNotes(request);
        } else {
            addNotes(request);
        }
    };


    return (
        <div className="row custom-height-tiny add-edit-notesForm">
            <FormCreator config={formData} ref={ref} {...formData} />
            <div className="col-md-12">
                <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText={isEditMode ? "Update" : "Add"}
                            onClick={handleNotes}
                            isLoading={isAddNotesLoading || isUpdateNotesLoading}
                            isDisable={isButtonDisable} />
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={handleToggleModal} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEditNote;