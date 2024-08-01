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
                maxLength: 20,
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