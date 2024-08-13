import { GridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/gridColumnType";
import { EditGridColumnType } from "../../../../../../../components/FinalMolGrid/libs/data/editGridColumnType";

export const priceListConfig = {
  columns: [
    {
      name: "Size",
      fieldName: "size",
      colStyle: {
        width: "10%",
      },
    },
    {
      name: "Unit",
      fieldName: "unit",
      colStyle: {
        width: "10%",
      },
    },
    {
      name: "Price",
      fieldName: "price",
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
      fieldName: "reqDate",
      colStyle: {
        width: "15%",
      },
    },
    {
      name: "Priority Date",
      fieldName: "priorityDate",
      colType: GridColumnType.DROPDOWN,
      colSettings: {
        isDisable: false,
        placeHolder: "Please select option",
        options: [
          { label: "Test 1", value: 1 },
          { label: "Test 2", value: 2 },
          { label: "Test 3", value: 3 },
          { label: "Test 4", value: 4 },
        ],
      },
      colStyle: {
        textAlign: "right",
        width: "15%",
      },
      allowShort: false,
    },
    {
      name: "Action",
      fieldName: "isPrimary",
      colStyle: {
        width: "20%",
      },
    },
  ],
  allowEdit: true,
    editSettings:{
        defualtEditableView: true,
        buttons:{
            save:true,
            delete:true,
            cancel:false
        }
    }
};
