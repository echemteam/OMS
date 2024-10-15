import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initState = {
  domesticOvernight: "",
  domesticSecondDay: "",
  domesticGround: "",
  internationalPriority: "",
  internationalEconomy: ""
};

export const OrganizationShippingChargesFormData = {
  initialState: initState,
  section: [
    {
      title: "Shipping Charges Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "domesticOvernight",
          label: "Domestic Overnight ",
          Field_Name: "Domestic Overnight",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "domesticOvernight",
          fieldSetting: {
            placeholder: "Enter Domestic Overnight",
            allowSpace: true,
            maxLength: 4
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "domesticSecondDay",
          label: "Domestic SecondDay ",
          Field_Name: "Domestic SecondDay",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "domesticSecondDay",
          fieldSetting: {
            placeholder: "Enter Domestic SecondDay",
            allowSpace: true,
            maxLength: 4
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "domesticGround",
          label: "Domestic Ground ",
          Field_Name: "Domestic Ground",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "domesticGround",
          fieldSetting: {
            placeholder: "Enter Domestic Ground",
            allowSpace: true,
            maxLength: 4
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "internationalPriority",
          label: "International Priority ",
          Field_Name: "International Priority",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "internationalPriority",
          fieldSetting: {
            placeholder: "Enter International Priority",
            allowSpace: true,
            maxLength: 4
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
          },
        },
        {
          id: "internationalEconomy",
          label: "International Economy ",
          Field_Name: "International Economy",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "internationalEconomy",
          fieldSetting: {
            placeholder: "Enter International Economy",
            allowSpace: true,
            maxLength: 4
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
    isViewOnly: false
  }
};
