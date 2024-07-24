import { GridColumnType } from "../../../../../../data/gridColumnType";

export const thirdPartyListConfigurationData = {
    columns: [
        {
            name: "Provider Name",
            fieldName: "providerName",
            width: "15%",
            allowShort: true,
        },
        {
            name: "AuthKey",
            fieldName: "authKey",
            width: "15%",
            allowShort: true,
        },
        {
            name: "ClientId",
            fieldName: "clientId",
            width: "25%",
            allowShort: true,
        },
        {
            name: "Client Secret",
            fieldName: "clientSecret",
            width: "15%",
            allowShort: true,
        },
        {
            name: "Token Endpoint",
            fieldName: "tokenEndpoint",
            width: "20%",
            allowShort: true,
        },
        {
            name: "Token Expires",
            fieldName: "tokenExpires",
            width: "20%",
            colType: GridColumnType.DATE,
            allowShort: true,
            colSettings: {
                format: "DD/MM/YYYY",
            },
        },
        {
            name: "Action",
            width: "10%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDelete: true,
                allowView : true
            },
        },
    ],

};