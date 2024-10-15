import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

export const contactDetailFormData = {
  name: "Email From",
  initialState: {
    firstName: "",
    lastName: "",
    contactTypeId: "",
    isPrimary: false
  },
  section: [
    {
      title: "Contact Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "firstName",
          label: "First Name ",
          Field_Name: "First Name",
          fieldType: FormFieldTypes.INPUT,
          dataField: "firstName",
          fieldSetting: {
            placeholder: "Enter First Name",
            allowSpace: true,
            maxLength: 50,
          },
          validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.ONLYTEXT }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input",
          },
        },
        {
          id: "lastName",
          label: "Last Name ",
          Field_Name: "Last Name",
          fieldType: FormFieldTypes.INPUT,
          dataField: "lastName",
          fieldSetting: {
            placeholder: "Enter Last Name",
            allowSpace: true,
            maxLength: 50,
          },
          validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.ONLYTEXT }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input",
          },
        },
        {
          id: "contactTypeId",
          label: "Contact Type ",
          Field_Name: "Contact Type",
          fieldType: FormFieldTypes.SELECT,
          dataField: "contactTypeId",
          fieldSetting: {
            placeholder: "Select Contact Type",
            isMultiSelect: true,
            // isDisabled: false,
            isEnableOnChange: true
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-8 col-xl-8 col-md-12 col-12 col-12 mb-input",
          },
        },
        {
          id: "isPrimary",
          label: "Is Primary",
          Field_Name: "Is Primary",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isPrimary",
          fieldSetting: {
            placeholder: "",
            allowSpace: true,
          },
          style: {
            containerCss:
              "col-xxl-4 col-xl-4 col-md-12 col-12 col-12 mb-input mt-3 margin-left0-checkbox margin-top-checkbox",
          },
        },
      ]
    }
  ],
  formSetting: {
    isViewOnly: false
  }
};

export const ContactTypes = [
  { value: 1, label: "Primary" },
  { value: 2, label: "EndUser" },
  { value: 3, label: "Purchasing" },
  { value: 4, label: "Invoice Submission" },
  { value: 5, label: "Invoice Follow-up" },
  { value: 6, label: "AP" }
];