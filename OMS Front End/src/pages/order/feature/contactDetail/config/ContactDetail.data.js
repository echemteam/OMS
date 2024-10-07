import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { ContactType } from "../../../../../utils/Enums/commonEnums";

export const contactInformationData = {
  initialState: {
    endUserId: null,
    isEndUser: true,
    isPurchasingGiven: true,
    refNumber: "",
    isInvoiceSubmission: true,
    invoiceSubmissionId: null,
    purchasingId: null,
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
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12",
      },
    },
    {
      id: "isInvoiceSubmission",
      lable: "Is Invoice Submission given on Purchase order",
      Field_Name: "Exempt Sales Tax",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isInvoiceSubmission",
      fieldSetting: {
        placeholder: "",
        isEnableOnChange: true
      },
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12",
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
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12",
      },
    },
    {
      id: "endUserId",
      lable: "End User ",
      Field_Name: "End User",
      fieldType: FormFieldTypes.SELECT,
      dataField: "endUserId",
      fieldSetting: {
        placeholder: "Enter End User",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-6 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
        GetByID: ContactType.ENDUSER
      }
    },

    {
      id: "invoiceSubmissionId",
      lable: "Invoice Submission ",
      Field_Name: "Invoice Submission",
      fieldType: FormFieldTypes.SELECT,
      dataField: "invoiceSubmissionId",
      fieldSetting: {
        placeholder: "Enter Invoice Submission",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-6 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
        GetByID: ContactType.INVOICESUBMISSION

      }
    },
    {
      id: "purchasingId",
      lable: "Purchasing ",
      Field_Name: "Purchasing",
      fieldType: FormFieldTypes.SELECT,
      dataField: "purchasingId",
      fieldSetting: {
        placeholder: "Enter Purchasing",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-6 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
        GetByID: ContactType.PURCHASING
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
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-6 mb-input",
      },
    },

  ],
};
