import { AppIcons } from "../../../../../data/appIcons";
import Buttons from "../../../../../components/ui/button/Buttons";
import { getRandomColor } from "../../../../../utils/RandomColors/RandomColors";

const NotesCard = ({ isAddEditModal }) => {
  const NotesList = [
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Kirtan patel",
      AssignAt: "May 21,2024",
    },
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Kirtan patel",
      AssignAt: "June 10,2024",
    },
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Janavi patel",
      AssignAt: "May 21,2024",
    },
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Janavi patel",
      AssignAt: "May 21,2024",
    },
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Janavi patel",
      AssignAt: "May 21,2024",
    },
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Kirtan patel",
      AssignAt: "May 21,2024",
    },
    {
      Note: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      AssignBy: "Kirtan patel",
      AssignAt: "May 21,2024",
    },
  ];

  return (
    <>
      <div className="row">
        {NotesList.map((notes, noteIndex) => (
          <div className="col-xxl-4 col-xl-6 col-md-6 col-12" key={noteIndex}>
            <div className={`notes-card randomColor ${getRandomColor(noteIndex)}`}>
              <div className="card-content">
                <div className="note-label  ">{notes.AssignBy}</div>
                <div className="bottom-info">
                  <div className="note-text ">
                    <p>{notes.Note}</p>
                  </div>
                  <div className="card-notes ">
                    <div className="note-date ">{notes.AssignAt}</div>
                    <div className="edit-button ">
                      <Buttons
                        buttonTypeClassName="edit-btn"
                        onClick={isAddEditModal}
                        textWithIcon={true}
                        imagePath={AppIcons.editThemeIcon}
                      >
                      </Buttons>
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
