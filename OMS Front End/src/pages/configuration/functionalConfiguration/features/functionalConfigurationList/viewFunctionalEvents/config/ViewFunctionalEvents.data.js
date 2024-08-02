import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const viewFunctionalEventsData = {
    columns: [
        {
            name: "functionality Name",
            fieldName: "functionalityName",
            width: "20%",
            allowShort: true,
        },
        {
            name: "event Name",
            fieldName: "eventName",
            width: "20%",
            allowShort: true,
        },
        {
            name: "create data",
            width: "20%",
            fieldName: "createdAt",
            colType: GridColumnType.DATE,
            colSettings: {
              isUTC: true,
              format: "MM/DD/YYYY hh:mm A ",
            },
          },
        {
            name: "event Date",
            width: "20%",
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
            width: "20%",
            allowShort: true,
        },
        {
            name: "description",
            fieldName: "description",
            width: "40%",
            allowShort: true,
        },
        
    ],

};