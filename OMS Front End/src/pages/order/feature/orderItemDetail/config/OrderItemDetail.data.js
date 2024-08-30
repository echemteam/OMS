import { FormFieldTypes } from "../../../../../data/formFieldType";

export const orderItemDetailData = {
  initialState: {
    productSearch: "",
    attachment: "",
    base64File: "",
    storagePath: ""
  },

  formFields: [
    {
      id: "productSearch",
      lable: "Product Search ",
      Field_Name: "Product Search ",
      fieldType: FormFieldTypes.INPUT,
      dataField: "productSearch",
      fieldSetting: {
        placeholder: "Enter Product Search",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
      },
      validation: [{ type: "require" }, { type: "uniqueName" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input relative",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: "Search",
      },
    },
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
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section",
      },
    },
  ],
};
