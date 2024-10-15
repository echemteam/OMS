import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initialState = {
  addressTypeId: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  addressLine4: "",
  addressLine5: "",
  countryId: 233,
  stateId: "",
  zipCode: "",
  cityId: "",
  supplierId: 0,
  isPreferredBilling: false,
  isShippingAndBilling: false,
  isPreferredShipping: false,
  stateName: "",
  cityName: ""
}

export const addressFormData = {
  initialState: initialState,
  section: [
    {
      title: "Address Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "addressTypeId",
          label: "Address Type ",
          Field_Name: "Address Type",
          fieldType: FormFieldTypes.SELECT,
          dataField: "addressTypeId",
          fieldSetting: {
            placeholder: "Select Address Type",
            isEnableOnChange: true,
            isMultiSelect: false,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
          },
        },

        {
          id: "addressLine1",
          label: "Address Line 1 ",
          Field_Name: "Address Line 1",
          fieldType: FormFieldTypes.INPUT,
          dataField: "addressLine1",
          fieldSetting: {
            placeholder: "Enter Address Line 1",
            allowSpace: true,
            maxLength: 35,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
          },
        },
        {
          id: "addressLine2",
          label: "Address Line 2",
          Field_Name: "Address Line 2",
          fieldType: FormFieldTypes.INPUT,
          dataField: "addressLine2",
          fieldSetting: {
            placeholder: "Enter Address Line 2",
            allowSpace: true,
            maxLength: 35,
          },
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
          },
        },
        {
          id: "addressLine3",
          label: "Address Line 3 ",
          Field_Name: "Address Line 3",
          fieldType: FormFieldTypes.INPUT,
          dataField: "addressLine3",
          fieldSetting: {
            placeholder: "Enter Address Line 3",
            allowSpace: true,
            maxLength: 35,
          },
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
          },
        },
        {
          id: "addressLine4",
          label: "Address Line 4 ",
          Field_Name: "Address Line 4",
          fieldType: FormFieldTypes.INPUT,
          dataField: "addressLine4",
          fieldSetting: {
            placeholder: "Enter Address Line 4",
            allowSpace: true,
            maxLength: 35,
          },
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
          },
        },
        {
          id: "addressLine5",
          label: "Address Line 5 ",
          Field_Name: "Address Line 5",
          fieldType: FormFieldTypes.INPUT,
          dataField: "addressLine5",
          fieldSetting: {
            placeholder: "Enter Address Line 5",
            allowSpace: true,
            maxLength: 35,
          },
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
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
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-input label-name-small",
          },
        },
        {
          id: "stateId",
          label: "State ",
          Field_Name: "State",
          fieldType: FormFieldTypes.SELECT,
          dataField: "stateId",
          fieldSetting: {
            isDisable: false,
            placeholder: "Select State",
            isEnableOnChange: true,
            isText: false
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-input label-name-small",
          },
        },
        {
          id: "cityId",
          label: "City ",
          Field_Name: "City",
          fieldType: FormFieldTypes.EDITABLEDROPDOWN,
          dataField: "cityId",
          fieldSetting: {
            isDisable: true,
            placeholder: "Select City",
            isEnableOnChange: true,
            isText: false,
            isDependDropdown: {
              dataField: 'stateId'
            }
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-input label-name-small",
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
          validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.VALIDZIPCODE }],
          style: {
            containerCss: "col-xxl-6 col-xl-8 col-md-8 col-12 mb-input label-name-small",
          },
        },
        {
          id: "isShippingAndBilling",
          label: "Is Billing And Shipping are same",
          Field_Name: "Is Billing and Shipping",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isShippingAndBilling",
          style: {
            containerCss: "col-xxl-5 col-xl-5 col-md-12 col-12 col-12 ",
          },
        },
        {
          id: "isPreferredBilling",
          label: "Is Preferred Billing",
          Field_Name: "Is PreferredBilling",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isPreferredBilling",
          style: {
            containerCss: "col-xxl-3 col-xl-3 col-md-12 col-12 col-12 ",
          },
        },
        {
          id: "isPreferredShipping",
          label: "Is Preferred Shipping",
          Field_Name: "Is PreferredShipping",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isPreferredShipping",
          style: {
            containerCss: "col-xxl-4 col-xl-4 col-md-12 col-12 col-12 ",
          },
        }
      ]
    }
  ],
  formSetting: {
    isViewOnly: false
  }
};
