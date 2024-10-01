import { useState, useEffect } from "react";
import { useLazyGetDetailsbyCustomerIDQuery } from "../../../../app/services/customerSettingsAPI";
import Iconify from "../../../ui/iconify/Iconify";

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
      setInvoiceNote(isGetDetailByCustomerIdData.invoiceSubmissionInstruction);
    }
  }, [
    isGetDetailByCustomerIdFetching,
    isGetDetailByCustomerIdSuccess,
    isGetDetailByCustomerIdData,
  ]);

  useEffect(() => {
    if (!isGetNotesFetching && isGetNotesSuccess && isGetNotesData) {
      const latestNote = isGetNotesData[0]; // get the latest note
      setNotes(latestNote.note);
    }
  }, [isGetNotesFetching, isGetNotesSuccess, isGetNotesData]);
  // Toggle active section
  const toggleSection = (index) => {
    const updatedSections = [...openSections];
    updatedSections[index] = !updatedSections[index]; // Toggle the clicked section
    setOpenSections(updatedSections);
  };

  return (
    <>
      <div
        className={`card-top-title ${openSections[0] ? "active" : ""}`}
        onClick={() => toggleSection(0)}
      >
        <div className="d-flex align-items-center mr-2">
          <span>
            <Iconify icon="ep:arrow-down-bold" className="open-bar" />
          </span>
          <h5> Notes </h5>
        </div>
      </div>
      {/* This Note for only Customer */}
      {openSections[0] && (
        <>
          <div className="card-info-checklist">
            {!isSupplierApproval && (
              <div className="card-part border-0">
                <h5 className="title"> Invoice Submission Instruction</h5>
                <div class="card-part p-0 m-0"></div>
                <span
                  className="validation-msg"
                  dangerouslySetInnerHTML={{ __html: invoiceNote }}
                />
              </div>
            )}
            <div className="card-part">
              <h5 className="title"> Note:</h5>
              <div class="card-part p-0 m-0"></div>
              <span
                className="validation-msg"
                dangerouslySetInnerHTML={{ __html: notes }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerSupplierNotes;
