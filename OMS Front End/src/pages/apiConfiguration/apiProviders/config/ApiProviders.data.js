import { GridColumnType } from "../../../../data/gridColumnType";
import { FormFieldTypes } from "../../../../data/formFieldType";
import { validationTypes } from "../../../../components/FinalForms/libs/data/ValidationTypes";

export const addEditApiProviderFormData = {
    initialState: {
        name: "",
        baseURL: "",
        authenticationType: "",
    },
    section: [
        {
            title: "ApiProvider Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "name",
                    label: "Name ",
                    Field_Name: "Name",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "name",
                    fieldSetting: {
                        placeholder: "Enter Name",
                        allowSpace: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 mt-2",
                    },
                },
                {
                    id: "baseURL",
                    label: "Base URL ",
                    Field_Name: "Base URL",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "baseURL",
                    fieldSetting: {
                        placeholder: "Enter URL",
                        allowSpace: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
                    },
                },
                {
                    id: "authenticationType",
                    label: "Authentication ",
                    Field_Name: "AuthenticationType",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "authenticationType",
                    fieldSetting: {
                        placeholder: "Select Authentication Type",
                        isEnableOnChange: true
                    },

                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
                    },
                },
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }

}

export const ApiProvidersGridConfig = {
    columns: [

        {
            name: "Name",
            fieldName: "name",
            colStyle: {
                width: "20%",
            },
            allowShort: true,
        },
        {
            name: "Base URL",
            fieldName: "baseURL",
            colStyle: {
                width: "35%",
            },
            allowShort: true,
        },
        {
            name: "Authentication Type",
            fieldName: "authenticationType",
            colStyle: {
                width: "35%",
            },
            allowShort: true,
        },

        {
            name: "Action",
            colStyle: {
                width: "10%",
            },
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDelete: true,
            },
        },
    ],

};