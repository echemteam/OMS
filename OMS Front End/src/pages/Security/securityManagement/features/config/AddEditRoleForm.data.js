import { securityKey } from "../../../../../data/SecurityKey";
import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const securityKeys = {
  ADD: securityKey.ADDSECURITYROLE,
  EDIT: securityKey.EDITSECURITYROLE,
  DELETE: securityKey.DELETESECURITYROLE
};

export const addEditRoleFormData = {
  name: "Add Edit Role Form",
  initialState: { roleName: "" },
  formFields: [
    {
      id: "roleName",
      lable: "Role Name :",
      Field_Name: "Role Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "roleName",
      fieldSetting: {
        placeholder: "Enter Role Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
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
      // allowShort: true,
      width:"80%",
    },
    {
      name: "Action",
      width:"20%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
      customAction: [
        {
          name: "PERMISSION",
          iconName: AppIcons.permissionIcon,
        },
        {
          name: "USER",
          iconName: AppIcons.userIcon,
        },
      ],
    },
  ],
};