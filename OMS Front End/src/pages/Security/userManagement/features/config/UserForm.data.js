import { securityKey } from "../../../../../data/SecurityKey";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const securityKeys = {
  ADD: securityKey.ADDUSER,
  EDIT: securityKey.EDITUSER,
  DELETE: securityKey.DELETEUSER
};


export const userFormData = {
  name: "User From",
  initialState: {
    userName: "",
    firstName: "",
    lastName: "",
    isActive: true,
    password: "",
  },
  formFields: [
    {
      id: "userName",
      lable: "User Name :",
      Field_Name: "User Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "userName",
      fieldSetting: {
        placeholder: "Enter User Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl- col-xl-6 col-md-6 mb-2",
      },
    },
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
        containerCss: "col-xxl- col-xl-6 col-md-6 mb-2",
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
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-2",
      },
    },
    {
      id: "Password",
      lable: "Password",
      Field_Name: "Password",
      fieldType: FormFieldTypes.PASSWORD,
      dataField: "password",
      fieldSetting: {
        placeholder: "Enter Your Password",
      },
      validation: [{ type: "require" }, { type: "password" }],
      style: {
        containerCss: "col-md-6",
      },
    },
    {
      id: "isActive",
      lable: "IsActive",
      Field_Name: "IsActive",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isActive",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 mb-2",
      },
    },

  ],
  formSetting: {
    isViewOnly: false
  }
};

export const UserGridConfig = {
  columns: [
    {
      name: "User Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "First Name",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Last Name",
      fieldName: "lastName",
    },
    {
      name: "IsActive",
      fieldName: "isActive",
      colType: GridColumnType.CHECKBOX,
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },

    },
  ],
};
