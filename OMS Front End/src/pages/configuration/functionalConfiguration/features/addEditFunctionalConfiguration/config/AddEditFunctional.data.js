import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const AddEditFunctionalData = {
    // name: "Email From"
    initialState: { name: "" },
    formFields: [
        {
            id: "name",
            lable: "Name ",
            Field_Name: "name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "name",
            fieldSetting: {
                placeholder: "Enter name",
                allowSpace: true,
                maxLength: 100,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};