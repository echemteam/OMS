/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/FinalForms/FormCreator";
import { DocumentMultipleFormData } from "../../Config/MultipleDocuments.Data";
import "../../Document.scss";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound";
import { AppIcons } from "../../../../../../data/appIcons";
import Select from "react-select";
import { ModulePathName } from "../../../../../../utils/Enums/commonEnums";
import ToastService from "../../../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../../../data/appMessages";
import Input from "../../../../../../components/ui/inputs/input/Input";

const getFileIcon = (extension) => {
  switch (extension) {
    case "pdf":
      return AppIcons.PdfIcon;
    case "doc":
    case "docx":
      return AppIcons.DocIcon;
    case "xls":
    case "xlsx":
      return AppIcons.XlsIcon;
    case "ppt":
    case "pptx":
      return AppIcons.PptIcon;
    case "csv":
      return AppIcons.CsvIcon;
    case "zip":
    case "rar":
      return AppIcons.ZipIcon;
    default:
      return AppIcons.defaultFileIcon;
  }
};

const getFileExtension = (filename) => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
};

const AddMultipleDocument = ({
  isSupplier,
  keyId,
  handleMulDocToggleModal,
  addDocuments,
  documentTypes
}) => {
  const ref = useRef();
  const [attachment, setAttachment] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [editableIndexes, setEditableIndexes] = useState([]);

  /**
   * This hook dynamically sets the API call based on the module (customer or supplier).
   * The API endpoint and parameters are configured within the SupplierDocumentDetail OR CustomerDocumentDetail component.
   */
  const [
    add,
    { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData },
  ] = addDocuments();


  const toggleEdit = (index) => {
    const updatedEditableIndexes = [...editableIndexes];
    if (updatedEditableIndexes.includes(index)) {
      updatedEditableIndexes.splice(updatedEditableIndexes.indexOf(index), 1);
    } else {
      updatedEditableIndexes.push(index);
    }
    setEditableIndexes(updatedEditableIndexes);
  };

  useEffect(() => {
    if (isAddSuccess && isAddData) {
      if (isAddData.errorMessage.includes("exists")) {
        ToastService.warning(isAddData.errorMessage);
        return;
      }
      ToastService.success(isAddData.errorMessage);
      handleMulDocToggleModal();
    }
  }, [isAddSuccess, isAddData]);

  // Transform the document data before submitting
  const buildTransformedDocumentData = (data, isSupplier, keyId) => {
    const transformDocumentTypeData = (data) => {
      if (data && typeof data === 'object') {
        console.log("Original Document Type Data:", data);
        return {
          id: data.value || data.id || 0,
          type: data.text || "",
        };
      }
      return {
        id: data || 0,
        type: "",
      };
    };

    const { id: documentTypeId, type: documentType } = transformDocumentTypeData(data.documentTypeId, data.documentType);

    return {
      ...data,
      [isSupplier ? 'supplierId' : 'customerId']: keyId,
      documentTypeId,
      documentType: data.documentType,
      createdAt: data.createdAt || new Date(),
    };
  };

  const handleSave = async () => {
    const modifyData = uploadedFiles.map((data, index) => {
      const matchingAttachment = attachment.find((att, ind) => ind === index);
      return {
        ...data,
        base64File: matchingAttachment ? matchingAttachment.base64Data : null,
        ...buildTransformedDocumentData(data, isSupplier, keyId),
      };
    });
    const IsAllDetailExist = modifyData.every(
      (data) => data.name && data.base64File && data.documentTypeId !== null
    );
    if (IsAllDetailExist) {
      const requestData = {
        storagePath: isSupplier ? ModulePathName.SUPPLIER : ModulePathName.CUSTOMER,
        [isSupplier ? "supplierId" : "customerId"]: keyId,
        documentInfoList: modifyData,

      };
      add(requestData);
    }
    else {
      ToastService.warning(ErrorMessage.DocumentDetailMissing);
    }
  };

  const handleFileUpload = (value) => {
    const files = value.split(", ");
    const newFiles = files.map((file) => {
      const fileExtension = getFileExtension(file);
      return {
        name: file,
        attachment: file,
        extension: fileExtension,
        documentTypeId: null,
      };
    });
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleTypeChange = (index, selectedOption) => {
    const newType = selectedOption ? selectedOption.value : "";
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, documentTypeId: newType } : file
      )
    );
    setOpenDropdownIndex(index);
  };
  const handleFileRemove = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onFormDataChange = (updatedData) => {
    setAttachment((prevAttachments) => [
      ...prevAttachments,
      ...updatedData?.attachment,
    ]);
  };

  const handleFileNameChange = (index, newName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, name: newName } : file,
      )
    );
  };

  const handleDocumemtTypeChange = (index, documentTypeInput) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((documentType, i) =>
        i === index ? { ...documentType, documentType: documentTypeInput } : documentType,

      )
    );
  };

  const formActionHandler = {
    DDL_FILE: handleFileUpload,
  };

  return (
    <div className="row">
      <FormCreator
        config={DocumentMultipleFormData}
        ref={ref}
        onActionChange={formActionHandler}
        onFormDataChange={onFormDataChange}
      />
      <table className="custom-table mt-4">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.length === 0 ? (
            <tr>
              <td colSpan="3">
                <NoRecordFound />
              </td>
            </tr>
          ) : (
            uploadedFiles.map((file, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={getFileIcon(file.extension)}
                    alt={file.name}
                    className="file-icon"
                  />
                </td>
                <td>
                  {" "}
                  <Input
                    type="text"
                    value={file.name}
                    onChange={(e) =>
                      handleFileNameChange(index, e.target.value)
                    }
                  />
                </td>
                <td>
                  {editableIndexes.includes(index) ? (
                    <div className="d-flex align-items-center">
                      <Input
                        type="text"
                        value={file.documentType}
                        onChange={(e) =>
                          handleDocumemtTypeChange(index, e.target.value)
                        }
                      />
                      <button onClick={() => toggleEdit(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '10px'
                        }}>
                        <img src="/static/media/cancel.0c96fd8d030cbf121ac0.png" style={{
                          width: '20px',
                          height: '20px',

                        }} />
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <Select
                        value={
                          documentTypes.find(option => option.value === file.documentTypeId) || null
                        }
                        onChange={(selectedOption) => {
                          handleTypeChange(index, selectedOption);

                        }}
                        options={documentTypes}
                        className="react-select"
                        classNamePrefix="react-select"
                        menuPortalTarget={document.body}
                        menuPosition="absolute"
                        isOpen={openDropdownIndex === index}
                        onMenuOpen={() => setOpenDropdownIndex(index)}
                        onMenuClose={() => setOpenDropdownIndex(null)}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                      />
                      <button onClick={() => toggleEdit(index)} style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px'
                      }}>
                        <img src="/static/media/pencil.3c8bbd8b96aa6f946db1.png"
                          style={{
                            width: '20px',
                            height: '20px',

                          }} />
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleFileRemove(index)}
                    className="delete-button"
                  >
                    {" "}
                    <Iconify
                      icon="mingcute:delete-2-line"
                      className="delete-icon-model"
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="d-flex align-item-end justify-content-end mt-3">
        <Buttons
          buttonTypeClassName="theme-button"
          isLoading={isAddLoading}
          buttonText="Save"
          onClick={handleSave}
        />
        <Buttons
          buttonTypeClassName="dark-btn ml-5"
          buttonText="Cancel"
          onClick={handleMulDocToggleModal}
        />
      </div>
    </div>
  );
};

AddMultipleDocument.propTypes = {
  isSupplier: PropTypes.bool.isRequired,
  keyId: PropTypes.string.isRequired, // Adjust type if keyId is not a string
  handleMulDocToggleModal: PropTypes.func.isRequired,
  addDocuments: PropTypes.func.isRequired,
  documentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      // Define the shape of each documentType object if known
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AddMultipleDocument;
