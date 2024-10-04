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
      name: "Size",
      fieldName: "Size",
      colType: GridColumnType.CUSTOM,
      colStyle: {
        width: "15%",
      },
      renderCustomCol: (rowData) => {
        return `${rowData?.["Size"]} ${rowData?.["Unit"]}`;
      }
    },
    {
      name: "Order Total",
      fieldName: "Price",
      colStyle: {
        width: "Price",
      },
    }
  ],
};
