import { AppIcons } from "../../../../../data/appIcons";
import Buttons from "../../../../../components/ui/button/Buttons";
import { getRandomColor } from "../../../../../utils/RandomColors/RandomColors";
import formatDate from "../../../../../lib/formatDate";

const NotesCard = ({ isAddEditModal, onHandleNote, notesFormData }) => {

  const handleEditClick = (note) => {
    isAddEditModal(true);
    if (onHandleNote) {
      onHandleNote(note);
    }
  };
  return (
    <>
      <div className="row">
        {notesFormData.length > 0 ? (
          notesFormData.map((notes, noteIndex) => (
            <div
              className="col-xxl-6 col-xl-6 col-md-6 col-12 mb-2"
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
                        dangerouslySetInnerHTML={{
                          __html: notes.note,
                        }}
                      ></div>
                    </div>
                    <div className="card-notes ">
                      <div className="note-label  ">Created on {formatDate(notes.noteDate, "DD/MM/YYYY hh:mm")} by {notes.fullName}</div>
                      <div className="edit-button ">
                        <Buttons
                          buttonTypeClassName="edit-btn"
                          onClick={() => handleEditClick(notes)}
                          textWithIcon={true}
                          imagePath={AppIcons.editThemeIcon}
                        ></Buttons>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No notes available</div>
        )}
      </div>
    </>
  );
};
export default NotesCard;
