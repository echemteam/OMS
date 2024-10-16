import { validationTypes } from "../../../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditParameterMappingData = {
    // name: "Email From"
    initialState: { eventParameterId: "", providerParameterId: "" },
    section: [
        {
            title: "Parameter Mapping Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "eventParameterId",
                    label: "Event Parameters",
                    Field_Name: "eventParameterId",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "eventParameterId",
                    fieldSetting: {
                        placeholder: "Select Event Parameters",
                        isEnableOnChange: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "providerParameterId",
                    label: "Provider Parameters",
                    Field_Name: "providerParameterId",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "providerParameterId",
                    fieldSetting: {
                        placeholder: "Select Provider Parameters",
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

export const AddEditParameterMappingConfigurationData = {
    columns: [
        {
            name: "Event Parameter",
            fieldName: "eventParameterName",
            colStyle: {
                width: "40%",
            },
            allowShort: true,
        },
        {
            name: "Provider Parameter",
            fieldName: "providerParameterName",
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