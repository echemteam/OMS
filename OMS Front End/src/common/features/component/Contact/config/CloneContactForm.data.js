import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

export const cloneContactFormData = {
    name: "Contact",
    initialState: {
        contactTypeId: ""
    },
    section: [
        {
            title: "Clone Contac Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "contactTypeId",
                    label: "Contact Type ",
                    Field_Name: "Contact Type",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "contactTypeId",
                    fieldSetting: {
                        placeholder: "Select Contact Type",
                        isMultiSelect: true,
                        isDisabled: false,
                        isEnableOnChange: true
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-8 col-xl-8 col-md-12 col-12 col-12 mb-input",
                    },
                },
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};