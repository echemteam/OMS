import { GridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/gridColumnType";
import { EditGridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/editGridColumnType";

export const priceListConfig = {
  columns: [
    {
      name: "Size",
      colStyle: {
        width: "7%",
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
    {
      name: "Unit",
      fieldName: "Unit",
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.DROPDOWN,
        editColFieldName: "Unit",
        isDisable: false,
        isMultiSelect: false,
        options: [
          { value: "MG", label: "MG" },
          { value: "G", label: "G" },
          { value: "KG", label: "KG" },
        ],
        // editColValidation: [
        //   // { type: "required", message: "Lead Cast is required." },
        // ],
      },
      colStyle: {
        width: "7%",
      },
      allowShort: false
    },
    {
      name: "Price",
      colStyle: {
        width: "7%",
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
          maxLength: 20,
          isReadOnly: false,
        },
        // editColValidation: [{ type: "required", message: "Order Note ." }],
      },
      colStyle: {
        width: "19%",
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
          { value: "High", label: "High" },
          { value: "Low", label: "Low" },
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
        width: "10%",
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
