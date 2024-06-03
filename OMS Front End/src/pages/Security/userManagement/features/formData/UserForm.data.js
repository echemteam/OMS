import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const userFormData = {
  name: "User From",
  initialState: {
    userName: "",
    firstName: "",
    lastName: "",
    isActive: false,
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
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-2 col-xl-2 col-md-3 mb-2",
      },
    },

  ],
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
      colSettings: {
        valueField: "isActive",
        getLableClass: (value) => {
          switch (value) {
            case true:
              return "info";
            case false:
              return "danger";
            default:
              return "secondary";
          }
        },
      },
    },
    // {
    //   name: "Status",
    //   fieldName: "status",
    //   allowShort: false,
    //   colType: GridColumnType.LABLE,
    //   colSettings: {
    //     valueField: "status",
    //     getLableClass: (value) => {
    //       switch (value) {
    //         case "Active":
    //           return "badge-gradient-success";
    //         case "Open":
    //           return "badge-gradient-info";
    //         case "In Active":
    //           return "badge-gradient-danger";
    //         case "Pending":
    //           return "badge-gradient-warning";

    //         case "In progress":
    //           return "badge-gradient-theme";

    //         default:
    //           return "badge-gradient-info";
    //       }
    //     },
    //   },
    // },

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
