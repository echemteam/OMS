/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

import { AppIcons } from "../../../../data/appIcons";
import { DocumentFormData } from "./Config/DocuementsData";
import CardSection from "../../../../components/ui/card/CardSection";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import PropTypes from "prop-types";
//** Service's */
import { useLazyGetAllDocumentTypesQuery } from "../../../../app/services/documentAPI";
import AddMultipleDocument from "./feature/MultipleDocument.js/AddMultipleDocument";
//** Component's */
const AddDocument = React.lazy(() => import("./feature/AddDocument"));
const DocumentList = React.lazy(() => import("./feature/DocumentList"));

const DocumentGrid = ({
  keyId,
  isSupplier,
  addDocuments,
  downloadDocument,
  deleteDocumentsById,
  isArchive,
  getDocumentsById,
  isEditablePage,
  SecurityKey,

  customerStatusId,
}) => {
  //** State */
  const childRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [showMulDocModal, setShowMulDocModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  // const [editDocumentData, SetEditDocumentData] = useState(null);

  //** API Call's */
  const [
    getAllDocumentTypes,
    {
      isSuccess: isGetAllDocumentTypesSucess,
      data: allGetAllDocumentTypesData,
    },
  ] = useLazyGetAllDocumentTypesQuery();

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
        } else {
          setButtonVisible(false);
        }
      }
    }
  }, [isEditablePage, SecurityKey]);

  useEffect(() => {
    if (isGetAllDocumentTypesSucess && allGetAllDocumentTypesData) {
      const keyFilter = isSupplier ? "isForSuppliers" : "isForCustomers";
      const getData = allGetAllDocumentTypesData
        .filter((x) => x[keyFilter])
        .map((item) => ({
          value: item.documentTypeId,
          label: item.type,
        }));
      const dropdownField = DocumentFormData.formFields.find(
        (item) => item.dataField === "documentTypeId"
      );
      dropdownField.fieldSetting.options = getData;
      setDocumentTypes(getData);
    }
  }, [isGetAllDocumentTypesSucess, allGetAllDocumentTypesData]);

  //** Handle Change's */
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleMulDocToggleModal = () => {
    setShowMulDocModal(!showMulDocModal);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const onSuccess = () => {
    setShowModal(!showModal);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  return (
    <React.Fragment>
      <div className="document-section">
        <CardSection
         
          cardTitle={isArchive ? null : "Attachments"}
          titleButtonClick={isArchive ? null : handleToggleModal}
          textWithIcon={true}
          iconImg={isArchive ? null : AppIcons.PlusIcon}
          buttonClassName = {isArchive ? null : "theme-button"}
          rightButton={isArchive ? null : buttonVisible ? buttonVisible : false}
          buttonText= {isArchive ? null : "Add Document"}
          multipleButton={isArchive ? null : buttonVisible ? buttonVisible : false}
          rightButtonArray={isArchive ? null : [
            {
              buttonTypeClassName: "theme-button",
              onClick: handleMulDocToggleModal,
              buttonText: "Add Multiple Document",
              textWithIcon: true,
              imagePath: AppIcons.PlusIcon,
            },
          ]}
        >
          <div className="right-side-sec-padding-0">
          <DocumentList
            childRef={childRef}
            isEditablePage={isEditablePage}
            SecurityKey={SecurityKey}
            keyId={keyId}
            isArchive={isArchive}
            isSupplier={isSupplier}
            showModal={showModal}
            downloadDocument={downloadDocument}
            deleteDocumentsById={deleteDocumentsById}
            getDocumentsById={getDocumentsById}
            setShowModal={setShowModal}
            // onHandleEditDocument={handleEditDocument}
          />
          </div>
        </CardSection>
      </div>
      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        modalTitle="Add Document"
        // modalTitle={editDocumentData ? "Update Document" : "Add Document"}
        modelSizeClass="w-50s"
      >
        <AddDocument
          isSupplier={isSupplier}
          keyId={keyId}
          showModal={showModal}
          addDocuments={addDocuments}
          handleToggleModal={handleToggleModal}
          onSuccess={onSuccess}
          isEditablePage={isEditablePage}
          customerStatusId={customerStatusId}
          // editDocumentData={editDocumentData}
        />
      </CenterModel>
      <CenterModel
        showModal={showMulDocModal}
        handleToggleModal={handleMulDocToggleModal}
        modalTitle="Add Multiple Document"
        // modalTitle={editDocumentData ? "Update Document" : "Add Document"}
        modelSizeClass="w-50s"
      >
        <AddMultipleDocument
          addDocuments={addDocuments}
          isSupplier={isSupplier}
          keyId={keyId}
          documentTypes={documentTypes}
          handleMulDocToggleModal={handleMulDocToggleModal}
          isEditablePage={isEditablePage}
          customerStatusId={customerStatusId}
        />
      </CenterModel>
    </React.Fragment>
  );
};

DocumentGrid.propTypes = {
  keyId: PropTypes.number.isRequired,
  isSupplier: PropTypes.bool.isRequired,
  addDocuments: PropTypes.func.isRequired,
  downloadDocument: PropTypes.func.isRequired,
  deleteDocumentsById: PropTypes.func.isRequired,
  getDocumentsById: PropTypes.func.isRequired,
  isEditablePage: PropTypes.bool.isRequired,
  SecurityKey: PropTypes.shape({
    ADD: PropTypes.string,
    DELETE: PropTypes.string,
    DOWNALOD: PropTypes.string,
  }),
};
export default DocumentGrid;
