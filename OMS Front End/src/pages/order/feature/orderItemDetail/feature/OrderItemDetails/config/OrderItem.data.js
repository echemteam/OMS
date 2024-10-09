import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const orderItemSelectList = {
  columns: [
    {
      name: "Chemical Name",
      fieldName: "ProductName",
      colStyle: {
        width: "40%",
      },
    },
    {
      name: "Catalog ID",
      fieldName: "CatalogId",
      colStyle: {
        width: "15%",
      },
    },

    {
      name: "CAS No",
      fieldName: "CASNo",
      colStyle: {
        width: "15%",
      },
    },
    {
      name: "Pack Size",
      fieldName: "Pack Size",
      colType: GridColumnType.CUSTOM,
      colStyle: {
        width: "15%",
      },
      renderCustomCol: (rowData) => {
        return `${rowData?.["Quantity"]} X ${rowData?.["Size"]} ${rowData?.["Unit"]}`;
      }
    },
    {
      name: "Unit Total",
      fieldName: "Price",
      colType: GridColumnType.CUSTOM,
      colStyle: {
        width: "10%",
      },
      renderCustomCol: (rowData) => {
        const priceValue = parseFloat(rowData?.["Price"]) || 0;
        return priceValue?.toFixed(2);
      }
    },
    {
      name: "Total Price",
      fieldName: "Price",
      colType: GridColumnType.CUSTOM,
      colStyle: {
        width: "10%",
      },
      renderCustomCol: (rowData) => {
        const packageValue = parseFloat(rowData?.["Quantity"]) || 0;
        const priceValue = parseFloat(rowData?.["Price"]) || 0;
        const result = packageValue * priceValue;
        return result?.toFixed(2);
      }
    }
  ],
};
