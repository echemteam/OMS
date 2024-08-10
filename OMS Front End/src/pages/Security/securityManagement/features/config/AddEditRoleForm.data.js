import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";


export const addEditRoleFormData = {
  name: "Add Edit Role Form",
  initialState: { roleName: "" },
  formFields: [
    {
      id: "roleName",
      lable: "Role Name ",
      Field_Name: "Role Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "roleName",
      fieldSetting: {
        placeholder: "Enter Role Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-input",
      },
    },

  ],
  formSetting: {
    isViewOnly: false
  }
};

export const SecurityRoleGridConfig = {
  columns: [
    {
      name: "Role Name",
      fieldName: "roleName",
      allowShort: true,
      colStyle: {
        width: "80%",
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        // allowUser: true,
        // allowPermission: true,
        allowEdit: true,
        allowDelete: true,
      },
      customAction: [
        {
          name: "USER",
          iconName: AppIcons.userIcon,
          title: "User"
        },
        {
          name: "PERMISSION",
          iconName: AppIcons.permissionIcon,
          title: "Permission"
        },
      ],
    },
  ],
};