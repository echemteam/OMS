import React, { useEffect, useRef, useState } from "react";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import { DocumentMultipleFormData } from "../../Config/MultipleDocuments.Data";
import "../../Document.scss";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound";
import { AppIcons } from "../../../../../../data/appIcons";
import Select from "react-select";
import { ModulePathName } from "../../../../../../utils/Enums/commonEnums";
import ToastService from "../../../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../../../data/appMessages";

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


const AddMultipleDocument = ({ isSupplier, keyId, handleMulDocToggleModal, addDocuments, documentTypes }) => {


  const ref = useRef();
  const [attachment, setAttachment] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  /**
      * This hook dynamically sets the API call based on the module (customer or supplier).
      * The API endpoint and parameters are configured within the SupplierDocumentDetail OR CustomerDocumentDetail component.
  */
  const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = addDocuments();

  useEffect(() => {
    if (isAddSuccess && isAddData) {
      if (isAddData.errorMessage.includes('exists')) {
        ToastService.warning(isAddData.errorMessage);
        return;
      }
      ToastService.success(isAddData.errorMessage);
      handleMulDocToggleModal();
    }
  }, [isAddSuccess, isAddData]);

  const handleSave = () => {
    const modifyData = uploadedFiles.map((data) => {
      const matchingAttachment = attachment.find(att => att.fileName === data.name);
      return {
        ...data,
        base64File: matchingAttachment ? matchingAttachment.base64Data : null
      }
    });
    const IsAllDetailExist = modifyData.every(data => data.name && data.base64File && data.documentTypeId !== null);
    if (IsAllDetailExist) {
      const requestData = {
        storagePath: isSupplier ? ModulePathName.SUPPLIER : ModulePathName.CUSTOMER,
        [isSupplier ? 'supplierId' : 'customerId']: keyId,
        documentInfoList: modifyData
      };
      add(requestData);
    } else {
      ToastService.warning(ErrorMessage.DocumentDetailMissing);
    }
  };

  const handleFileUpload = (value) => {
    const fileExtension = getFileExtension(value);
    const newFile = {
      name: value,
      attachment: value,
      extension: fileExtension,
      documentTypeId: null
    };
    // const existFile = uploadedFiles && uploadedFiles.some(data => data.name === newFile.name && data.extension === newFile.extension);
    // if (!existFile) {
    setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
    // } else {
    //   ToastService.warning(ErrorMessage.FileExists);
    // }
  };
  const handleTypeChange = (index, selectedOption) => {
    const newType = selectedOption ? selectedOption.value : "";
    // if (!existFileType || selectedOption.value === DocumentTypes.OURSUBMITTEDFORMS) {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, documentTypeId: newType } : file
      ));
    // } else {
    //   setUploadedFiles((prevFiles) =>
    //     prevFiles.map((file, i) =>
    //       i === index ? { ...file, documentTypeId: null } : file
    //     ));
    //   ToastService.warning(ErrorMessage.DocumentTypeExists);
    // }
  };
  const handleFileRemove = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const formActionHandler = {
    DDL_FILE: handleFileUpload
  };

  const onFormDataChange = (updatedData) => {
    setAttachment(prevAttachments => [...prevAttachments, updatedData?.attachment]);
  }

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
          {/* {console.log('uploadedFiles', uploadedFiles)} */}
          {uploadedFiles.length === 0 ?
            <tr>
              <td colSpan="3">
                <NoRecordFound />
              </td>
            </tr>
            :
            uploadedFiles.map((file, index) => (
              <tr key={index}>
                <td>
                  <img src={getFileIcon(file.extension)} alt={file.name} className="file-icon" />
                </td>
                <td>{file.name}</td>
                <td>
                  {console.log('file', file)}
                  <Select
                    value={file.documentTypeId ? documentTypes.find((option) => option.value === file.type) : null}
                    onChange={(selectedOption) => handleTypeChange(index, selectedOption)}
                    options={documentTypes}
                    className="react-select"
                    classNamePrefix="react-select" />
                </td>
                <td>
                  <button onClick={() => handleFileRemove(index)} className="delete-button">
                    {" "} <Iconify icon="mingcute:delete-2-line" className="delete-icon-model" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="d-flex align-item-end justify-content-end mt-3">
        <Buttons buttonTypeClassName="theme-button" isLoading={isAddLoading} buttonText="Save" onClick={handleSave} />
        <Buttons
          buttonTypeClassName="dark-btn ml-5"
          buttonText="Cancel"
          onClick={handleMulDocToggleModal}
        />
      </div>
    </div>
  );
};

export default AddMultipleDocument;
