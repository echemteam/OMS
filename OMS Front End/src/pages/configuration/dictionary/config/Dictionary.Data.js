import { validationTypes } from "../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

export const dictionaryFormData = {
  initialState: {
    key: "",
    value: "",
  },
  section: [
    {
      title: "User Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "key",
          label: "Key ",
          Field_Name: "key",
          fieldType: FormFieldTypes.INPUT,
          dataField: "key",
          fieldSetting: {
            placeholder: "Enter Key",
            allowSpace: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2 ",
          },
        },
        {
          id: "value",
          label: "Value",
          Field_Name: "Value",
          fieldType: FormFieldTypes.INPUT,
          dataField: "value",
          fieldSetting: {
            placeholder: "Enter Value",
            allowSpace: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
          },
        },
      ]
    }
  ]
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