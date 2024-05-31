import { FormFieldTypes } from "../../../../../data/formFieldType";

export const basicDetailFormData = {
  name: "Email From",
  initialState: { companyName: "" },
  formFields: [
    {
      id: "customerName",
      lable: "Customer Name :",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Customer Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "groupType",
      lable: "Group Type :",
      Field_Name: "Group Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "GroupType",
      fieldSetting: {
        placeholder: "Select Group Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "territory",
      lable: "Territory :",
      Field_Name: "Territory",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Territory",
      fieldSetting: {
        placeholder: "Select Territory",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "country",
      lable: "Country :",
      Field_Name: "Country",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Country",
      fieldSetting: {
        placeholder: "Select Country",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "email",
      lable: "Email :",
      Field_Name: "Email",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Email",
      fieldSetting: {
        placeholder: "Enter Email",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "website",
      lable: "Website :",
      Field_Name: "Website",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Customer Website",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "textId",
      lable: "Text Id :",
      Field_Name: "Text Id",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Text Id",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "billingCurrency",
      lable: "Billing Currency :",
      Field_Name: "Billing Currency",
      fieldType: FormFieldTypes.SELECT,
      dataField: "BillingCurrency",
      fieldSetting: {
        placeholder: "Select Billing Currency",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "isCompany",
      lable: "Is Company",
      Field_Name: "Is Company",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "Is Company",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 margin-left0-checkbox",
      },
    },
    {
      id: "isBuyingforThird",
      lable: "Is Buying for Third Party",
      Field_Name: "Is Buying for Third Party",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "Is Buying for Third Party",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3 margin-left0-checkbox",
      },
    },
    
    {
      id: "invoiceSubInstruction",
      lable: "Invoice Submission Instruction :",
      Field_Name: "Invoice Submission Instruction",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "Invoice Submission Instruction",
      fieldSetting: {
        placeholder: "Enter Invoice Submission Instruction",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-3",
      },
    },
    {
      id: "notes",
      lable: "Notes :",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "Notes",
      fieldSetting: {
        placeholder: "Enter Notes",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-3",
      },
    },
    
  ],

};
  export const basicDetailFormDataHalf = {
    name: "Email From",
    initialState: { companyName: "" },
  formFields: [
    {
      id: "customerName",
      lable: "Customer Name :",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Customer Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    {
      id: "groupType",
      lable: "Group Type :",
      Field_Name: "Group Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "GroupType",
      fieldSetting: {
        placeholder: "Select Group Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    {
      id: "territory",
      lable: "Territory :",
      Field_Name: "Territory",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Territory",
      fieldSetting: {
        placeholder: "Select Territory",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    {
      id: "country",
      lable: "Country :",
      Field_Name: "Country",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Country",
      fieldSetting: {
        placeholder: "Select Country",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    {
      id: "billingCurrency",
      lable: "Billing Currency :",
      Field_Name: "Billing Currency",
      fieldType: FormFieldTypes.SELECT,
      dataField: "BillingCurrency",
      fieldSetting: {
        placeholder: "Select Billing Currency",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    
    {
      id: "email",
      lable: "Email :",
      Field_Name: "Email",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Email",
      fieldSetting: {
        placeholder: "Enter Email",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    {
      id: "website",
      lable: "Website :",
      Field_Name: "Website",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Customer Website",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    {
      id: "textId",
      lable: "Text Id :",
      Field_Name: "Text Id",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Text Id",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-3",
      },
    },
    
    
    {
      id: "invoiceSubInstruction",
      lable: "Invoice Submission Instruction :",
      Field_Name: "Invoice Submission Instruction",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "Invoice Submission Instruction",
      fieldSetting: {
        placeholder: "Enter Invoice Submission Instruction",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 col-12 mb-3",
      },
    },
    {
      id: "notes",
      lable: "Notes :",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "Notes",
      fieldSetting: {
        placeholder: "Enter Notes",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-3",
      },
    },
    {
      id: "isCompany",
      lable: "Is Company",
      Field_Name: "Is Company",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "Is Company",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2 margin-left0-checkbox",
      },
    },
    {
      id: "isBuyingforThird",
      lable: "Is Buying for Third Party",
      Field_Name: "Is Buying for Third Party",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "Is Buying for Third Party",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 margin-left0-checkbox",
      },
    },
  ],

};
