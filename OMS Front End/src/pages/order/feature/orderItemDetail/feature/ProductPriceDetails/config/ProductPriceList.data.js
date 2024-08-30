import { GridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/gridColumnType";
import { EditGridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/editGridColumnType";

export const priceListConfig = {
  columns: [
    {
      name: "Size",
      colStyle: {
        width: "10%",
      },
      fieldName: "Size",
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.INPUT,
        editColFieldName: "Size",
        isDisable: false,
        // editColValidation: [
        //   // { type: "required", message: "Size is required." },
        // ],
      },
      colSettings: {},
      allowShort: false
    },
    // {
    //   name: "Unit",
    //   fieldName: "Unit",
    //   allowEditColumn: true,
    //   editColumn: {
    //     editColType: EditGridColumnType.DROPDOWN,
    //     editColFieldName: "Unit",
    //     isDisable: false,
    //     isMultiSelect: false,
    //     options: [
    //       { value: 1, label: "MG" },
    //       { value: 2, label: "G" },
    //       { value: 3, label: "KG" },
    //     ],
    //     editColValidation: [
    //       { type: "required", message: "Unit is required." },
    //     ],
    //   },
    //   colStyle: {
    //     width: "10%",
    //   },
    //   allowShort: false
    // },
    {
      name: "Unit",
      colStyle: {
        width: "10%",
      },
      fieldName: "Unit",
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.INPUT,
        editColFieldName: "Unit",
        isDisable: false,
        // editColValidation: [
        //   // { type: "required", message: "Unit is required." },
        // ],
      },
      colSettings: {},
      allowShort: false
    },
    {
      name: "Price",
      colStyle: {
        width: "10%",
      },
      fieldName: "Price",
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.INPUT,
        editColFieldName: "Price",
        isDisable: false,
        // editColValidation: [
        //   // { type: "required", message: "Price is required." },
        // ],
      },
      colSettings: {},
      allowShort: false
    },
    {
      name: "Order Note",
      fieldName: "orderNote",
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.INPUT,
        placeholder: "Order Note",
        editColFieldName: "orderNote",
        isDisable: false,
        colConfig: {
          maxLength: 5,
          isReadOnly: false,
        },
        // editColValidation: [{ type: "required", message: "Order Note ." }],
      },
      colStyle: {
        width: "20%",
        textAlign: "center",
      },
      allowShort: false,
    },
    {
      name: "Req-Date",
      fieldName: "requestDate",
      colType: GridColumnType.DATE,
      colSettings: {
        format: "DD-MMM-YYYY"
      },
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.DATEPICKER,
        placeholder: "Req-Date",
        editColFieldName: "requestDate",
        isDisable: false,
        colConfig: {
          format: "DD/MM/YYYY"
        },
        // editColValidation: [
        //   { type: "required", message: "Req-Date is required." },
        // ],
      },
      colStyle: {
        textAlign: "right",
        width: "15%",
      },
      allowShort: false,
    },
    {
      name: "Promise Date",
      fieldName: "promiseDate",
      colType: GridColumnType.DATE,
      colSettings: {
        format: "DD-MMM-YYYY"
      },
      allowEditColumn: true,
      editColumn: {
        placeholder: "Promise Date",
        editColType: EditGridColumnType.DATEPICKER,
        editColFieldName: "promiseDate",
        isDisable: false,
        colConfig: {
          format: "DD/MM/YYYY"
        },
        // editColValidation: [
        //   { type: "required", message: "Promise Date is required." },
        // ],
      },
      colStyle: {
        textAlign: "right",
        width: "15%",
      },
      allowShort: false,
    },
    {
      name: "Priority",
      fieldName: "orderPriority",
      allowEditColumn: true,

      editColumn: {
        editColType: EditGridColumnType.DROPDOWN,
        editColFieldName: "orderPriority",
        isDisable: false,
        isMultiSelect: false,
        options: [
          { value: 1, label: "High" },
          { value: 2, label: "Low" },
        ],
        // editColValidation: [
        //   // { type: "required", message: "Lead Cast is required." },
        // ],
      },
      colStyle: {
        width: "20%",
      },
      allowShort: false
    },
    {
      name: "Action",
      colStyle: {
        width: "25%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
      allowShort: false
    },
  ],
  allowEdit: true,
  editSettings: {
    defualtEditableView: true,
    buttons: {
      save: true,
      delete: true,
      cancel: false
    }
  }
};
