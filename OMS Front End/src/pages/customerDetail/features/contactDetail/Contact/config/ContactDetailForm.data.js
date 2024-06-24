import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const contactDetailFormData = {
  name: "Email From",
  initialState: {
    firstName: "",
    lastName: "",
    contactTypeId: 0,
  },
  formFields: [
    {
      id: "firstName",
      lable: "First Name :",
      Field_Name: "First Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "firstName",
      fieldSetting: {
        placeholder: "Enter First Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-2",
      },
    },
    {
      id: "lastName",
      lable: "Last Name :",
      Field_Name: "Last Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "lastName",
      fieldSetting: {
        placeholder: "Enter Last Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 col-12 mb-2",
      },
    },
    {
      id: "contactTypeId",
      lable: "Contact Type :",
      Field_Name: "Contact Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "contactTypeId",
      fieldSetting: {
        placeholder: "Select Contact Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-2",
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
          "col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-2 margin-left0-checkbox",
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