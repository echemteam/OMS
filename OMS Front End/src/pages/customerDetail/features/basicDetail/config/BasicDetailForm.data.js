import { FormFieldTypes } from "../../../../../data/formFieldType";

export const basicDetailFormDataHalf = {
  initialState: { name: "", groupTypeId: "", countryId: "", territoryId: "", emailAddress: "", website: "", invoiceSubmissionInstruction: "", note: "", isCompany: false, taxId: "", billingCurrency: "" },
  formFields: [
    {
      id: "name",
      lable: "Customer Name :",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Customer Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }, { type: "uniqueName" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "groupTypeId",
      lable: "Group Type :",
      Field_Name: "Group Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "groupTypeId",
      fieldSetting: {
        placeholder: "Select Group Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "territoryId",
      lable: "Territory :",
      Field_Name: "Territory",
      fieldType: FormFieldTypes.SELECT,
      dataField: "territoryId",
      fieldSetting: {
        placeholder: "Select Territory",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "countryId",
      lable: "Country :",
      Field_Name: "Country",
      fieldType: FormFieldTypes.SELECT,
      dataField: "countryId",
      fieldSetting: {
        placeholder: "Select Country",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "billingCurrency",
      lable: "Billing Currency :",
      Field_Name: "Billing Currency",
      fieldType: FormFieldTypes.SELECT,
      dataField: "billingCurrency",
      fieldSetting: {
        placeholder: "Select Billing Currency",
        allowSpace: true,
        options: [
          { label: "INR", value: 1 },
          { label: "USD", value: 2 },
        ],
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },

    {
      id: "emailAddress",
      lable: "Email :",
      Field_Name: "Email",
      fieldType: FormFieldTypes.INPUT,
      dataField: "emailAddress",
      fieldSetting: {
        placeholder: "Enter Email",
        allowSpace: true,
      },
      validation: [{ type: "require" }, { type: "email" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "website",
      lable: "Website :",
      Field_Name: "Website",
      fieldType: FormFieldTypes.INPUT,
      dataField: "website",
      fieldSetting: {
        placeholder: "https://www.xyz.com/",
        allowSpace: true,
      },
      validation: [{ type: "require" }, { type: "website" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "taxId",
      lable: "Text Id :",
      Field_Name: "Text Id",
      fieldType: FormFieldTypes.INPUT,
      dataField: "taxId",
      fieldSetting: {
        placeholder: "Text Id",
        allowSpace: true,
        minLength: 0,
        maxLength: 10,
      },
      validation: [{ type: "require" }, { type: "taxId", minLength: 0, maxLength: 10 }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },


    {
      id: "invoiceSubmissionInstruction",
      lable: "Invoice Submission Instruction :",
      Field_Name: "Invoice Submission Instruction",
      fieldType: FormFieldTypes.TINYEDITOR,
      dataField: "invoiceSubmissionInstruction",
      fieldSetting: {
        placeholder: "Enter Invoice Submission Instruction",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-2",
      },
    },
    {
      id: "note",
      lable: "Notes :",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.TINYEDITOR,
      dataField: "note",
      fieldSetting: {
        placeholder: "Enter Notes",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "isCompany",
      lable: "Is Company",
      Field_Name: "Is Company",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isCompany",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-0 margin-left0-checkbox mt-0",
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
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 margin-left0-checkbox mb-0",
      },
    },
  ],

};
