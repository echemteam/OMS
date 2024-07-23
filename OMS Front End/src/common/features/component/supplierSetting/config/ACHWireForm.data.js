import { FormFieldTypes } from "../../../../../data/formFieldType";

export const aCHWireBankFormData = {
  // name: "Email From",
  initialState: {
    addressLine1: "",
    addressLine2: "",
    stateId: "",
    zipCode: "",
    cityId: "",
  },
  formFields: [
    {
      id: "addressLine1Id",
      lable: "Address Line 1",
      Field_Name: "Address Line 1",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine1Id",
      fieldSetting: {
        placeholder: "Please Enter Address Line 1",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3",
      },
    },
    {
      id: "addressLine2Id",
      lable: "Address Line 2",
      Field_Name: "Address Line 2",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine2Id",
      fieldSetting: {
        placeholder: "Please Enter Address Line 2",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3",
      },
    },
    {
      id: "countryId",
      lable: "Country ",
      Field_Name: "Country",
      fieldType: FormFieldTypes.SELECT,
      dataField: "countryId",
      fieldSetting: {
        placeholder: "Select Country",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },
    {
      id: "stateId",
      lable: "State ",
      Field_Name: "State",
      fieldType: FormFieldTypes.SELECT,
      dataField: "stateId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select State",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },
    {
      id: "cityId",
      lable: "City ",
      Field_Name: "City",
      fieldType: FormFieldTypes.SELECT,
      dataField: "cityId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select City",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },
    {
      id: "zipCode",
      lable: "Zip Code ",
      Field_Name: "Zip Code",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "zipCode",
      fieldSetting: {
        placeholder: "Enter Zip Code",
        allowSpace: true,
        maxLength: 9,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },

  ],
  formSetting: {
    isViewOnly: false,
  },
};
export const aCHWireRegisterBankFormData = {
  // name: "Email From",
  initialState: {
    addressLine1: "",
    addressLine2: "",
    stateId: "",
    zipCode: "",
    cityId: "",
  },
  formFields: [
    {
      id: "addressLine1Id",
      lable: "Address Line 1",
      Field_Name: "Address Line 1",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine1Id",
      fieldSetting: {
        placeholder: "Please Enter Address Line 1",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3",
      },
    },
    {
      id: "addressLine2Id",
      lable: "Address Line 2",
      Field_Name: "Address Line 2",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine2Id",
      fieldSetting: {
        placeholder: "Please Enter Address Line 2",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3",
      },
    },
    {
      id: "countryId",
      lable: "Country ",
      Field_Name: "Country",
      fieldType: FormFieldTypes.SELECT,
      dataField: "countryId",
      fieldSetting: {
        placeholder: "Select Country",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },
    {
      id: "stateId",
      lable: "State ",
      Field_Name: "State",
      fieldType: FormFieldTypes.SELECT,
      dataField: "stateId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select State",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },
    {
      id: "cityId",
      lable: "City ",
      Field_Name: "City",
      fieldType: FormFieldTypes.SELECT,
      dataField: "cityId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select City",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },
    {
      id: "zipCode",
      lable: "Zip Code ",
      Field_Name: "Zip Code",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "zipCode",
      fieldSetting: {
        placeholder: "Enter Zip Code",
        allowSpace: true,
        maxLength: 9,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },

  ],
  formSetting: {
    isViewOnly: false,
  },
};

export const aCHWireFormData = {
  // name: "Email From",
  initialState: {
    messageToRecipient: "",
    addressLine2: "",
    stateId: "",
    zipCode: "",
    cityId: "",
  },
  formFields: [
    {
      id: "beneficiaryNameId",
      lable: "Beneficiary Name",
      Field_Name: "Beneficiary Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "beneficiaryNameId",
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
      id: "bankNameId",
      lable: "Bank Name",
      Field_Name: "Bank Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "bankNameId",
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
      id: "accountTypeId",
      lable: "Account Type",
      Field_Name: "Account Type",
      fieldType: FormFieldTypes.INPUT,
      dataField: "accountTypeId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Account Type",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "accountNumberId",
      lable: "Account Number",
      Field_Name: "Account Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "accountNumberId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Account Number",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "branchCodeId",
      lable: "Branch Code",
      Field_Name: "Branch Code",
      fieldType: FormFieldTypes.INPUT,
      dataField: "branchCodeId",
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
      id: "iBANNumberId",
      lable: "IBAN Number",
      Field_Name: "IBAN Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "iBANNumberId",
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
      id: "swiftCodeId",
      lable: "Swift Code",
      Field_Name: "Swift Code",
      fieldType: FormFieldTypes.INPUT,
      dataField: "swiftCodeId",
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
      id: "routingNoId",
      lable: "Routing No (US Banks) (9 digits)",
      Field_Name: "Routing No (US Banks) (9 digits)",
      fieldType: FormFieldTypes.INPUT,
      dataField: "routingNoId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Routing No (US Banks) (9 digits)",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "sortCodeId",
      lable: "Sort Code (UK Banks) (6 digits)",
      Field_Name: "Sort Code (UK Banks) (6 digits)",
      fieldType: FormFieldTypes.INPUT,
      dataField: "sortCodeId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter Sort Code (UK Banks) (6 digits)",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "bSBNumberId",
      lable: "BSB Number (Aust Banks) (6 digits)",
      Field_Name: "BSB Number (Aust Banks) (6 digits)",
      fieldType: FormFieldTypes.INPUT,
      dataField: "bSBNumberId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter BSB Number (Aust Banks) (6 digits)",
        isEnableOnChange: true
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    


    
    {
      id: "recipientPhoneNumberId",
      lable: "Recipient Phone Number",
      Field_Name: "Recipient Phone Number",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "recipientPhoneNumberId",
      fieldSetting: {
        placeholder: "Please Enter Recipient Phone Number",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "paymentTermsId",
      lable: "Payment Terms",
      Field_Name: "Payment Terms",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentTermsId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select Payment Terms",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input label-name-small",
      },
    },
    {
      id: "uSTerritory",
      lable: "Bank Account located in the United States or US Territory",
      Field_Name: "Bank Account located in the United States or US Territory",
      fieldType: FormFieldTypes.RADIOBUTTON,
      dataField: "uSTerritory",
      fieldSetting: {
        placeholder: "Please Choose Bank Account located in the United States or US Territory",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
        options: [
          {
            label: "Bank Account located in the United States or US Territory",
            value: "Bank Account located in the United States or US Territory",
            isDisable: false,
            optionClass: "",
          },
          // Add more options if needed
        ],
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3 pt-2",
      },
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
      id: "messageToRecipientBankId",
      lable: "Message to recipient Bank",
      Field_Name: "Message to recipient Bank",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "messageToRecipientBankId",
      fieldSetting: {
        placeholder: "Please Enter Message to recipient Bank",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
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