/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import { NotesData } from "./config/Notes.data";
import { AppIcons } from "../../../../../data/appIcons";
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import ToastService from "../../../../../services/toastService/ToastService";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";

//** Component's */
const NotesCard = React.lazy(() => import("./NotesCard"));

const NotesDetail = ({ keyId, isSupplier, isEditablePage, SecurityKey, onAddNotes, onUpdateNotes, onGetByIdNotes }) => {

  const notesFormRef = useRef();
  const { formSetting } = NotesData;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(NotesData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notesFormData, setNotesFormData] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  /* NOTE:- 
      API Call
      The "onAddNotes","onUpdateNotes","onGetByIdNotes" function is passed dynamically as a prop.
      This allows the NoteDetails component to be reused with different API call functions.
  */
  const [addNotes, { isLoading: isAddNotesLoading, isSuccess: isAddNotesSuccess, data: isAddNotesData, },] = onAddNotes();
  const [getNoteById, { isFetching: isGetNotesFetching, isSuccess: isGetNotesSuccess, data: isGetNotesData, },] = onGetByIdNotes();
  const [updateNotes, { isLoading: isUpdateNotesLoading, isSuccess: isUpdateNotesSuccess, data: isUpdateNotesData, },] = onUpdateNotes();

  const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
  const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);

  useEffect(() => {
    if (hasEditPermission && hasAddPermission) {
      if (isEditablePage) {
        if (hasEditPermission.isViewOnly === true) {
          formSetting.isViewOnly = true;
          setIsButtonDisable(true);
        } else {
          formSetting.isViewOnly = false;
          setIsButtonDisable(false);
        }
      }
      if (hasAddPermission.hasAccess === true) {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
        setButtonVisible(true);
      } else {
        formSetting.isViewOnly = true;
        setButtonVisible(false);
      }
    }
  }, [hasEditPermission, hasAddPermission, isEditablePage, formSetting]);

  useEffect(() => {
    if (isAddNotesSuccess && isAddNotesData) {
      ToastService.success(isAddNotesData.errorMessage);
      onGetNote(keyId);
      setShowModal(!showModal);
    }
  }, [isAddNotesSuccess, isAddNotesData]);

  useEffect(() => {
    if (!isGetNotesFetching && isGetNotesSuccess && isGetNotesData) {
      if (Array.isArray(isGetNotesData)) {
        setNotesFormData(isGetNotesData);
      }
    }
  }, [isGetNotesFetching, isGetNotesSuccess, isGetNotesData]);

  useEffect(() => {
    if (isUpdateNotesSuccess && isUpdateNotesData) {
      ToastService.success(isUpdateNotesData.errorMessage);
      onGetNote(keyId);
      setShowModal(false);
    }
  }, [isUpdateNotesSuccess, isUpdateNotesData]);

  useEffect(() => {
    keyId && onGetNote(keyId);
  }, [keyId])

  const handleToggleModal = () => {
    setIsEditMode(false);
    resetForm();
    setShowModal(!showModal);
  };

  const resetForm = () => {
    let form = { ...NotesData };
    setFormData(form);
  };

  const handleNotes = () => {
    let notesData = notesFormRef.current.getFormData();
    let request = {
      note: notesData.note,
    };

    if (isSupplier) {
      request.supplierId = keyId;
      if (notesData && notesData.supplierNoteId) {
        request.supplierNoteId = notesData.supplierNoteId;
      }
    } else {
      request.customerId = keyId;
      if (notesData && notesData.customerNoteId) {
        request.customerNoteId = notesData.customerNoteId;
      }
    }

    if (notesData && (notesData.supplierNoteId || notesData.customerNoteId)) {
      updateNotes(request);
    } else {
      addNotes(request);
    }
  };

  const onGetNote = (keyId) => {
    getNoteById(keyId);
  };

  const handleNoteData = (data) => {
    resetForm();
    setIsEditMode(true);
    const newformData = { ...formData };
    if (isSupplier) {
      newformData.initialState = {
        ...newformData,
        note: data.note,
        supplierNoteId: data.supplierNoteId,
      };
    } else {
      newformData.initialState = {
        ...newformData,
        note: data.note,
        customerNoteId: data.customerNoteId,
      };
    }

    setFormData(newformData);
  };

  return (
    <>
      <CardSection
        cardTitle="Notes"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={buttonVisible ? true : false}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <div className="note-card-sec">
          {!isGetNotesFetching ?
            <NotesCard
              isAddEditModal={handleToggleModal}
              onHandleNote={handleNoteData}
              notesFormData={notesFormData}
            />
            : <DataLoader />
          }
        </div>
      </CardSection>

      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        modalTitle="Add/Edit Notes"
        modelSizeClass="w-60"
      >
        <div className="row custom-height-tiny add-edit-notesForm">
          <FormCreator config={formData} ref={notesFormRef} {...formData} />
          <div className="col-md-12">
            <div className="d-flex align-item-end justify-content-end">
              <div className="d-flex align-item-end">
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText={isEditMode ? "Update" : "Add"}
                  onClick={handleNotes}
                  isLoading={isAddNotesLoading || isUpdateNotesLoading}
                  isDisable={isButtonDisable}
                />
                <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                  onClick={handleToggleModal}
                />
              </div>
            </div>
          </div>
        </div>
      </CenterModel>
    </>
  );
};
export default NotesDetail;
