import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";


export const addEditEmailFormData = {
  name: "Add Edit Role Form",
  initialState: {
    emailAddress: "",
    isEmailPrimary: false
  },
  formFields: [
    {
      id: "emailAddress",
      lable: "Email Address :",
      Field_Name: "Email Address",
      fieldType: FormFieldTypes.INPUT,
      dataField: "emailAddress",
      fieldSetting: {
        placeholder: "Enter Email Address",
        allowSpace: false,
      },
      validation: [{ type: "require" }, { type: "email" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
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
          "col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-2 margin-left0-checkbox",
      },
    },
  ],
};

export const emailConfig = {
  columns: [
    {
      name: "Email Address",
      fieldName: "emailAddress",
      width: "60%",
    },
    {
      name: "Action",
      width: "40%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ]
}