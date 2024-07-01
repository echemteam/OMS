import { FormFieldTypes } from "../../../../../data/formFieldType";

export const SettingFormData = {
  name: "Setting Form",
  initialState: { paymentTermId: "", creditLimit: "", paymentMethodId: "", billingCurrency: "", invoiceSubmissionInstruction: "" },
  formFields: [
    {
      id: "paymentTermId",
      lable: "Default Payment Terms Template :",
      Field_Name: "Default Payment Terms Template",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentTermId",
      fieldSetting: {
        placeholder: "Select Default Payment Terms Template",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "creditLimit",
      lable: "Credit Limit :",
      Field_Name: "Credit Limit",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "creditLimit",
      fieldSetting: {
        placeholder: "Enter Credit Limit",
        allowSpace: true,
        minLength: 0,
        maxLength: 6,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "paymentMethodId",
      lable: "Payment Method :",
      Field_Name: "Payment Method",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentMethodId",
      fieldSetting: {
        placeholder: "Select Payment Method",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },

    },
    {
      id: "billingCurrency",
      lable: "Billing Currency :",
      Field_Name: "Billing Currency",
      fieldType: FormFieldTypes.SELECT,
      dataField: "billingCurrency",
      fieldSetting: {
        placeholder: "Billing Currency",
        allowSpace: true,
        options: [
          { value: "USD", label: "USD" },
          { value: "IND", label: "IND" },
        ],
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "invoiceSubmissionInstruction",
      lable: "Invoice Submission Instruction :",
      Field_Name: "Invoice Submission Instruction",
      fieldType: FormFieldTypes.CKEDITOR,
      dataField: "invoiceSubmissionInstruction",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },

  ],
  formSetting: {
    isViewOnly: false
  }
};
