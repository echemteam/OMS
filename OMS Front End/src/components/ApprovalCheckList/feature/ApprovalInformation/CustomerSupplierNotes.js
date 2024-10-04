import React, { useState, useEffect } from "react";
import { useLazyGetDetailsbyCustomerIDQuery } from "../../../../app/services/customerSettingsAPI";
import Iconify from "../../../ui/iconify/Iconify";
import NoRecordFound from "../../../ui/noRecordFound/NoRecordFound";

const CustomerSupplierNotes = ({
  mainId,
  isSupplierApproval,
  onGetByIdNotes,
}) => {
  const [notes, setNotes] = useState();
  const [invoiceNote, setInvoiceNote] = useState();

  const [
    getNoteById,
    {
      isFetching: isGetNotesFetching,
      isSuccess: isGetNotesSuccess,
      data: isGetNotesData,
    },
  ] = onGetByIdNotes();
  const [
    GetDetailsbyCustomerID,
    {
      isFetching: isGetDetailByCustomerIdFetching,
      isSuccess: isGetDetailByCustomerIdSuccess,
      data: isGetDetailByCustomerIdData,
    },
  ] = useLazyGetDetailsbyCustomerIDQuery();
  const [openSections, setOpenSections] = useState([true]);
  const [openNoteSections, setOpenNoteSections] = useState([true]);
  useEffect(() => {
    if (mainId) {
      getNoteById(mainId);
      GetDetailsbyCustomerID(mainId);
    }
  }, [mainId]);

  useEffect(() => {
    if (
      !isGetDetailByCustomerIdFetching &&
      isGetDetailByCustomerIdSuccess &&
      isGetDetailByCustomerIdData
    ) {
      if (isGetDetailByCustomerIdData?.invoiceSubmissionInstruction) {
        setInvoiceNote(isGetDetailByCustomerIdData.invoiceSubmissionInstruction);
      }
    }
  }, [
    isGetDetailByCustomerIdFetching,
    isGetDetailByCustomerIdSuccess,
    isGetDetailByCustomerIdData,
  ]);

  useEffect(() => {
    if (!isGetNotesFetching && isGetNotesSuccess && isGetNotesData) {
      if (isGetNotesData?.length > 0) {
        const latestNote = isGetNotesData[0]; // get the latest note
        setNotes(latestNote.note);
      }
    }
  }, [isGetNotesFetching, isGetNotesSuccess, isGetNotesData]);

  // Toggle active section
  const toggleSection = (index) => {
    const updatedSections = [...openSections];
    updatedSections[index] = !updatedSections[index]; // Toggle the clicked section
    setOpenSections(updatedSections);
  };

  const toggleNoteSection = (index) => {
    const updatedSections = [...openNoteSections];
    updatedSections[index] = !updatedSections[index]; // Toggle the clicked section
    setOpenNoteSections(updatedSections);
  };

  return (
    <>
      {!isSupplierApproval &&
        <>
          <div className={`card-top-title ${openSections[0] ? "active" : ""}`} onClick={() => toggleSection(0)}>
            <div className="d-flex align-items-center mr-2">
              <span>
                <Iconify icon="ep:arrow-down-bold" className="open-bar" />
              </span>
              <h5>Invoice Submission Instruction</h5>
            </div>
          </div>
          {openSections[0] && (
            <div className="card-info-checklist">
              <div className="pt-2">
                {invoiceNote ?
                  <span
                    className="validation-msg"
                    dangerouslySetInnerHTML={{ __html: invoiceNote }}
                  />
                  :
                  <NoRecordFound />
                }
              </div>
            </div>
          )}
        </>}
      <div className={`card-top-title ${openNoteSections[0] ? "active" : ""}`}
        onClick={() => toggleNoteSection(0)}>
        <div className="d-flex align-items-center mr-2">
          <span>
            <Iconify icon="ep:arrow-down-bold" className="open-bar" />
          </span>
          <h5> Notes </h5>
        </div>
      </div>
      {/* This Note for only Customer */}
      {openNoteSections[0] && (
        <>
          <div className="card-info-checklist">
            <div className="pt-2">
              {notes ?
                <span
                  className="validation-msg"
                  dangerouslySetInnerHTML={{ __html: notes }}
                />
                :
                <NoRecordFound />
              }
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerSupplierNotes;
