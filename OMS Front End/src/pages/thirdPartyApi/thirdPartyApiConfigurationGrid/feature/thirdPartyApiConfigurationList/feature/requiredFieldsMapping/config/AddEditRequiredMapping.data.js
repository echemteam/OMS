import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditRequiredMappingData = {
    // name: "Email From"
    initialState: { mappingId: 0, apiEventRequiredFieldsMappingId: "", requiredField: "", endpointId: "" , apiResponseFieldName:""},
    formFields: [
        {
            id: "apiEventRequiredFieldsMappingId",
            lable: "Api Event Required Field ",
            Field_Name: "Api Event Required Field",
            fieldType: FormFieldTypes.SELECT,
            dataField: "apiEventRequiredFieldsMappingId",
            fieldSetting: {
                placeholder: "Select Api Event Required Field",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "requiredField",
            lable: "Required Field ",
            Field_Name: "Required Field",
            fieldType: FormFieldTypes.INPUT,
            dataField: "requiredField",
            fieldSetting: {
                placeholder: "Select Required Field",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "endpointId",
            lable: "End point ",
            Field_Name: "End point",
            fieldType: FormFieldTypes.SELECT,
            dataField: "endpointId",
            fieldSetting: {
                placeholder: "Select End point",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "apiResponseFieldName",
            lable: "Api Response FieldName ",
            Field_Name: "Api Response FieldName",
            fieldType: FormFieldTypes.INPUT,
            dataField: "apiResponseFieldName",
            fieldSetting: {
                placeholder: "Select Api Response Field Name",
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

export const AddEditRequiredMappingConfigurationData = {
    columns: [
        // {
        //     name: "Api Event Required Field",
        //     fieldName: "providerName",
        //     width: "20%",
        //     allowShort: true,
        // },
        {
            name: "RequiredField",
            fieldName: "requiredField",
            width: "40%",
            allowShort: true,
        },
        // {
        //     name: "Endpoint",
        //     fieldName: "endpointName",
        //     width: "20%",
        //     allowShort: true,
        // },
        {
            name: "API Response Field Name",
            fieldName: "apiResponseFieldName",
            width: "40%",
            allowShort: true,
        },
        {
            name: "Action",
            width: "10%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowDelete: true,
            },
        },
    ],

};