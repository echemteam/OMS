import { GridColumnType } from "../../../../../../data/gridColumnType";

export const functionalConfigurationListData = {
    columns: [
        {
            name: "Module Name",
            fieldName: "moduleName",
            colStyle: {
                width: "40%",
            },
            allowShort: true,
        },
        {
            name: "Functionality Name",
            fieldName: "functionalityName",
            colStyle: {
                width: "40%",
            },
            allowShort: true,
        },
        {
            name: "Action",
            colStyle: {
                width: "20%",
            },
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: false,
            },
            customAction: [
                {
                    name: "VIEWCONFIGURATION",
                    iconName: "lets-icons:view",
                    title: "View",
                    className: "view-icon"
                },
            ],
        },
    ],

};