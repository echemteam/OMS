import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";

const NotesCard = ({isAddEditModal}) => {
  const NotesList = [
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Janavi patel",
      AssignAt: "May 21,2024",
    },
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Nidhi patel",
      AssignAt: "June 10,2024",
    },
  ];

  //    const colorlist=[var(--lightBlue), var(--lightGreen);]
  return (
    <>
      <div className="row">
        {NotesList.map((notes, noteIndex) => (
          <div className="col-xxl-4 col-xl-6 col-md-6 col-12" key={noteIndex}>
            <div className="notes-card">
              <div className="card-content">
                <div className="note-label  ">{notes.AssignBy}</div>
                <div className="bottom-info">
                  <div className="note-text ">
                    <p>{notes.Note}</p>
                  </div>
                  <div className="card-notes ">
                    <div className="note-date ">{notes.AssignAt}</div>
                    <div className="edit-button ">
                      <button onClick={isAddEditModal} className="edit-btn">
                        <Image imagePath={AppIcons.editThemeIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default NotesCard;
