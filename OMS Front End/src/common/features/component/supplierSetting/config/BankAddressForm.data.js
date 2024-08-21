import { FormFieldTypes } from "../../../../../data/formFieldType";

export const bankAddressFormData = {
  // name: "Email From",
  initialState: {
    addressLine1Id: "",
    addressLine2Id: "",
    stateId: "",
    zipCode: "",
    cityId: "",
    countryId: "",
    bankName: "",
    accountType: "Checking",
    accountNumber: "",
    isAddressInUs: false,
    ibanNumber: "",
    branchCode: "",
    swiftCode: "",
    routingNumber: "",
    sortCode: "",
    bsbNumber: "",
  },
  formFields: [
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
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input label-name-small",
      },
    },
    {
      id: "addressLine1Id",
      lable: "Bank Address Line 1",
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
      lable: "Bank Address Line 2",
      Field_Name: "Address Line 2",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine2Id",
      fieldSetting: {
        placeholder: "Please Enter Address Line 2",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      // validation: [{ type: "require" }],
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
    {
      id: "accountType",
      lable: "Account Type",
      Field_Name: "Account Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "accountType",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select Account Type",
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
      id: "ibanNumber",
      lable: "IBAN Number",
      Field_Name: "IBAN Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "ibanNumber",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Please Enter IBAN Number",
        isEnableOnChange: true,
        maxLength: 50,
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
      //validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
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
  ],
  formSetting: {
    isViewOnly: false,
  },
};