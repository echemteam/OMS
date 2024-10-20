import { FormFieldTypes } from "../../../../../data/formFieldType";

export const contactDetailFormData = {
  name: "Email From",
  initialState: {
    firstName: "",
    lastName: "",
    contactTypeId: "",
    isPrimary: false
  },
  formFields: [
    {
      id: "firstName",
      lable: "First Name ",
      Field_Name: "First Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "firstName",
      fieldSetting: {
        placeholder: "Enter First Name",
        allowSpace: true,
        maxLength: 50,
      },
      validation: [{ type: "require" } , { type: "onlyText"}],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input",
      },
    },
    {
      id: "lastName",
      lable: "Last Name ",
      Field_Name: "Last Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "lastName",
      fieldSetting: {
        placeholder: "Enter Last Name",
        allowSpace: true,
        maxLength: 50,
      },
      validation: [{ type: "require" } , { type: "onlyText"}],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-input",
      },
    },
    {
      id: "contactTypeId",
      lable: "Contact Type ",
      Field_Name: "Contact Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "contactTypeId",
      fieldSetting: {
        placeholder: "Select Contact Type",
        isMultiSelect: true,
       // isDisabled: false,
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-12 col-12 col-12 mb-input",
      },
    },
    {
      id: "isPrimary",
      lable: "Is Primary",
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