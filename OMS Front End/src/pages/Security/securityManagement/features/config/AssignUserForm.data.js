import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";



export const assignUserFormData = {
  name: "Add Edit Role Form",
  initialState: { userName: "" },
  section: [
    {
      title: "Assign User Section",
      row: {},
      style: {
        sectionStyle: "col-lg-10 row mb-3",
      },
      fields: [
        {
          id: "userId",
          label: "Users",
          Field_Name: "Users",
          fieldType: FormFieldTypes.SELECT,
          dataField: "userName",
          fieldSetting: {
            placeholder: "Select Users",
            isEnableOnChange: true
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12",
          },
        },
      ]
    }
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
      colStyle: {
        width: "80%",
      },
      allowShort: true,
    },
    {
      name: "Action",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: true,
      },
    },
  ],
}