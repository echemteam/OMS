import { GridColumnType } from "../../../../../../data/gridColumnType";

export const thirdPartyListConfigurationData = {
    columns: [
        {
            name: "Event Name",
            fieldName: "eventName",
            width: "20%",
            allowShort: true,
        },
        {
            name: "Description",
            fieldName: "description",
            width: "60%",
            allowShort: true,
        },
        {
            name: "Action",
            width: "20%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowView: true,
                allowDelete: true,
            },
        },
    ],

};