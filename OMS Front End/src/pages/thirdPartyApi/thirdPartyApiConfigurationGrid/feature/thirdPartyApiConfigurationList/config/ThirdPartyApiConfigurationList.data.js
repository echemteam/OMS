import { AppIcons } from "../../../../../../data/appIcons";
import { GridColumnType } from "../../../../../../data/gridColumnType";

export const thirdPartyListConfigurationData = {
    columns: [
        {
            name: "Event Name",
            fieldName: "eventName",
            colStyle: {
                width: "20%",
            },
            allowShort: true,
        },
        {
            name: "Description",
            fieldName: "description",
            colStyle: {
                width: "60%",
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
                allowDelete: true,
            },
            customAction: [
                {
                    name: "TESTAPI",
                    iconName: AppIcons.TestApiIcon,
                    title: "Test Api"
                },
                {
                    name: "VIEWCONFIGURATION",
                    iconName: AppIcons.EyeIcon,
                    title: "View"
                },
            ],
        },
    ],

};