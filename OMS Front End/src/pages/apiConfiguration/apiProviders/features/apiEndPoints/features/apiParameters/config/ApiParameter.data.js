import { validationTypes } from "../../../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";


export const addEditApiParameterFormData = {
  initialState: {
    name: "",
    dataType: "",
    defaultValue: "",
    isRequired: "",
  },
  section: [
    {
      title: "Api Parameter Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "name",
          label: "Name ",
          Field_Name: "Name",
          fieldType: FormFieldTypes.INPUT,
          dataField: "name",
          fieldSetting: {
            placeholder: "Enter Name",
            allowSpace: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-16 col-xl-6 col-md-6 col-6 mb-2 ",
          },
        },
        {
          id: "dataType",
          label: "DataType ",
          Field_Name: "DataType",
          fieldType: FormFieldTypes.SELECT,
          dataField: "dataType",
          fieldSetting: {
            placeholder: "Select DataType",
            isEnableOnChange: true
          },

          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-2",
          },
        },
        {
          id: "defaultValue",
          label: "Default Value",
          Field_Name: "Default Value",
          fieldType: FormFieldTypes.INPUT,
          dataField: "defaultValue",
          fieldSetting: {
            placeholder: "Enter Default Value",
            allowSpace: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-2",
          },
        },

        {
          id: "isRequired",
          label: "Is Required",
          Field_Name: "Is Required",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isRequired",
          fieldSetting: {
            placeholder: "",
          },
          style: {
            containerCss:
              "col-xxl-6 col-xl-6 col-md-6 col-6 col-6 mb-input margin-left-checkbox mt-3",
          },
        }
      ]
    }
  ],
  formSetting: {
    isViewOnly: false
  }

}

export const ApiParameterGridConfig = {
  columns: [

    {
      name: "Parameter Name",
      fieldName: "name",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Data Type ",
      fieldName: "dataType",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Default Value ",
      fieldName: "defaultValue",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Is Required",
      fieldName: "isRequired",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        allowDisable: true
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ],
};