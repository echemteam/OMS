import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";

export const contactInformationData = {
  initialState: {
    isEndUser: false,
    endUser: "",
    refNumber: "",
    isInvoiceSubmission: false,
    invoiceSubmission: "",
    purchasing: "",
  },
  formFields: [
    {
      id: "isEndUser",
      lable: "Is End User given on Purchase order",
      Field_Name: "Is End User",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isEndUser",
      fieldSetting: {
        placeholder: "",
        isEnableOnChange: true
      },
      style: {
        containerCss:
          "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mt-3",
      },
    },
    {
      id: "endUser",
      lable: "End User ",
      Field_Name: "End Name",
      fieldType: FormFieldTypes.SELECT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter End User",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
      }
    },
    {
      id: "refNumber",
      lable: "Reference Number",
      Field_Name: "Reference Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "refNumber",
      fieldSetting: {
        placeholder: "Enter Reference Number",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
      },
    },
    {
      id: "isInvoiceSubmission",
      lable: "Is Invoice Submission given on Purchase order",
      Field_Name: "Exempt Sales Tax",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "exemptSalesTax",
      fieldSetting: {
        placeholder: "",
        isEnableOnChange: true
      },
      style: {
        containerCss:
          "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mt-3",
      },
    },
    {
      id: "isPurchasingGiven",
      lable: "Is Purchasing given on Purchase order",
      Field_Name: "Is Purchasing Given",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isPurchasingGiven",
      fieldSetting: {
        placeholder: "",
        isEnableOnChange: true
      },
      style: {
        containerCss:
          "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mt-3",
      },
    },
    {
      id: "invoiceSubmission",
      lable: "Invoice Submission ",
      Field_Name: "Invoice Submission",
      fieldType: FormFieldTypes.SELECT,
      dataField: "invoiceSubmission",
      fieldSetting: {
        placeholder: "Enter Invoice Submission",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
      }
    },
    {
      id: "purchasing",
      lable: "Purchasing",
      Field_Name: "Purchasing",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Purchasing",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
      }
    },
  ],
};
