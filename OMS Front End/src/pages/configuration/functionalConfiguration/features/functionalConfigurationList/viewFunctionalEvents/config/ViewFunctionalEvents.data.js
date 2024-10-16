import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const viewFunctionalEventsData = {
  columns: [
    {
      name: "event",
      fieldName: "eventName",
      colStyle: {
        width: "40%",
      },
      allowShort: true,
    },
    {
      name: "event Date",
      colStyle: {
        width: "15%",
      },
      fieldName: "eventDate",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "MM/DD/YYYY hh:mm A ",
      },
    },
    {
      name: "description",
      fieldName: "description",
      colStyle: {
        width: "45%",
      },
      allowShort: true,
    },

  ],

};