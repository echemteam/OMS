/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../data/appIcons";
import { DocumentFormData } from "./config/DocumentsData";
import Buttons from "../../../../components/ui/button/Buttons";
import FormCreator from "../../../../components/Forms/FormCreator";
import CardSection from "../../../../components/ui/card/CardSection";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllDocumentTypesQuery } from "../../../../app/services/documentAPI";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";

const ManageDocumentList = React.lazy(() => import("./features/ManageDocumentList"));


const DocumentDetails = ({ keyId, isSupplier, addDocuments, downloadDocument, deleteDocumentsById, getDocumentsById, isEditablePage, SecurityKey }) => {

  //** State */
  const childRef = useRef();
  const documentFormRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  /* NOTE:- 
      API Call
      The "addDocuments" function is passed dynamically as a prop.
      This allows the DocumentDetails component to be reused with different API call functions.
  */
  const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = addDocuments();
  const [getAllDocumentTypes, { isSuccess: isGetAllDocumentTypesSucess, data: allGetAllDocumentTypesData }] = useLazyGetAllDocumentTypesQuery();

  //** UseEffect */
  useEffect(() => {
    getAllDocumentTypes();
  }, []);

  useEffect(() => {
    if (isEditablePage && SecurityKey) {
      const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);

      if (hasAddPermission) {
        if (hasAddPermission.hasAccess === true) {
          setButtonVisible(true);
        }
        else {
          setButtonVisible(false);
        }
      }
    }
  }, [isEditablePage, SecurityKey]);

  useEffect(() => {
    if (isGetAllDocumentTypesSucess && allGetAllDocumentTypesData) {
      const keyFilter = isSupplier ? 'isForSuppliers' : 'isForCustomers';
      const getData = allGetAllDocumentTypesData.filter(x => x[keyFilter]).map(item => ({
        value: item.documentTypeId,
        label: item.type
      }))
      const dropdownField = DocumentFormData.formFields.find(item => item.dataField === "documentTypeId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllDocumentTypesSucess, allGetAllDocumentTypesData]);

  useEffect(() => {
    if (isAddSuccess && isAddData) {
      if (isAddData.errorMessage.includes('Document name')) {
        ToastService.warning(isAddData.errorMessage);
        return;
      } else if (isAddData.errorMessage.includes('exists')) {
        ToastService.warning(isAddData.errorMessage);
        return;
      }
      setShowModal(!showModal);
      ToastService.success(isAddData.errorMessage);
      if (childRef.current) {
        childRef.current.callChildFunction();
      }
    }
  }, [isAddSuccess, isAddData]);

  //** Handle Change's */
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
        storagePath: isSupplier ? "SupplierDocuements" : "Customer",
        [isSupplier ? 'supplierId' : 'customerId']: keyId,
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
          rightButton={buttonVisible ? true : false}
          buttonText="Add"
          titleButtonClick={handleToggleModal}>
          <div className="">
            <ManageDocumentList childRef={childRef} isEditablePage={isEditablePage} SecurityKey={SecurityKey} keyId={keyId} isSupplier={isSupplier}
              downloadDocument={downloadDocument} deleteDocumentsById={deleteDocumentsById} getDocumentsById={getDocumentsById} />
          </div>
        </CardSection>
      </div>

      <CenterModel showModal={showModal} handleToggleModal={handleToggleModal}
        modalTitle="Add Document" modelSizeClass="w-50s">
        <div className="row horizontal-form add-documentForm">
          <FormCreator config={DocumentFormData} ref={documentFormRef} {...DocumentFormData} />
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-end justify-content-end">
              <div className="d-flex align-item-end">
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Add"
                  onClick={handleSave}
                  isLoading={isAddLoading} />
                <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                  onClick={handleToggleModal} />
              </div>
            </div>
          </div>
        </div>
      </CenterModel>

    </>
  );
};

export default DocumentDetails;
