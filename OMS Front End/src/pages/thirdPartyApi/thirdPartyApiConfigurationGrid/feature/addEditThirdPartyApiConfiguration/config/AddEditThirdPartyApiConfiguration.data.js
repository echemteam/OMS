import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const AddEditThirdPartyApiData = {
    // name: "Email From"
    initialState: { apiEventId: 0, eventName: "", description: "" },
    formFields: [
        {
            id: "eventName",
            lable: "Event Name ",
            Field_Name: "Event Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "eventName",
            fieldSetting: {
                placeholder: "Enter Event Name",
                allowSpace: true,
                maxLength: 100,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "description",
            lable: "Description",
            Field_Name: "Description",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "description",
            fieldSetting: {
                placeholder: "Please Enter Description",
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};