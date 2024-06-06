import { FormFieldTypes } from "../../../../../data/formFieldType";

export const SettingFormData = {
  name: "Setting Form",
  initialState: { type: "" },
  formFields: [
    {
      id: "defaultPaymentTerms",
      lable: "Default Payment Terms Template :",
      Field_Name: "Default Payment Terms Template",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Input",
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
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Credit Limit",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "paymentMethod",
      lable: "Payment Method :",
      Field_Name: "Payment Method",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Select Payment Method",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
  ],
};
