import { FormFieldTypes } from "../../../../../data/formFieldType";

export const checkFormData = {
  // name: "Email From",
  initialState: {
    addressLine1Id: "",
    addressLine2Id: "",
    stateId: "",
    zipCode: "",
    cityId: "",
    countryId: ""
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
      fieldType: FormFieldTypes.INPUT,
      dataField: "zipCode",
      fieldSetting: {
        placeholder: "Enter Zip Code",
        allowSpace: true,
        maxLength: 10,
      },
      validation: [{ type: "require" }, { type: "validZipCode" }],
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
      },
    },

  ],
  formSetting: {
    isViewOnly: false,
  },
};