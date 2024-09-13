import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const viewFunctionalEventsData = {
  columns: [
    {
      name: "functionality",
      fieldName: "functionalityName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "event",
      fieldName: "eventName",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "event Date",
      colStyle: {
        width: "20%",
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
        width: "35%",
      },
      allowShort: true,
    },

  ],

};