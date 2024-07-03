import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";



export const assignUserFormData = {
  name: "Add Edit Role Form",
  initialState: { userName: "" },
  formFields: [
    {
      id: "userId",
      lable: "Users",
      Field_Name: "Users",
      fieldType: FormFieldTypes.SELECT,
      dataField: "userName",
      fieldSetting: {
        placeholder: "Select Users",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-10 col-xl-10 col-md-10 mb-2",
      },
    },
  ],
  formSetting: {
    isViewOnly: false
  }
};

export const assignUserListData = {
  columns: [
    {
      name: "User Name",
      fieldName: "userName",
      width:"80%",
      // allowShort: true,
    },
    {
      name: "Action",
      width:"20%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: true,
      },
    },
  ],
}