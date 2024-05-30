import { FormFieldTypes } from "../../../../../data/formFieldType";

export const addEditRoleFormData = {
  name: "Add Edit Role Form",
  initialState: { companyName: "" },
  formFields: [
    {
      id: "roleName",
      lable: "Role Name :",
      Field_Name: "Role Names",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Role Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
      },
    },
    
    {
      id: "userRole",
      lable: "User Role :",
      Field_Name: "User Role",
      fieldType: FormFieldTypes.SELECT,
      dataField: "UserRole",
      fieldSetting: {
        placeholder: "Select User Role",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
      },
    },
    {
      id: "isActive",
      lable: "IsActive",
      Field_Name: "IsActive",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "IsActive",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-2 col-xl-2 col-md-3 mb-3 checkbox-horizontal",
      },
    },
    
  ],
};
