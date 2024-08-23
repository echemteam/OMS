import { GridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/gridColumnType";
import { EditGridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/editGridColumnType";

export const priceListConfig = {
  columns: [
    {
      name: "Unit",
      fieldName: "Quantity",
      colStyle: {
        width: "10%",
      },
    },
    {
      name: "Size",
      fieldName: "Size",
      colStyle: {
        width: "10%",
      },
    },
    {
      name: "Price",
      fieldName: "Price",
      colStyle: {
        width: "10%",
      },
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
        editColValidation: [{ type: "required", message: "Order Note ." }],
      },
      colStyle: {
        width: "20%",
        textAlign: "center",
      },
      allowShort: false,
    },
    {
      name: "Req-Date",
      fieldName: "reqdate",
      colType: GridColumnType.DATE,
      colSettings: {
        format: "DD-MMM-YYYY"
      },
      allowEditColumn: true,
      editColumn: {
        editColType: EditGridColumnType.DATEPICKER,
        placeholder: "Req-Date",
        editColFieldName: "releaseDate",
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
      fieldName: "priorityDate",
      colType: GridColumnType.DATE,
      colSettings: {
        format: "DD-MMM-YYYY"
      },
      allowEditColumn: true,
      editColumn: {
        placeholder: "Promise Date",
        editColType: EditGridColumnType.DATEPICKER,
        editColFieldName: "releaseDate",
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
      fieldName: "leadCast",
      allowEditColumn: true,

      editColumn: {
        editColType: EditGridColumnType.DROPDOWN,
        editColFieldName: "leadCast",
        isDisable: false,
        isMultiSelect: false,
        options: [
          { value: 1, label: "High" },
          { value: 2, label: "Low" },
        ],
        editColValidation: [
          // { type: "required", message: "Lead Cast is required." },
        ],
      },
      colStyle: {
        width: "20%",
      },
      allowShort: false
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      colStyle: {
        width: "10%",
      },
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
      },
      allowShort: false
    },
  ],
  editSettings: {
    defualtEditableView: true,
    buttons: {
      save: true,
      cancel: false,
    }
  },
  allowEdit: true,
  handleRowDataUpdate: null,
  OnColumnChangeEdit: null
};
