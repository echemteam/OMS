import { FormFieldTypes } from "../../../../../data/formFieldType";

export const SettingFormData = {
  name: "Setting Form",
  initialState: {
    paymentTermId: "", creditLimit: 10000, paymentMethodId: "", billingCurrency: "USD",
    invoiceSubmissionInstruction: "", bankFee: '', salesTax: '', cardProcessingCharges: '', exemptSalesTax: true
  },
  formFields: [
    {
      id: "paymentTermId",
      lable: "Default Payment Terms Template ",
      Field_Name: "Default Payment Terms Template",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentTermId",
      fieldSetting: {
        placeholder: "Select Default Payment Terms Template",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
      },
    },
    {
      id: "creditLimit",
      lable: "Credit Limit ",
      Field_Name: "Credit Limit",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "creditLimit",
      fieldSetting: {
        placeholder: "Enter Credit Limit",
        allowSpace: true,
        minLength: 0,
        maxLength: 6,
        masking: {
          isMasking: true,
          maskingType: 'currency',
          countryCode: 'USD'
        }
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
      },
    },
    {
      id: "paymentMethodId",
      lable: "Payment Method ",
      Field_Name: "Payment Method",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentMethodId",
      fieldSetting: {
        placeholder: "Select Payment Method",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
      },

    },
    {
      id: "billingCurrency",
      lable: "Billing Currency ",
      Field_Name: "Billing Currency",
      fieldType: FormFieldTypes.SELECT,
      dataField: "billingCurrency",
      fieldSetting: {
        placeholder: "Billing Currency",
        isEnableOnChange: true,
        options: [
          { value: "USD", label: "USD" },
          { value: "IND", label: "IND" },
        ],
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
      },
    },
    {
      id: "exemptSalesTax",
      lable: "Exempt Sales Tax",
      Field_Name: "Exempt Sales Tax",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "exemptSalesTax",
      fieldSetting: {
        placeholder: "",
        isEnableOnChange: true
      },
      style: {
        containerCss:
          "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input mt-3",
      },
    },
    {
      id: "salesTax",
      lable: "Sales TAX (%)",
      Field_Name: "Sales TAX",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "salesTax",
      fieldSetting: {
        placeholder: "Enter Sales TAX"
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
      },
    },
    {
      id: "bankWireFee",
      lable: "Bank Wire Fee ($)",
      Field_Name: "Bank Wire Fee",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "bankWireFee",
      fieldSetting: {
        placeholder: "Enter Bank Wire Fee",
        maxLength:4,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
      },
    },
    {
      id: "cardProcessingCharges",
      lable: "Card Processing Charges (%)",
      Field_Name: "Card Processing Charges",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "cardProcessingCharges",
      fieldSetting: {
        placeholder: "Enter Card Processing Charges"
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
      },
    },
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
