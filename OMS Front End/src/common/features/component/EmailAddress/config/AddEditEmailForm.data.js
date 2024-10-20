import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";


export const addEditEmailFormData = {
  name: "Add Edit Role Form",
  initialState: {
    emailAddress: "",
    isEmailPrimary: false
  },
  formFields: [
    {
      id: "emailAddress",
      lable: "Email Address ",
      Field_Name: "Email Address",
      fieldType: FormFieldTypes.INPUT,
      dataField: "emailAddress",
      fieldSetting: {
        placeholder: "Enter Email Address",
        allowSpace: false,
        maxLength: 50,
      },
      validation: [{ type: "require" }, { type: "email" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-input",
      },
    },
    {
      id: "isEmailPrimary",
      lable: "Is Primary",
      Field_Name: "IsEmailPrimary",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isEmailPrimary",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      style: {
        containerCss:
          "col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-input margin-left0-checkbox",
      },
    },
  ],
};

export const emailConfig = {
  columns: [
    {
      name: "Email Address",
      fieldName: "emailAddress",
      colStyle: {
        width: "40%",
      },
    },
    {
      name: "Is Primary",
      fieldName: "isPrimary",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        isDisabled: false
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "40%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ]
}