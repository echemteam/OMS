import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
//** Lib's */
import formatDate from "../../../../../lib/formatDate";
import { AppIcons } from "../../../../../data/appIcons";
import Buttons from "../../../../../components/ui/button/Buttons";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import { getRandomColor } from "../../../../../utils/RandomColors/RandomColors";

const NoteList = forwardRef(({ keyId, handleEditClick, onGetByIdNotes, listRef }) => {

    //** States */
    const [notesFormData, setNotesFormData] = useState([]);

    //** API Call's */
    /**
        * This hook dynamically sets the API call based on the module (customer or supplier).
        * The API endpoint and parameters are configured within the SupplierNoteDetail OR CustomerNoteDetail component.
    */
    const [getNoteById, { isFetching: isGetNotesFetching, isSuccess: isGetNotesSuccess, data: isGetNotesData }] = onGetByIdNotes();

    //** UseEffect */
    useEffect(() => {
        keyId && onGetNote(keyId);
    }, [keyId]);

    useEffect(() => {
        if (!isGetNotesFetching && isGetNotesSuccess && isGetNotesData) {
            if (Array.isArray(isGetNotesData)) {
                setNotesFormData(isGetNotesData);
            }
        }
    }, [isGetNotesFetching, isGetNotesSuccess, isGetNotesData]);

    //** Handle Changes */
    const onGetNote = (keyId) => {
        getNoteById(keyId);
    };

    //** UseImperativeHandle */
    useImperativeHandle(listRef, () => ({
        callListFunction: onGetNote
    }));


    return (
        <div className="row">
            {!isGetNotesFetching ?
                <> {notesFormData.length > 0 ? (
                    notesFormData.map((notes, noteIndex) => (
                        <div className="col-xxl-6 col-xl-6 col-md-6 col-12 mb-2" key={noteIndex}>
                            <div className={`notes-card randomColor ${getRandomColor(noteIndex)}`}>
                                <div className="card-content">
                                    <div className="bottom-info">
                                        <div className="note-text editor-section">
                                            <div dangerouslySetInnerHTML={{ __html: notes.note }}></div>
                                        </div>
                                        <div className="card-notes ">
                                            <div className="note-label">Created on {formatDate(notes.noteDate, "MM/DD/YYYY hh:mm A")} by {notes.fullName}</div>
                                            <div className="edit-button">
                                                <Buttons
                                                    buttonTypeClassName="edit-btn"
                                                    onClick={() => handleEditClick(notes)}
                                                    textWithIcon={true}
                                                    imagePath={AppIcons.editThemeIcon}></Buttons>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No notes available</div>
                )
                }</>
                : <DataLoader />
            }
        </div>
    )
});

export default NoteList;