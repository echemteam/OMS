import { FormFieldTypes } from "../../../../../data/formFieldType";

export const DocumentMultipleFormData = {
  name: "Document Form",
  initialState: {
    attachment: "",
  },
  formFields: [
    {
      id: "attachment",
      lable: "Attachment ",
      Field_Name: "Attachment",
      fieldType: FormFieldTypes.FILE,
      dataField: "attachment",
      fieldSetting: {
        placeholder: "Upload Attachment",
        allowSpace: true,
        isButtonVisible: false,
        isCustomButtonVisible: true,
        acceptedFiles: ".pdf , .docx ",
        isFileNameCleared: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section",
      },
    },
  ],
};
