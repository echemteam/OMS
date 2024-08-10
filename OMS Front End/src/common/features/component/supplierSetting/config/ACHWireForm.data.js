import { FormFieldTypes } from "../../../../../data/formFieldType";


export const achWireFormData = {
  // name: "Email From",
  initialState: {
    bankName: "",
    beneficiaryName: "",
    accountType: "",
    accountNumber: "",
    messageToRecipientBank: "",
    messageToRecipient: "",
    paymentTermId: 0,
    recipientPhoneNumber: "",
    isAddressInUs: false,
    ibanNumber: 0,
    branchCode: "",
    swiftCode: "",
    routingNumber: "",
    sortCode: "",
    bsbNumber: "",
  },
  formFields: [
    {
      id: "beneficiaryName",
      lable: "Beneficiary Name",
      Field_Name: "Beneficiary Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "beneficiaryName",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Beneficiary Name",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input label-name-small",
      },
    },
    {
      id: "bankName",
      lable: "Bank Name",
      Field_Name: "Bank Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "bankName",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Bank Name",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input label-name-small",
      },
    },
    {
      id: "accountType",
      lable: "Account Type",
      Field_Name: "Account Type",
      fieldType: FormFieldTypes.INPUT,
      dataField: "accountType",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Account Type",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "accountNumber",
      lable: "Account Number",
      Field_Name: "Account Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "accountNumber",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Account Number",
        isEnableOnChange: true,
        // maxLength: 20,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "branchCode",
      lable: "Branch Code",
      Field_Name: "Branch Code",
      fieldType: FormFieldTypes.INPUT,
      dataField: "branchCode",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Branch Code",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "ibanNumber",
      lable: "IBAN Number",
      Field_Name: "IBAN Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "ibanNumber",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter IBAN Number",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "swiftCode",
      lable: "Swift Code",
      Field_Name: "Swift Code",
      fieldType: FormFieldTypes.INPUT,
      dataField: "swiftCode",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Swift Code",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },

    {
      id: "routingNumber",
      lable: "Routing No (US Banks) (9 digits)",
      Field_Name: "Routing No (US Banks) (9 digits)",
      fieldType: FormFieldTypes.INPUT,
      dataField: "routingNumber",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Routing No (US Banks) (9 digits)",
        isEnableOnChange: true,
        maxLength: 9,
        // minLength: 9
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "sortCode",
      lable: "Sort Code (UK Banks) (6 digits)",
      Field_Name: "Sort Code (UK Banks) (6 digits)",
      fieldType: FormFieldTypes.INPUT,
      dataField: "sortCode",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Sort Code (UK Banks) (6 digits)",
        isEnableOnChange: true,
        maxLength: 6,
        // minLength: 6
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "bsbNumber",
      lable: "BSB Number (Aust Banks) (6 digits)",
      Field_Name: "BSB Number (Aust Banks) (6 digits)",
      fieldType: FormFieldTypes.INPUT,
      dataField: "bsbNumber",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter BSB Number (Aust Banks) (6 digits)",
        isEnableOnChange: true,
        maxLength: 6,
        // minLength: 6

      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "recipientPhoneNumber",
      lable: "Recipient Phone Number",
      Field_Name: "Recipient Phone Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "recipientPhoneNumber",
      fieldSetting: {
        placeholder: "Please Enter Recipient Phone Number",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "paymentTermId",
      lable: "Payment Terms",
      Field_Name: "Payment Terms",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentTermId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select Payment Terms",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input label-name-small",
      },
    },
    {
      id: "isAddressInUs",
      lable: "Bank Account located in the United States or US Territory",
      Field_Name: "Bank Account located in the United States or US Territory",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isAddressInUs",
      fieldSetting: {
        placeholder: "",
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3 pt-2",
      }
    },
    {
      id: "messageToRecipient",
      lable: "Message to recipient",
      Field_Name: "Message to recipient",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "messageToRecipient",
      fieldSetting: {
        placeholder: "Please Enter Message to recipient",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "messageToRecipientBank",
      lable: "Message to recipient Bank",
      Field_Name: "Message to recipient Bank",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "messageToRecipientBank",
      fieldSetting: {
        placeholder: "Please Enter Message to recipient Bank",
        isEnableOnChange: true,
        maxLength: 75,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },


  ],
  formSetting: {
    isViewOnly: false,
  },
};