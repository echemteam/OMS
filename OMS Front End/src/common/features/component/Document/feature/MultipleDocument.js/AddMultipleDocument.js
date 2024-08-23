import React, { useRef, useState } from "react";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import { DocumentMultipleFormData } from "../../Config/MultipleDocuments.Data";
import "../../Document.scss";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound";
import { AppIcons } from "../../../../../../data/appIcons";
import Select from "react-select";

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

const documentTypes = [
  { value: 1, label: "Tax or Registration document" },
  { value: 2, label: "Customer details form" },
  { value: 3, label: "Our submitted forms" },
];

const AddMultipleDocument = ({ handleMulDocToggleModal }) => {
  // const [formData, setFormData] = useState(DocumentMultipleFormData);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const ref = useRef();

  const handleFileUpload = (value, data) => {
    const fileExtension = getFileExtension(value);
    const newFile = {
      name: value,
      type: data,
      extension: fileExtension,
    };
    setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
  };

  const handleTypeChange = (index, selectedOption) => {
    const newType = selectedOption ? selectedOption.value : "";
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, type: newType } : file
      )
    );
  };

  const handleFileRemove = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
                  <img
                    src={getFileIcon(file.extension)}
                    alt={file.name}
                    className="file-icon"
                  />
                </td>
                <td>{file.name}</td>
                <td>
                  <Select
                    value={documentTypes.find(
                      (option) => option.value === file.type
                    )}
                    onChange={(selectedOption) =>
                      handleTypeChange(index, selectedOption)
                    }
                    options={documentTypes}
                    className="react-select"
                    classNamePrefix="react-select"
                  />
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
          }
        </tbody>
      </table>
      <div className="d-flex align-item-end justify-content-end mt-3">
        <Buttons buttonTypeClassName="theme-button" buttonText="Save" />
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
