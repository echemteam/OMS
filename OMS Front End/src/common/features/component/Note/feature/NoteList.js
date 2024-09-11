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
import TimeLine from "../../../../../components/ui/timeline/TimeLine";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import Tooltip from "../../../../../components/ui/tooltip/Tooltip";
import { useLazyGetNotesHistoryQuery } from "../../../../../app/services/commonAPI";
import { NoteTypes, OwnerType } from "../../../../../utils/Enums/commonEnums";

const NoteList = forwardRef(
  ({ keyId, handleEditClick, onGetByIdNotes, showEditIcon, listRef ,isSupplier}) => {
    //** States */
    const [notesFormData, setNotesFormData] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const[noteTimeLineList,setNoteTimeLineList]=useState([]);

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
    const [
      getNotesHistory,
      {
        isFetching: isGetNotesHistoryFetching,
        isSuccess: isGetNotesHistorySuccess,
        data: isGetNotesHistoryData,
      },
    ] = useLazyGetNotesHistoryQuery();

    const handleHistory=(noteId)=>{
      let req = {
         entityId:noteId,
         ownerId: keyId,
         ownerTypeId:isSupplier ? OwnerType.Supplier:OwnerType.Customer,
         noteType:NoteTypes.DefaultNote,

       };
       getNotesHistory(req);
    }

    //** UseEffect */
    useEffect(() => {
      keyId && onGetNote(keyId);
    }, [keyId]);

    useEffect(() => {
      
      if ( !isGetNotesHistoryFetching &&isGetNotesHistorySuccess && isGetNotesHistoryData ) {
        if(isGetNotesHistoryData){
          setNoteTimeLineList(isGetNotesHistoryData);
        }
      }
    }, [isGetNotesHistoryFetching, isGetNotesHistorySuccess, isGetNotesHistoryData,]);

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
    const handleToggleModal = (NoteId) => {

      handleHistory(NoteId);
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
                          <div
                            className="history-btn"
                            onClick={() =>handleToggleModal(isSupplier ? notes.supplierNoteId : notes.customerNoteId)}
                          >
                            <Iconify
                              icon="iconamoon:history-bold"
                              className="history-btn"
                            />
                            <Tooltip text="History"/>
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
          contentClass="content-50"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <TimeLine notesData={noteTimeLineList} />
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
