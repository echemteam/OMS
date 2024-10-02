import { EditGridColumnType } from "../../../../../../../data/editGridColumnType";
import { FormFieldTypes } from "../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const addEditCarrierFormData = {
  name: "Shipping Form",
  initialState: {
    carrierId: 0,
    accountNumber: "",
    handlingFee: 10,
    isCarrierPrimary: false,
  },
  formFields: [
    {
      id: "carrier",
      lable: "Carrier ",
      Field_Name: "Carrier",
      fieldType: FormFieldTypes.SELECT,
      dataField: "carrier",
      fieldSetting: {
        placeholder: "Select Carrier",
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2 label-h-0",
      },
    },
    {
      id: "accountNumber",
      lable: "Account Number ",
      Field_Name: "Account Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "accountNumber",
      fieldSetting: {
        placeholder: "Enter Account Number",
        allowSpace: true,
        maxLength: 25,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-3 label-h-0",
      },
    },
    {
      id: "handlingFee",
      lable: "Handling Fee",
      Field_Name: "Handling Fee",
      fieldType: FormFieldTypes.INPUT,
      dataField: "handlingFee",
      fieldSetting: {
        placeholder: "Enter Handling Fee",
        allowSpace: true,
        maxLength: 3,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-3 label-h-0",
      },
    },
    {
      id: "isCarrierPrimary",
      lable: "Is Primary",
      Field_Name: "Is Primary",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isCarrierPrimary",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
  ],
};

export const AccountGridConfig = {
  columns: [
    {
      name: "Carrier",
      fieldName: "carrier",
      colStyle: {
        width: "25%",
      },
    },
    {
      name: "Account Number",
      colStyle: {
        width: "25%",
      },
      fieldName: "accountNumber",
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.INPUT,
        editColFieldName: "accountNumber",
        isDisable: false,
        editColValidation: [
          { type: "required", message: "Account Number is required." },
        ],
        colConfig: {
          maxLength: 9,
        },
      },
      colSettings: {},
      allowShort: false,
    },
    {
      name: "Handling Fee New",
      fieldName: "handlingFee",
      colStyle: {
        width: "25%",
      },
      colType: GridColumnType.MONEY,
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.NUMERIC,
        editColFieldName: "handlingFee",
        isDisable: false,
        editColValidation: [
          { type: "required", message: "Handling Fee is required." },
          {
            type: "maxLength",
            value: 3,
            message: "Handling Fee must be at least 3 characters long.",
          },
        ],

        colConfig: {
          maxLength: 3,
        },
      },
      colSettings: {},
      allowShort: false,
    },

    {
      name: "Is Primary",
      fieldName: "isPrimary",
      colStyle: {
        width: "25%",
      },
      colType: GridColumnType.CHECKBOX,
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.CHECKBOX,
        editColFieldName: "isPrimary",
        isDisable: false,
        editColValidation: [],
      },
      colSettings: {
        // allowCheckbox: true,
        // isDisabled: false
        isDisabled: true,
        allowEdit: true,
      },
      allowShort: false,
    },

    {
      name: "Action",
      colStyle: {
        width: "25%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: false,
      },
      allowShort: false,
    },
  ],
  editSettings: {
    defualtEditableView: false,
    buttons: {
      save: true,
      cancel: true,
    }
  },
  allowEdit: true,
  handleRowDataUpdate: null,
  OnColumnChangeEdit: null
};
