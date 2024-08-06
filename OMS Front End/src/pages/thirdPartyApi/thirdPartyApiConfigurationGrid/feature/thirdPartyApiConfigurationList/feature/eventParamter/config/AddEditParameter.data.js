import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditParameterData = {
    // name: "Email From"
    initialState: { apiEventParametersId: 0, parameterName: "", parameterType: "", defaultValue: "", isRequired: false },
    formFields: [
        {
            id: "parameterName",
            lable: "Parameter Name ",
            Field_Name: "Parameter Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "parameterName",
            fieldSetting: {
                placeholder: "Select Parameter Name",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "dataType",
            lable: "Data Type",
            Field_Name: "Data Type",
            fieldType: FormFieldTypes.SELECT,
            dataField: "dataType",
            fieldSetting: {
                placeholder: "Select Data Type",
                isEnableOnChange: true
            },

            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "defaultValue",
            lable: "Default Value",
            Field_Name: "Default Value",
            fieldType: FormFieldTypes.INPUT,
            dataField: "defaultValue",
            fieldSetting: {
                placeholder: "Enter Default Value",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "isRequired",
            lable: "Is Required",
            Field_Name: "Is Required",
            fieldType: FormFieldTypes.CHECKBOX,
            dataField: "isRequired",
            fieldSetting: {
                placeholder: "",
            },
            style: {
                containerCss:
                    "col-xxl-6 col-xl-6 col-md-6 col-6 col-6 mb-input margin-left0-checkbox mt-2",
            },
        },
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
            width: "35%",
            allowShort: true,
        },
        {
            name: "Data Type",
            fieldName: "dataType",
            width: "35%",
            allowShort: true,
        },
        {
            name: "Default Value ",
            fieldName: "defaultValue",
            width: "20%",
            allowShort: true,
        },
        {
            name: "Is Required",
            fieldName: "isRequired",
            width: "20%",
            colType: GridColumnType.CHECKBOX,
            colSettings: {
                allowCheckbox: true,
                allowDisable: true
            },
        },
        {
            name: "Action",
            width: "10%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDelete: true,
            },
        },
    ],

};