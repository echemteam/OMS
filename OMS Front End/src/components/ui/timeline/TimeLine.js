import React from "react";
import "./TimeLine.scss";
import { getRandomColor } from "../../../utils/RandomColors/RandomColors";
const notesData = [
  {
    htmltext:
      "<p>This is the first note This is the first noteThis is the first noteThis is the first noteThis is the first noteThis is the first note.</p>",
    author: "Pankaj Chauhan",
    createdDate: "16-Sep-2024",
    createdTime: "14:25:00",
  },
  {
    htmltext:
      "<h4>This is the second note.</h4> <ol><li><strong>Test NotesTest NotesTest NotesTest NotesTest&nbsp;</strong></li><li><strong>NotesTest NotesTest NotesTest Notes</strong></li></ol>",
    author: "John Doe",
    createdDate: "17-Sep-2024",
    createdTime: "09:15:00",
  },
  {
    htmltext:
      "<h4>second note.</h4><ul><li>Test NotesTest NotesTest NotesTest NotesTest&nbsp;</li><li>NotesTest NotesTest NotesTest Notes</li></ul> <a>test link</a>",
    author: "John Doe",
    createdDate: "17-Sep-2024",
    createdTime: "09:15:00",
  },
  // Add more note objects as needed
];
const TimeLine = () => {
  const htmltext =
    "<h6>Note Title 1</h6> <p>This is the content of the first note.</p>";
  return (
    <div className="timeline-section">
      <div className="timeline-ui">
        <div className="msg-desc">
          <ul>
            {notesData.map((note, index) => (
              <li key={index} className={`${getRandomColor(index)}`}>
                <div className="notes-desc">
                  <div className="desc-sec">
                    <div className="notes-sec">
                      <div
                        className="html-render"
                        dangerouslySetInnerHTML={{ __html: note.htmltext }}
                      ></div>
                    </div>
                    <div className="name-time">
                      <span className="name">
                        Created By: <span>{note.author}</span>
                      </span>
                    </div>
                  </div>
                  <div className="date-time-sec">
                    <div className="date">{note.createdDate}</div>
                    <div className="time">{note.createdTime}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="center-line"></div>
      </div>
    </div>
  );
};

export default TimeLine;
