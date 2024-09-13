import { GridColumnType } from "../../../../../components/FinalMolGrid/libs/data/gridColumnType";

export const orderListMolGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "customerName",
      allowShort: false,
      colStyle: {
        width: "20%",
      },
    },
    {
      name: "PO",
      fieldName: "poNumber",
      allowShort: false,
      colStyle: {
        width: "12%",
      },
    },
    {
      name: "Entry Date",
      fieldName: "entryDatePODate",
      colType: GridColumnType.DATE,
      colSettings: {
        format: "MM/DD/YYYY",
      },
      allowShort: false,
      colStyle: {
        width: "8%",
      },
    },
    {
      name: "Method/Terms",
      fieldName: "paymentMethodTerms",
      allowShort: false,
      colStyle: {
        width: "25%",
      },
    },
    {
      name: "Items ",
      fieldName: "noItems",
      allowShort: false,
      colStyle: {
        width: "5%",
      },
    },
    
    {
      name: "Price",
      fieldName: "totalPrice",
      allowShort: false,
      colStyle: {
        width: "10%",
      },
    },

    {
      name: "Status",
      fieldName: "status",
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowEdit: false,
      },
      allowShort: false,
      colStyle: {
        width: "10%",
      },
    },

    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
      allowShort: false,
      colStyle: {
        width: "10%",
      },
    },
  ],

  ChildTableColumn: [
    {
      name: "Catalog",
      fieldName: "catalog",
      allowShort: false,
      colStyle: {
        width: "15%",
      },
    },
    {
      name: "Cas Number",
      fieldName: "casNumber",
      allowShort: false,
      colStyle: {
        width: "15%",
        
      },
    },
    {
      name: "Unit/Size",
      fieldName: "unitSize",
      allowShort: false,
      colStyle: {
        width: "10%",
      },
    },
    {
      name: "Price",
      fieldName: "price",
      allowShort: false,
      colStyle: {
        width: "10%",
      },
    },
    {
      name: "Approval Status",
      fieldName: "status",
      allowShort: false,
      colStyle: {
        width: "15%",
      },
    },
    {
      name: "Delivery Meter",
      fieldName: "deliveryMeter",
      allowShort: false,
      colStyle: {
        width: "25%",
      },
    },
    {
      name: "Action",
      fieldName: "Action",
      allowShort: false,
      colStyle: {
        width: "10%",
      },
    },
  ],

  allowEdit: false,
  handleRowDataUpdate: null,
  OnColumnChangeEdit: null,
  hasChildGridTable: true,
  childGridSetting: {
    parentKeyDataField: "id",
    childKeyDataField: "id",
    hideChildHeader: false,
  },
};