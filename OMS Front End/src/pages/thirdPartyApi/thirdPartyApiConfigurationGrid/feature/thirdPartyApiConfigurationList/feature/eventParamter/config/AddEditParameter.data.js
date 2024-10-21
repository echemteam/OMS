import { validationTypes } from "../../../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditParameterData = {
    // name: "Email From"
    initialState: { apiEventParametersId: 0, parameterName: "", parameterType: "", defaultValue: "", isRequired: false },
    section: [
        {
            title: "Parameter Mappping Information Section",
            row: {},
            style: {
                sectionStyle: "row mb-3",
            },
            fields: [
                {
                    id: "parameterName",
                    label: "Parameter Name ",
                    Field_Name: "Parameter Name",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "parameterName",
                    fieldSetting: {
                        placeholder: "Select Parameter Name",
                        isEnableOnChange: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "dataType",
                    label: "Data Type",
                    Field_Name: "Data Type",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "dataType",
                    fieldSetting: {
                        placeholder: "Select Data Type",
                        isEnableOnChange: true
                    },

                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
                    },
                },
                {
                    id: "defaultValue",
                    label: "Default Value",
                    Field_Name: "Default Value",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "defaultValue",
                    fieldSetting: {
                        placeholder: "Enter Default Value",
                        allowSpace: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
                    },
                },
                {
                    id: "isRequired",
                    label: "Is Required",
                    Field_Name: "Is Required",
                    fieldType: FormFieldTypes.CHECKBOX,
                    dataField: "isRequired",
                    fieldSetting: {
                        placeholder: "",
                    },
                    style: {
                        containerCss:
                            "col-xxl-6 col-xl-6 col-md-6 col-6 col-6 mb-input margin-left-checkbox mt-3",
                    },
                },
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};

export const AddEditParameterConfigurationData = {
    columns: [
        {
            name: "Parameter Name",
            fieldName: "parameterName",
            colStyle: {
                width: "35%",
            },
            allowShort: true,
        },
        {
            name: "Data Type",
            fieldName: "dataType",
            colStyle: {
                width: "35%",
            },
            allowShort: true,
        },
        {
            name: "Default Value ",
            fieldName: "defaultValue",
            colStyle: {
                width: "20%",
            },
            allowShort: true,
        },
        {
            name: "Is Required",
            fieldName: "isRequired",
            colStyle: {
                width: "20%",
            },
            colType: GridColumnType.CHECKBOX,
            colSettings: {
                allowCheckbox: true,
                allowDisable: true
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
                allowDelete: true,
            },
        },
    ],

};