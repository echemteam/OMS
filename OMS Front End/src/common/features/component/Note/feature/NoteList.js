/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
//** Lib's */
import formatDate from "../../../../../lib/formatDate";
import { AppIcons } from "../../../../../data/appIcons";
import Buttons from "../../../../../components/ui/button/Buttons";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import { getRandomColor } from "../../../../../utils/RandomColors/RandomColors";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import PropTypes from "prop-types";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import { Link } from "react-router-dom";
import TimeLine from "../../../../../components/ui/timeline/TimeLine";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";

const NoteList = forwardRef(
  ({ keyId, handleEditClick, onGetByIdNotes, showEditIcon, listRef }) => {
    //** States */
    const [notesFormData, setNotesFormData] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);

    //** API Call's */
    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierNoteDetail OR CustomerNoteDetail component.
     */
    const [
      getNoteById,
      {
        isFetching: isGetNotesFetching,
        isSuccess: isGetNotesSuccess,
        data: isGetNotesData,
      },
    ] = onGetByIdNotes();

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
      callListFunction: onGetNote,
    }));
    //** Handle Changes */
    const handleToggleModal = () => {
      setIsModelOpen(true);
    };
    const onSidebarClose = () => {
      setIsModelOpen(false);
    };
    return (
      <div className="row">
        {!isGetNotesFetching ? (
          <>
            {" "}
            {notesFormData.length > 0 ? (
              notesFormData.map((notes, noteIndex) => (
                <div
                  className="col-xxl-4 col-xl-4 col-md-4 col-12 mb-2"
                  key={noteIndex}
                >
                  <div
                    className={`notes-card randomColor ${getRandomColor(
                      noteIndex
                    )}`}
                  >
                    <div className="card-content">
                      <div className="bottom-info">
                        <div className="note-text editor-section">
                          <div
                            dangerouslySetInnerHTML={{ __html: notes.note }}
                          ></div>
                          <div className="history-btn">
                            <Iconify
                              icon="mdi:ellipsis-vertical"
                              className="history-btn"
                            />
                            <div className="btn-dropdown-menu">
                              <Link onClick={handleToggleModal}>History</Link>
                            </div>
                          </div>
                        </div>
                        <div className="card-notes ">
                          <div className="note-label">
                            Created on{" "}
                            {formatDate(notes.noteDate, "MM/DD/YYYY hh:mm A")}{" "}
                            by {notes.fullName}
                          </div>
                          <div className="edit-button">
                            {showEditIcon ? (
                              <Buttons
                                buttonTypeClassName="edit-btn"
                                onClick={() => handleEditClick(notes)}
                                textWithIcon={true}
                                imagePath={AppIcons.editThemeIcon}
                              ></Buttons>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoRecordFound />
            )}
          </>
        ) : (
          <DataLoader />
        )}
        <SidebarModel
          modalTitle="History"
          contentClass="content-60"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <TimeLine />
        </SidebarModel>
      </div>
    );
  }
);

NoteList.propTypes = {
  keyId: PropTypes.number.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  onGetByIdNotes: PropTypes.func.isRequired,
  showEditIcon: PropTypes.bool.isRequired,
  listRef: PropTypes.shape({
    current: PropTypes.shape({
      callListFunction: PropTypes.func,
    }),
  }),
};

export default NoteList;
