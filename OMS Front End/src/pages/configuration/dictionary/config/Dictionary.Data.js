import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

export const dictionaryFormData = {
  initialState: {
    key: "",
    value: "",
  },
  formFields: [
    {
      id: "key",
      lable: "Key ",
      Field_Name: "key",
      fieldType: FormFieldTypes.INPUT,
      dataField: "key",
      fieldSetting: {
        placeholder: "Enter Key",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2 ",
      },
    },
    {
      id: "value",
      lable: "Value",
      Field_Name: "Value",
      fieldType: FormFieldTypes.INPUT,
      dataField: "value",
      fieldSetting: {
        placeholder: "Enter Value",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    }, 
  ],
}
export const DictionaryGridConfig = {
  columns: [
    {
      name: "Key",
      fieldName: "key",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      name: "Value",
      fieldName: "value",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      name: "Action",
      colStyle: {
        width: "30%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ],

};