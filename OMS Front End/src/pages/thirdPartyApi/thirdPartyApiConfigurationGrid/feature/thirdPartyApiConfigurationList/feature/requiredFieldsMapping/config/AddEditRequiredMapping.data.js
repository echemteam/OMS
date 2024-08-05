import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditRequiredMappingData = {
    // name: "Email From"
    initialState: { apiEventRequiredFieldId: 0, apiResponseFieldName: "" },
    formFields: [
        {
            id: "apiEventRequiredFieldId",
            lable: "Api Event Required Field ",
            Field_Name: "Api Event Required Field",
            fieldType: FormFieldTypes.SELECT,
            dataField: "apiEventRequiredFieldId",
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
        {
            name: "Api Event Required Field",
            fieldName: "fieldName",
            width: "40%",
            allowShort: true,
        },
        {
            name: "API Response Field Name",
            fieldName: "apiResponseFieldName",
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