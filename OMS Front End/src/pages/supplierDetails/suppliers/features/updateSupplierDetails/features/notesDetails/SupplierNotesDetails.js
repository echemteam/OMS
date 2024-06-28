import { useContext, useEffect, useRef, useState } from "react";
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import { useAddSupplierNotesMutation, useLazyGetSupplierNotesBySupplierIdQuery, useUpdateSupplierNotesMutation } from "../../../../../../../app/services/supplierNotesAPI";
import ToastService from "../../../../../../../services/toastService/ToastService";
import SupplierNotesCard from "./features/SupplierNotesCard";
import { AppIcons } from "../../../../../../../data/appIcons";
import Buttons from "../../../../../../../components/ui/button/Buttons";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import NotesFormData from "./features/config/Notes.data";
import CenterModel from "../../../../../../../components/ui/centerModel/CenterModel";
import AddSupplierContext from "../../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { securityKey } from "../../../../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../../../../utils/AuthorizeNavigation/authorizeNavigation";


const SupplierNotesDetail = (props) => {
  const notesFormRef = useRef();
  const { formSetting } = NotesFormData;
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [formData, setFormData] = useState(NotesFormData);
  const [showModal, setShowModal] = useState(false);
  const { supplierId } = useContext(AddSupplierContext)
  const [buttonVisible, setButtonVisible] = useState(true);
  const [notesFormData, setNotesFormData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditModeData, setIsEditModeData] = useState();
  const [addSupplierNotes, { isLoading: isAddSupplierNotesLoading, isSuccess: isAddSupplierNotesSuccess, data: isAddSupplierNotesData, },] = useAddSupplierNotesMutation();
  const [getSupplierNotesBySupplierId, { isFetching: isGetSupplierNotesFetching, isSuccess: isGetSupplierNotesSuccess, data: isGetSupplierNotesData, },] = useLazyGetSupplierNotesBySupplierIdQuery();
  const [updateSupplierNotes, { isLoading: isUpdateSupplierNotesLoading, isSuccess: isUpdateSupplierNotesSuccess, data: isUpdateSupplierNotesData, },] = useUpdateSupplierNotesMutation();

  useEffect(() => {
    const hasAddPermission = hasFunctionalPermission(
      securityKey.ADDSUPPLIERNOTE
    );
    const hasEditPermission = hasFunctionalPermission(
      securityKey.EDITSUPPLIERNOTE
    );
    if (hasEditPermission && formSetting) {
      if (isEditModeData) {
        if (hasEditPermission.isViewOnly === true) {
          formSetting.isViewOnly = true;
          setIsButtonDisable(true);
        } else {
          formSetting.isViewOnly = false;
          setIsButtonDisable(false);
        }
      } else if (!isEditModeData) {
        if (hasAddPermission.hasAccess === true) {
          formSetting.isViewOnly = false;
          setIsButtonDisable(false);
          setButtonVisible(true);
        } else {
          formSetting.isViewOnly = true;
          setButtonVisible(false);
        }
      }
    }
  }, [showModal, isEditMode]);
  
  const handleToggleModal = () => {
    setIsEditMode(false);
    resetForm()
    setShowModal(!showModal);
    setIsEditModeData("");
  }

  const ongetNote = () => {
    getSupplierNotesBySupplierId(supplierId);
  };

  useEffect(() => {
    if (isUpdateSupplierNotesSuccess && isUpdateSupplierNotesData) {
      if (props.onSuccess) {
        props.onSuccess();
      }
      ToastService.success(isUpdateSupplierNotesData.errorMessage);
      ongetNote();
      setShowModal(false);
    }
  }, [isUpdateSupplierNotesSuccess, isUpdateSupplierNotesData]);

  useEffect(() => {
    if (isAddSupplierNotesSuccess && isAddSupplierNotesData) {
      if (props.onSuccess) {
        props.onSuccess();
      }
      ToastService.success(isAddSupplierNotesData.errorMessage);
      ongetNote();
      setShowModal(!showModal);
    }
  }, [isAddSupplierNotesSuccess, isAddSupplierNotesData]);

  useEffect(() => {
    if (!isGetSupplierNotesFetching && isGetSupplierNotesSuccess && isGetSupplierNotesData) {
      if (Array.isArray(isGetSupplierNotesData)) {
        setNotesFormData(isGetSupplierNotesData);
      }
    }
  }, [isGetSupplierNotesFetching, isGetSupplierNotesSuccess, isGetSupplierNotesData]);

  const resetForm = () => {
    let form = { ...NotesFormData };
    setFormData(form);
  };
  const handleEditNoteData = (data) => {

    setIsEditMode(true);
    setIsEditModeData(data)
    const newformData = { ...formData };
    newformData.initialState = {
      ...newformData,
      note: data.note,
      supplierNoteId: data.supplierNoteId,
    };
    setFormData(newformData);
  };
  const handleSupplierNotes = () => {
    let supplierNotesData = notesFormRef.current.getFormData();
   
    if (supplierNotesData && !supplierNotesData.supplierNoteId) {
      let request = {
        supplierId: supplierId,
        note: supplierNotesData.note,
      };
      addSupplierNotes(request);

    } else if (supplierNotesData && supplierNotesData.supplierNoteId) {
      const updateRequest = {
        supplierId: supplierId,
        note: supplierNotesData.note,
        supplierNoteId: supplierNotesData.supplierNoteId,
      };
      updateSupplierNotes(updateRequest)
    }
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
          <SupplierNotesCard
            isAddEditModal={handleToggleModal}
            onHandleNote={handleEditNoteData}
            ongetSupplierNote={ongetNote}
            notesFormData={notesFormData}
          />
        </div>
      </CardSection>

      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        modalTitle="Add/Edit  Notes"
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
                  onClick={handleSupplierNotes}
                  isLoading={isAddSupplierNotesLoading || isUpdateSupplierNotesLoading}
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
}
export default SupplierNotesDetail;
