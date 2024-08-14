import { GridColumnType } from "../../../../../data/gridColumnType";
import { getLabelClass } from "../../../../../utils/StatusColors/StatusColors";

export const basicInfoData = {
    columns: [
        {
            name: "Name",
            fieldName: "name",
            colStyle: {
                width: "15%",
            },
            // allowShort: true,
        },
        {
            name: "Tax Id",
            fieldName: "taxId",
            colStyle: {
                width: "15%",
            },
            // allowShort: true,
        },
        {
            name: "Country",
            fieldName: "countryName",
            colStyle: {
                width: "15%",
            },
            // allowShort: true,
        },

        {
            name: "Email",
            fieldName: "emailAddress",
            colStyle: {
                width: "15%",
            },
            // allowShort: true,
        },
        {
            name: "Group Type",
            fieldName: "groupType",
            colStyle: {
                width: "15%",
            },
            // allowShort: true,
        },
        {
            name: "Status",
            fieldName: "status",
            allowShort: false,
            colType: GridColumnType.LABLE,
            colStyle: {
                width: "15%",
            },
            colSettings: {
                valueField: "status",
                getLableClass: getLabelClass,
            },
        },
        {
            name: "Action",
            colStyle: {
                width: "10%",
            },
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDisable: false,
            },
        },
    ],
};

export const OrderBasicInfoData = {
    columns: [
        {
            name: "Customer Name",
            fieldName: "customerName",
            colStyle: {
                width: "25%",
            },
            // allowShort: true,
        },
        {
            name: "Po Number",
            fieldName: "poNumber",
            colStyle: {
                width: "25%",
            },
            // allowShort: true,
        },
        {
            name: "Order Received Date",
            colStyle: {
                width: "25%",
            },
            fieldName: "orderReceivedDate",
            colType: GridColumnType.DATE,
            colSettings: {
              isUTC: true,
              format: "MM/DD/YYYY hh:mm A ",
            },
            // allowShort: true,
        },

        {
            name: "Action",
            colStyle: {
                width: "25%",
                textAlign: "center",
                justifyContent:"center"
            },
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDisable: false,
            },
        },
    ],
};