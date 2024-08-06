import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { ContactType } from "../../../../../utils/Enums/commonEnums";

export const contactInformationData = {
  initialState: {
    contactId:"",
    isEndUser: true,
    isPurchasingGiven: true,
    endUser: "",
    refNumber: "",
    isInvoiceSubmission: true,
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
      id: "contactId",
      lable: "End User ",
      Field_Name: "End Name",
      fieldType: FormFieldTypes.SELECT,
      dataField: "contactId",
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
        ContactTypeId : ContactType.EndUser
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
      dataField: "isInvoiceSubmission",
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
      id: "contactId",
      lable: "Invoice Submission ",
      Field_Name: "Invoice Submission",
      fieldType: FormFieldTypes.SELECT,
      dataField: "contactIdd",
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
        ContactTypeId : ContactType.InvoiceSubmission

      }
    },
    {
      id: "contactId",
      lable: "Purchasing ",
      Field_Name: "Purchasing",
      fieldType: FormFieldTypes.SELECT,
      dataField: "contactIddd",
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
        ContactTypeId : ContactType.Purchasing
      }
    },
  ],
};
