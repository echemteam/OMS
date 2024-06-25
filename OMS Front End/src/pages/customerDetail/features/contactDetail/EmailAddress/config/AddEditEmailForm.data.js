import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";


export const addEditEmailFormData = {
  name: "Add Edit Role Form",
  initialState: {
    emailAddress: "",
    id: ''
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