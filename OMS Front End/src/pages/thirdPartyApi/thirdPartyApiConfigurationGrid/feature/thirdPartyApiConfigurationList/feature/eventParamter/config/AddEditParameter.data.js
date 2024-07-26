import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditParameterData = {
    // name: "Email From"
    initialState: { apiEventParametersId: 0, parameterName: "", parameterType: "" },
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
            id: "parameterType",
            lable: "Parameter Type ",
            Field_Name: "Parameter Type",
            fieldType: FormFieldTypes.SELECT,
            dataField: "parameterType",
            fieldSetting: {
                placeholder: "Select Parameter Type",
                isEnableOnChange: true
            },
            
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
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
            name: "Parameter Type",
            fieldName: "parameterType",
            width: "35%",
            allowShort: true,
        },

        {
            name: "Action",
            width: "30%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDelete: true,
            },
        },
    ],

};