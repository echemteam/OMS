import { validationTypes } from "../../../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditRequiredMappingData = {
    // name: "Email From"
    initialState: { apiEventRequiredFieldId: 0, apiResponseFieldName: "" },
    section: [
        {
            title: "User Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "apiEventRequiredFieldId",
                    label: "Api Event Required Field ",
                    Field_Name: "Api Event Required Field",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "apiEventRequiredFieldId",
                    fieldSetting: {
                        placeholder: "Select Api Event Required Field",
                        isEnableOnChange: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "apiResponseFieldName",
                    label: "Api Response FieldName ",
                    Field_Name: "Api Response FieldName",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "apiResponseFieldName",
                    fieldSetting: {
                        placeholder: "Select Api Response Field Name",
                        isEnableOnChange: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
            ]
        }
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
            colStyle: {
                width: "40%",
            },
            allowShort: true,
        },
        {
            name: "API Response Field Name",
            fieldName: "apiResponseFieldName",
            colStyle: {
                width: "40%",
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
        },
    ],

};