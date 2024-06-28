import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";


export const addEditContactsFormData = {
  name: "Add Edit Role Form",
  initialState: {
    phoneCode: '1',
    phoneNumber: '',
    phoneTypeId: '',
    extension: 0,
    id: 0,
    isPrimaryPhoneNumber: false
  },
  formFields: [
    {
      id: "phoneTypeId",
      lable: "Phone Type",
      Field_Name: "phoneType",
      fieldType: FormFieldTypes.SELECT,
      dataField: "phoneTypeId",
      fieldSetting: {
        placeholder: "Enter Phone Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-12 mb-1 pr-0",
      },
    },
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
        containerCss: "col-xxl-5 col-xl-5 col-md-4 mb-1 pr-0 border-right-0",
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
        containerCss: "col-xxl-5 col-xl-5 col-md-7 mb-1 pl-0 border-left-r-0",
      },
    },
    {
      id: "extension",
      lable: "Extension",
      Field_Name: "Extension",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "extension",
      fieldSetting: {
        placeholder: "Enter Extension",
        allowSpace: true,
        minLength: 0,
        maxLength: 6,
      },
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-8 mb-1 pr-0 ",
      },
    },
    {
      id: "isPrimaryPhoneNumber",
      lable: "Is Primary",
      Field_Name: "isPrimaryPhoneNumber",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isPrimaryPhoneNumber",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      style: {
        containerCss:
          "col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-2 margin-left0-checkbox",
      },
    },

  ],
};


export const phoneNumberConfig = {
  columns: [
    {
      name: "Type",
      fieldName: "phoneType",
      width: "15%",
      renderCustomCol: (rowData) => {
        return `(${rowData?.["phoneCode"]}) ${rowData?.["phoneNumber"]}`;
      },
    },
    {
      name: "Phone Number",
      fieldName: "phoneCode,phoneNumber",
      colType: GridColumnType.CUSTOM,
      width: "30%",
      renderCustomCol: (rowData) => {
        return `(${rowData?.["phoneCode"]}) ${rowData?.["phoneNumber"]}`;
      },
    },
    {
      name: "Extension",
      width: "20%",
      fieldName: "extension"
    },
    {
      name: "Is Primary",
      fieldName: "isPrimary",
      width: "15%",
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        allowDisable: true
      },
    },
    {
      name: "Action",
      width: "15%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ]
}