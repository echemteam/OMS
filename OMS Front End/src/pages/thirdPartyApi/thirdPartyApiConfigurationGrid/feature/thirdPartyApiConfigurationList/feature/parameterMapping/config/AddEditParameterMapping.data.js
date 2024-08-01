import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditParameterMappingData = {
    // name: "Email From"
    initialState: { parameterId: "" },
    formFields: [
        {
            id: "parameterId",
            lable: "Parameter ",
            Field_Name: "Parameter",
            fieldType: FormFieldTypes.SELECT,
            dataField: "parameterId",
            fieldSetting: {
                placeholder: "Select Parameter",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },

    ],
    formSetting: {
        isViewOnly: false
    }
};

export const AddEditParameterMappingConfigurationData = {
    columns: [
        {
            name: "Parameter",
            fieldName: "parameterName",
            width: "40%",
            allowShort: true,
        },
        {
            name: "DataType",
            fieldName: "dataType",
            width: "40%",
            allowShort: true,
        },
        {
            name: "Action",
            width: "20%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowDelete: true,
            },
        },
    ],

};