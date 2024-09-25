import { FormFieldTypes } from "../../../../../data/formFieldType";

export const cloneContactFormData = {
    name: "Contact",
    initialState: {
        contactTypeId: ""
    },
    formFields: [
        {
            id: "contactTypeId",
            lable: "Contact Type ",
            Field_Name: "Contact Type",
            fieldType: FormFieldTypes.SELECT,
            dataField: "contactTypeId",
            fieldSetting: {
                placeholder: "Select Contact Type",
                isMultiSelect: true,
                isDisabled: false,
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-8 col-xl-8 col-md-12 col-12 col-12 mb-input",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};