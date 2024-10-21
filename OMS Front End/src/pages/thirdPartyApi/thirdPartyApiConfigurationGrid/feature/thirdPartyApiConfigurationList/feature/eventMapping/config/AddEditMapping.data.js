import { validationTypes } from "../../../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditMappingData = {
    // name: "Email From"
    initialState: { apiEventMappingId: 0, providerId: "", endpointId: "", description: "" },
    section: [
        {
            title: "Provider Mapping Information Section",
            row: {},
            style: {
                sectionStyle: "row mb-3",
            },
            fields: [
                {
                    id: "providerId",
                    label: "Provider ",
                    Field_Name: "Provider",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "providerId",
                    fieldSetting: {
                        placeholder: "Select Provider",
                        isEnableOnChange: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "endpointId",
                    label: "End point ",
                    Field_Name: "End point",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "endpointId",
                    fieldSetting: {
                        placeholder: "Select End point",
                        isEnableOnChange: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "description",
                    label: "Description",
                    Field_Name: "Description",
                    fieldType: FormFieldTypes.TEXTAREA,
                    dataField: "description",
                    fieldSetting: {
                        placeholder: "Please Enter Description",
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
                    },
                }
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};

export const AddEditMappingConfigurationData = {
    columns: [
        {
            name: "Provider",
            fieldName: "providerName",
            colStyle: {
                width: "30%",
            },
            allowShort: true,
        },
        {
            name: "Endpoint",
            fieldName: "endpointName",
            colStyle: {
                width: "20%",
            },
            allowShort: true,
        },
        {
            name: "Description",
            fieldName: "description",
            colStyle: {
                width: "30%",
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