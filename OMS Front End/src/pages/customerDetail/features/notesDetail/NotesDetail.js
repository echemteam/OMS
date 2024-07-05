import { useContext, useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import NotesCard from "./features/NotesCard";
import Buttons from "../../../../components/ui/button/Buttons";

import FormCreator from "../../../../components/Forms/FormCreator";
import { NotesData } from "./features/config/Notes.data";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";

import ToastService from "../../../../services/toastService/ToastService";
import {
  useAddCustomerNotesMutation,
  useLazyGetCustomerNoteByCustomerIdQuery,
  useUpdateCustomerNotesMutation,
} from "../../../../app/services/notesAPI";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { securityKey } from "../../../../data/SecurityKey";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";


const NotesDetail = ({ isEditablePage }) => {
  const notesFormRef = useRef();
  const { formSetting } = NotesData;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(NotesData);
  const { customerId } = useContext(BasicDetailContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notesFormData, setNotesFormData] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [addCustomerNotes, { isLoading: isAddNotesLoading, isSuccess: isAddNotesSuccess, data: isAddNotesData, },] = useAddCustomerNotesMutation();
  const [updateCustomerNotes, { isLoading: isUpdateNotesLoading, isSuccess: isUpdateNotesSuccess, data: isUpdateNotesData, },] = useUpdateCustomerNotesMutation();
  const [getCustomerNoteByCustomerId, { isFetching: isGetNotesFetching, isSuccess: isGetNotesSuccess, data: isGetNotesData, },] = useLazyGetCustomerNoteByCustomerIdQuery();

  const hasAddPermission = hasFunctionalPermission(securityKey.ADDCUSTOMERNOTE);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITCUSTOMERNOTE);

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
  }, [hasEditPermission, hasAddPermission]);

  useEffect(() => {
    if (isAddNotesSuccess && isAddNotesData) {
      ToastService.success(isAddNotesData.errorMessage);
      onGetNote();
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
      onGetNote();
      setShowModal(false);
    }
  }, [isUpdateNotesSuccess, isUpdateNotesData]);

  useEffect(() => {
    customerId && onGetNote(customerId);
  }, [customerId])

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

    if (notesData && !notesData.customerNoteId) {
      let request = {
        customerId: customerId,
        note: notesData.note,
      };
      addCustomerNotes(request);

    } else if (notesData && notesData.customerNoteId) {
      const updateRequest = {
        customerId: customerId,
        note: notesData.note,
        customerNoteId: notesData.customerNoteId,
      };
      updateCustomerNotes(updateRequest);

    }
  };
  const onGetNote = (customerId) => {
    getCustomerNoteByCustomerId(customerId);
  };

  const handleNoteData = (data) => {
    resetForm();
    setIsEditMode(true);
    const newformData = { ...formData };
    newformData.initialState = {
      ...newformData,
      note: data.note,
      customerNoteId: data.customerNoteId,
    };
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
        <div className="row horizontal-form custom-height-tiny">
          <FormCreator config={formData} ref={notesFormRef} {...formData} />
          <div className="col-md-12 mt-2">
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
