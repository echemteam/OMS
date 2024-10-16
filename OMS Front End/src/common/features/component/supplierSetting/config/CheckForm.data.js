import { FormFieldTypes } from "../../../../../data/formFieldType";

export const checkFormData = {
  initialState: {
    addressLine1Id: "",
    addressLine2Id: "",
    stateId: "",
    zipCode: "",
    cityId: "",
    countryId: ""
  },
  section: [
    {
      title: "Check Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "addressLine1Id",
          label: "Address Line 1",
          Field_Name: "Address Line 1",
          fieldType: FormFieldTypes.INPUT,
          dataField: "addressLine1Id",
          fieldSetting: {
            placeholder: "Please Enter Address Line 1",
            isEnableOnChange: true,
            isMultiSelect: false,
            isDisabled: false,
            maxLength: 50,
          },
          validation: [{ type: "require" }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3",
          },
        },
        {
          id: "addressLine2Id",
          label: "Address Line 2",
          Field_Name: "Address Line 2",
          fieldType: FormFieldTypes.INPUT,
          dataField: "addressLine2Id",
          fieldSetting: {
            placeholder: "Please Enter Address Line 2",
            isEnableOnChange: true,
            isMultiSelect: false,
            isDisabled: false,
            maxLength: 50,
          },
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-3",
          },
        },
        {
          id: "countryId",
          label: "Country ",
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
          label: "State ",
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
          label: "City ",
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
          label: "Zip Code ",
          Field_Name: "Zip Code",
          fieldType: FormFieldTypes.INPUT,
          dataField: "zipCode",
          fieldSetting: {
            placeholder: "Enter Zip Code",
            allowSpace: true,
            maxLength: 10,
          },
          validation: [{ type: "validZipCode" }],
          style: {
            containerCss: "col-xxl-3 col-xl-3 col-md-3 col-12 mb-input label-name-small",
          },
        }
      ]
    }
  ],
  formSetting: {
    isViewOnly: false,
  },
};