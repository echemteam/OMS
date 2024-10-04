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
        width: "15%",
      },
    },
    {
      name: "Entry Date",
      fieldName: "orderReceivedDate",
      colType: GridColumnType.DATE,
      colSettings: {
        format: "MM/DD/YYYY",
      },
      allowShort: false,
      colStyle: {
        width: "15%",
      },
    },
    {
      name: "Method/Terms",
      fieldName: "orderMethod",
      allowShort: false,
      colStyle: {
        width: "20%",
      },
    },
    {
      name: "Items ",
      fieldName: "items",
      allowShort: false,
      colStyle: {
        width: "10%",
      },
    },
    
    {
      name: "Price",
      fieldName: "itemsTotal",
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
      fieldName: "catalogId",
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
      fieldName: "itemUnitPrice",
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
      name: "Delivery Method",
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
    parentKeyDataField: "orderId",
    childKeyDataField: "orderId",
    hideChildHeader: false,
  },
};
