import { validationTypes } from "../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";

export const addEditApiEndPointsFormData = {
  initialState: {
    name: "",
    path: "",
    method: "",
    description: "",
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
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 ",
          },
        },
        {
          id: "path",
          label: "Path",
          Field_Name: "Path",
          fieldType: FormFieldTypes.INPUT,
          dataField: "path",
          fieldSetting: {
            placeholder: "Enter Path",
            allowSpace: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
          },
        },
        {
          id: "method",
          label: "Method ",
          Field_Name: "Method",
          fieldType: FormFieldTypes.SELECT,
          dataField: "method",
          fieldSetting: {
            placeholder: "Select Method",
            isEnableOnChange: true,
          },

          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
          },
        },
        {
          id: "description",
          label: "Description",
          Field_Name: "Description",
          fieldType: FormFieldTypes.TEXTAREA,
          dataField: "description",
          fieldSetting: {
            placeholder: "Enter Description",
            allowSpace: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
          },
        },
      ]
    }
  ],
  formSetting: {
    isViewOnly: false,
  },
};
export const ApiEndPointGridConfig = {
  columns: [
    {
      name: "End Point Name",
      fieldName: "endpointName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "End Point Path",
      fieldName: "path",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "End Point Method",
      fieldName: "method",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Description",
      fieldName: "description",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Action",
      colStyle: {
        width: "15%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
      customAction: [
        {
          name: "ADDPARAMETERS",
          iconName: "ci:list-add",
          title: "Add Parameter",
          className: "addparameter-icon",
        },
      ],
    },
  ],
};
