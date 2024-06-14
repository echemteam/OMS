import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";


export const addEditContactsFormData = {
  name: "Add Edit Role Form",
  initialState: {
    phoneCode: '',
    phoneNumber: '',
    phoneTypeId: 0
  },
  formFields: [

    {
      id: "phoneCode",
      lable: "Contact Number :",
      Field_Name: "Phone Code",
      fieldType: FormFieldTypes.SELECT,
      dataField: "phoneCode",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-5 col-md-5 mb-2 pr-0 border-right-0",
      },
    },
    {
      id: "phoneNumber",
      lable: "",
      Field_Name: "Phone Number",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "phoneNumber",
      fieldSetting: {
        placeholder: "Enter Phone Number",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-8 col-xl-7 col-md-7 mb-2 pl-0 border-left-r-0",
      },
    },
  ],
};


export const phoneNumberConfig = {
  columns: [
    {
      name: "Phone Number",
      fieldName: "phoneCode,phoneNumber",
      colType: GridColumnType.CUSTOM,
      renderCustomCol: (rowData) => {
        return `(${rowData?.["phoneCode"]}) ${rowData?.["phoneNumber"]}`;
      },
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ]
}