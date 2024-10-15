import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initialState = {
  handlingFees: "",
  bankWireFees: "",
  creditCardServiceFees: "",
  coldBoxFees: "",
  iTNFees: "",
  paymentTermId: ""
}

export const OrganizationOtherChargesFormData = {
  initialState: initialState,
  section: [
    {
      title: "Other Charges Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "handlingFees",
          label: "Handling Fees ",
          Field_Name: "Handling Fees",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "handlingFees",
          fieldSetting: {
            placeholder: "Enter Handling Fees",
            allowSpace: true,
            maxLength: 4,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "bankWireFees",
          label: "Bank Wire Fees ",
          Field_Name: "Bank Wire Fees",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "bankWireFees",
          fieldSetting: {
            placeholder: "Enter Bank Wire Fees",
            allowSpace: true,
            maxLength: 4,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "creditCardServiceFees",
          label: "Credit Card Service Fees ",
          Field_Name: "Credit Card Service Fees",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "creditCardServiceFees",
          fieldSetting: {
            placeholder: "Enter Credit Card Service Fees",
            allowSpace: true,
            maxLength: 4,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "coldBoxFees",
          label: "Cold Box Fees ",
          Field_Name: "Cold Box Fees",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "coldBoxFees",
          fieldSetting: {
            placeholder: "Enter Cold Box Fees",
            allowSpace: true,
            maxLength: 4,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "iTNFees",
          label: "ITN Fees ",
          Field_Name: "ITN Fees",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "iTNFees",
          fieldSetting: {
            placeholder: "Enter ITN Fees",
            allowSpace: true,
            maxLength: 4,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },

        {
          id: "paymentTermId",
          label: "Default Payment Terms ",
          Field_Name: "Default Payment Terms",
          fieldType: FormFieldTypes.SELECT,
          dataField: "paymentTermId",
          fieldSetting: {
            placeholder: "Select Default Payment Terms",
            isEnableOnChange: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
      ]
    }
  ],
  formSetting: {
    isViewOnly: false,
  },
};
