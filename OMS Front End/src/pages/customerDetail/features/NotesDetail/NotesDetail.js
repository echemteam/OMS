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

const NotesDetail = (props) => {
  const notesFormRef = useRef();
  const [showModal, setShowModal] = useState(false);
 const [formData, setFormData] = useState(NotesData);
 const { customerId} = useContext(BasicDetailContext);
 const [isEditMode, setIsEditMode] = useState(false); 
 const [notesFormData, setNotesFormData] = useState([]);
const [addCustomerNotes,{isLoading: isAddNotesLoading, isSuccess: isAddNotesSuccess, data: isAddNotesData, }, ] = useAddCustomerNotesMutation();
const [updateCustomerNotes, { isLoading: isUpdateNotesLoading, isSuccess: isUpdateNotesSuccess, data: isUpdateNotesData }] = useUpdateCustomerNotesMutation();
const [
  getCustomerNoteByCustomerId,
  {
    isFetching: isGetNotesFetching,
    isSuccess: isGetNotesSuccess,
    data: isGetNotesData,
  },
] = useLazyGetCustomerNoteByCustomerIdQuery();

  useEffect(() => {
    if (isAddNotesSuccess && isAddNotesData) {
      if (props.onSuccess) {
        props.onSuccess();
      }
      ToastService.success(isAddNotesData.errorMessage);
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
      if (props.onSuccess) {
        props.onSuccess();
      }
      ToastService.success(isUpdateNotesData.errorMessage);
      setShowModal(false);
    }
  }, [isUpdateNotesSuccess, isUpdateNotesData]);

  const handleToggleModal = () => {
    setIsEditMode(false);
    resetForm()
    setShowModal(!showModal);

  }

  const resetForm = () => {
    let form = { ...NotesData};
    setFormData(form);
  };
  const handleNotes = () => {
 let notesData = notesFormRef.current.getFormData();
    let request = {
      customerId: customerId,
      note: notesData.type,
    };
    if (notesData && !notesData.customerNoteId) {
      addCustomerNotes(request);

    }else if(notesData && notesData.customerNoteId){
      const updateRequest = {
        ...request,
        customerNoteId: notesData.customerNoteId,
      };
        updateCustomerNotes(updateRequest)
        ongetNote();
   
    }
  };
  const ongetNote = () => {
    getCustomerNoteByCustomerId(customerId);
  };
  const handleNoteData = (data) => {
    resetForm();
    setIsEditMode(true);
    const newformData = { ...formData };
    newformData.initialState = { ...newformData, type: data.note ,customerNoteId: data.customerNoteId };
    setFormData(newformData);
  };

  return (
    <>
      <CardSection
        cardTitle="Notes"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <NotesCard
          isAddEditModal={handleToggleModal}
          onHandleNote={handleNoteData}
          ongetcustomerNote={ongetNote}
          notesFormData={notesFormData}
        />
      </CardSection>


        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          modalTitle="Add/Edit Notes"
          modelSizeClass="w-50s"
        >
          <div className="row horizontal-form">
            <FormCreator config={formData} ref={notesFormRef} {...formData} />
            <div className="col-md-12 mt-2">
              <div className="d-flex align-item-end justify-content-end">
                <div className="d-flex align-item-end">
                  <Buttons
                    buttonTypeClassName="theme-button"
                    buttonText={isEditMode ? "Update" : "Add"}
                    onClick={handleNotes}
                    isLoading={isAddNotesLoading ||isUpdateNotesLoading}
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
