import { GridColumnType } from "../../../../../data/gridColumnType";
import { getLabelClass } from "../../../../../utils/StatusColors/StatusColors";

export const basicInfoData = {
    columns: [
        {
            name: "Name",
            fieldName: "name",
            width: "15%",
            // allowShort: true,
        },
        {
            name: "Tax Id",
            fieldName: "taxId",
            width: "15%",
            // allowShort: true,
        },
        {
            name: "Country",
            fieldName: "countryName",
            width: "15%",
            // allowShort: true,
        },

        {
            name: "Email",
            fieldName: "emailAddress",
            width: "15%",
            // allowShort: true,
        },
        {
            name: "Group Type",
            fieldName: "groupType",
            width: "15%",
            // allowShort: true,
        },
        {
            name: "Status",
            fieldName: "status",
            allowShort: false,
            colType: GridColumnType.LABLE,
            width: "15%",
            colSettings: {
                valueField: "status",
                getLableClass: getLabelClass,
            },
        },
        {
            name: "Action",
            width: "10%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDisable: false,
            },
        },
    ],
};
