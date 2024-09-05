import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const viewFunctionalEventsData = {
  columns: [
    {
      name: "functionality Name",
      fieldName: "functionalityName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "event Name",
      fieldName: "eventName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "created date",
      colStyle: {
        width: "20%",
      },
      fieldName: "createdAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "MM/DD/YYYY hh:mm A ",
      },
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
      name: "event Name",
      fieldName: "eventName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "description",
      fieldName: "description",
      colStyle: {
        width: "40%",
      },
      allowShort: true,
    },

  ],

};