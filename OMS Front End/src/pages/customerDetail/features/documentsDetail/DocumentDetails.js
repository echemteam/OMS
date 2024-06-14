import React, { useContext, useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import AddEditDocuments from "./features/AddEditDocuments";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import Buttons from "../../../../components/ui/button/Buttons";
import FormCreator from "../../../../components/Forms/FormCreator";
import { DocumentFormData } from "./config/DocumentsData";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { useAddCustomerDocumentsMutation, useLazyGetAllDocumentTypesQuery } from "../../../../app/services/documentAPI";
import ToastService from "../../../../services/toastService/ToastService";

const DocumentDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(DocumentFormData);
  const { customerId } = useContext(BasicDetailContext);
  const documentFormRef = useRef();

  const [getAllDocumentTypes, {
    isFetching: isGetAllDocumentTypesFetching,
    isSuccess: isGetAllDocumentTypesSucess,
    data: allGetAllDocumentTypesData
  },] = useLazyGetAllDocumentTypesQuery();

  const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddCustomerDocumentsMutation();

  useEffect(() => {
    getAllDocumentTypes();
  }, [])

  useEffect(() => {
    if (!isGetAllDocumentTypesFetching && isGetAllDocumentTypesSucess && allGetAllDocumentTypesData) {
      const getData = allGetAllDocumentTypesData.map(item => ({
        value: item.documentTypeId,
        label: item.type
      }))
      const dropdownField = DocumentFormData.formFields.find(item => item.dataField === "documentTypeId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllDocumentTypesFetching, isGetAllDocumentTypesSucess, allGetAllDocumentTypesData]);

  useEffect(() => {
    if (isAddSuccess && isAddData) {
      setShowModal(!showModal);
      ToastService.success(isAddData.errorMessage);
    }
  }, [isAddSuccess, isAddData]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSave = () => {
    const data = documentFormRef.current.getFormData();
    if (data) {
      const requestData = {
        ...data,
        base64File: data.attachment.base64Data,
        attachment: data.attachment.fileName,
        storagePath: "document",
        customerId: 15,
        documentTypeId: data.documentTypeId && typeof data.documentTypeId === "object" ? data.documentTypeId.value : data.documentTypeId,
      };
      add(requestData);
    }
  };

  return (
    <>
      <div className="document-section">
        <CardSection
          cardTitle="Attachments"
          buttonClassName="theme-button"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          rightButton={true}
          buttonText="Add"
          titleButtonClick={handleToggleModal}>
          <div className="">
            <AddEditDocuments />
          </div>
        </CardSection>
      </div>
      {showModal && (
        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          modalTitle="Add Document"
          modelSizeClass="w-50s">
          {/* <UploadFiles formData={formData} uploadRef={documentFormRef} handleToggleModal={handleToggleModal} uploadFilesTypeId={UploadFilesType.CUSTOMERDOCUMENT} /> */}
          <div className="row horizontal-form">
            <FormCreator
              config={formData}
              ref={documentFormRef}
              {...formData}
            />
            <div className="col-md-12 mt-2">
              <div className="d-flex align-item-end justify-content-end">
                <div className="d-flex align-item-end">
                  <Buttons
                    buttonTypeClassName="theme-button"
                    buttonText="Add"
                    onClick={handleSave}
                  // isLoading={EmailLoading || updateUserLoading}
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
      )}
    </>
  );
};

export default DocumentDetails;
