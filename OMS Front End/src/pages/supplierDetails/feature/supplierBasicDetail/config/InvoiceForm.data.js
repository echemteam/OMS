import { FormFieldTypes } from "../../../../../data/formFieldType";

export const InvoiceFormData = {
  initialState: {
    invoiceSubmissionInstruction: "",
  },
  formFields: [

    {
      id: "invoiceSubmissionInstruction",
      lable: "Invoice Submission Instruction ",
      Field_Name: "Invoice Submission Instruction",
      fieldType: FormFieldTypes.CKEDITOR,
      dataField: "invoiceSubmissionInstruction",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
      },
    },

  ],
  formSetting: {
    isViewOnly: false
  }
};
