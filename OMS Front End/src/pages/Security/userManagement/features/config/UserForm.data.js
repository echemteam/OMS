import { AppIcons } from "../../../../../data/appIcons";
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
        containerCss: "col-xxl-4 col-xl-4 col-md-4 mb-input mt-3",
      },
    },
    // {
    //   id: "addressTypeId",
    //   lable: "Address Type ",
    //   Field_Name: "Address Type",
    //   fieldType: FormFieldTypes.CUSTOMSELECT,
    //   dataField: "addressTypeId",
    //   fieldSetting: {
    //     placeholder: "Select Address Type",
    //     isEnableOnChange: true,
    //     isMultiSelect: false,
    //     isDisabled: false,
    //   },
    //   validation: [{ type: "require" }],
    //   style: {
    //     containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
    //   },
    //   dropdownSettings: {
    //     colorMap: {
    //       active: "black",
    //       pending: "#ffcc00",
    //       blocked: "red"
    //     },
    //     textMap: {
    //       active : { "text": "Active" },
    //       pending : { "text": "Pending" },
    //       blocked : { "text": "Blocked" }
    //     },
    //     iconMap: {
    //        active : AppIcons.ActiveIcon,
    //        pending : AppIcons.PendingIcon,
    //        blocked : AppIcons.BlockedIcon,
    //     }
    //   }
    // },

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
      width: "20%",
      allowShort: true,
    },
    {
      name: "First Name",
      fieldName: "firstName",
      width: "20%",
      allowShort: true,
    },
    {
      name: "Last Name",
      fieldName: "lastName",
      width: "20%",
      allowShort: true,
    },
    {
      name: "IsActive",
      fieldName: "isActive",
      width: "20%",
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        allowDisable: true,
      },
    },
    {
      name: "Action",
      width: "20%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },

    },
  ],
};
