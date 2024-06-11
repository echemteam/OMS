import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import AddEditDocuments from "./features/AddEditDocuments";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import Buttons from "../../../../components/ui/button/Buttons";
import FormCreator from "../../../../components/Forms/FormCreator";
import { DocumentFormData } from "./config/DocumentsData";
import { useLazyGetAllDocumentTypesQuery } from "../../../../app/services/documentAPI";

const DocumentDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(DocumentFormData);
  const documentFormRef = useRef();

  const [getAllDocumentTypes, {
    isFetching: isGetAllDocumentTypesFetching,
    isSuccess: isGetAllDocumentTypesSucess,
    data: allGetAllDocumentTypesData
  },] = useLazyGetAllDocumentTypesQuery();

  useEffect(() => {
    getAllDocumentTypes()
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
  }, [isGetAllDocumentTypesFetching, isGetAllDocumentTypesSucess, allGetAllDocumentTypesData])

  const handleToggleModal = () => {
    setShowModal(!showModal);
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
          titleButtonClick={handleToggleModal}
        >
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
          modelSizeClass="w-50s"
        >
          <div className="row horizontal-form">
            <FormCreator
              ref={documentFormRef}
              {...formData}
            // onFormDataUpdate={handleFormDataChange}
            />
            <div className="col-md-12 mt-2">
              <div className="d-flex align-item-end justify-content-end">
                <div className="d-flex align-item-end">
                  <Buttons
                    buttonTypeClassName="theme-button"
                    buttonText="Add"
                  // onClick={onHandleUser}
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
