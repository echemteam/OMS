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
import AddMultipleDocument from "./feature/AddMultipleDocument";
//** Component's */
const AddDocument = React.lazy(() => import("./feature/AddDocument"));
const DocumentList = React.lazy(() => import("./feature/DocumentList"));

const DocumentGrid = ({
  keyId,
  isSupplier,
  addDocuments,
  downloadDocument,
  deleteDocumentsById,
  getDocumentsById,
  isEditablePage,
  SecurityKey,
}) => {
  //** State */
  const childRef = useRef();
  const [showModal, setShowModal] = useState(false);
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
    }
  }, [isGetAllDocumentTypesSucess, allGetAllDocumentTypesData]);

  //** Handle Change's */
  const handleToggleModal = () => {
    setShowModal(!showModal);
    // SetEditDocumentData(null)
  };
  const handleMulDocToggleModal = () => {
    setShowMulDocModal(!showMulDocModal);
    // SetEditDocumentData(null)
  };

  // const handleEditDocument = (data) => {
  //     setShowModal(true);
  //     SetEditDocumentData(data);
  // };

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
          cardTitle="Attachments"
          titleButtonClick={handleToggleModal}
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          buttonClassName="theme-button"
          rightButton={true}
          buttonText="Add Document"
          multipleButton={true}
          rightButtonArray={[
            {
              buttonTypeClassName: "theme-button",
              onClick: handleMulDocToggleModal,
              buttonText: "Add Multiple Document",
              textWithIcon: true,
              imagePath: AppIcons.PlusIcon,
            },
          ]}
        >
          <DocumentList
            childRef={childRef}
            isEditablePage={isEditablePage}
            SecurityKey={SecurityKey}
            keyId={keyId}
            isSupplier={isSupplier}
            showModal={showModal}
            downloadDocument={downloadDocument}
            deleteDocumentsById={deleteDocumentsById}
            getDocumentsById={getDocumentsById}
            setShowModal={setShowModal}
            // onHandleEditDocument={handleEditDocument}
          />
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
          addDocuments={addDocuments}
          handleToggleModal={handleToggleModal}
          onSuccess={onSuccess}
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
          handleMulDocToggleModal={handleMulDocToggleModal}
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
