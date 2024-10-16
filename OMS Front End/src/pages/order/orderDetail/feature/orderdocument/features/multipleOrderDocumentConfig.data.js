import { validationTypes } from "../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const DocumentMultipleFormData = {
  name: "Document Form",
  initialState: {
    attachment: "",
  },
  section: [
    {
      title: "Order Document Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
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
            isFileNameCleared: true,
            isMultiple: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss:
              "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section",
          },
        },
      ]
    }
  ]
};
