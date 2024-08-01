import { GridColumnType } from "../../../../../../data/gridColumnType";

export const functionalConfigurationListData = {
    columns: [
        {
            name: "Module Name",
            fieldName: "moduleName",
            width: "40%",
            allowShort: true,
        },
        {
            name: "Functionality Name",
            fieldName: "functionalityName",
            width: "40%",
            allowShort: true,
        },
        {
            name: "Action",
            width: "20%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowView: true,
            },
        },
    ],

};