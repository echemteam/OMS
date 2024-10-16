import { validationTypes } from "../../../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditRequireParameterData = {
    // name: "Email From"
    initialState: { apiEventRequiredFieldId: 0, fieldName: "", fieldType: "", fieldDescription: "" },
    section: [
        {
            title: "User Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "fieldName",
                    label: "Field Name ",
                    Field_Name: "Field Name",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "fieldName",
                    fieldSetting: {
                        placeholder: "Select Field Name",
                        isEnableOnChange: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "fieldType",
                    label: "Field Type ",
                    Field_Name: "Field Type",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "fieldType",
                    fieldSetting: {
                        placeholder: "Select Field Type",
                        isEnableOnChange: true
                    },

                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
                    },
                },

                {
                    id: "fieldDescription",
                    label: "Field Description",
                    Field_Name: "Field Description",
                    fieldType: FormFieldTypes.TEXTAREA,
                    dataField: "fieldDescription",
                    fieldSetting: {
                        placeholder: "Please Enter Field Description",
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
};

export const AddEditRequireConfigurationData = {
    columns: [
        {
            name: "Field Name",
            fieldName: "fieldName",
            colStyle: {
                width: "20%",
            },
            allowShort: true,
        },
        {
            name: "Field Type",
            fieldName: "fieldType",
            colStyle: {
                width: "20%",
            },
            allowShort: true,
        },
        {
            name: "Field Description",
            fieldName: "fieldDescription",
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
                allowEdit: true,
                allowDelete: true,
            },
        },
    ],

};