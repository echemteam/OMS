
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";


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
      id: "firstName",
      lable: "First Name",
      Field_Name: "First Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "firstName",
      fieldSetting: {
        placeholder: "Enter First Name",
        allowSpace: true,
        maxLength:65,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl- col-xl-6 col-md-6 mb-input",
      },
    },
    {
      id: "lastName",
      lable: "Last Name",
      Field_Name: "Last Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "lastName",
      fieldSetting: {
        placeholder: "Enter Last Name",
        allowSpace: true,
        maxLength:65,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-input",
      },
    },
    {
      id: "userName",
      lable: "User Name",
      Field_Name: "User Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "userName",
      fieldSetting: {
        placeholder: "Enter User Name",
        allowSpace: true,
        maxLength : 65,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl- col-xl-6 col-md-6 mb-input",
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
        maxLength:20,
      },
      validation: [{ type: "require" }, { type: "password" }],
      style: {
        containerCss: "col-xxl- col-xl-6 col-md-6 mb-input",
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
        containerCss: "col-xxl-4 col-xl-4 col-md-4 mb-input mt-3 margin-top-checkbox",
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
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "First Name",
      fieldName: "firstName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Last Name",
      fieldName: "lastName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "IsActive",
      fieldName: "isActive",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        isDisabled: true,
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
      customAction: [
        {
          name: "HISTORY",
          iconName: "iconamoon:history-bold",
          title: "History",
          className: ".history-btn "
        },
      ],
    },
  ],
};
export const UserHistoryGridConfig = {
  columns: [
    {
      name: "Login Time",
      fieldName: "userLoginDateTime",
      colStyle: {
        width: "40%",
      },
      allowShort: true,
    },
    {
      name: "Logout Time",
      fieldName: "userLogoutDateTime",
      colStyle: {
        width: "40%",
      },
      allowShort: true,
    },
    {
      name: "IP Address",
      fieldName: "ipAddress",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    
  ]
};