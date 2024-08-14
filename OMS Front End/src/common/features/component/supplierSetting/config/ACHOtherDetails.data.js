import { FormFieldTypes } from "../../../../../data/formFieldType";


export const ACHOtherDetailsData = {
    // name: "Email From",
    initialState: {
        messageToRecipientBank: "",
        messageToRecipient: "",
    },
    formFields: [
        {
            id: "messageToRecipient",
            lable: "Message to recipient",
            Field_Name: "Message to recipient",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "messageToRecipient",
            fieldSetting: {
                placeholder: "Please Enter Message to recipient",
                isEnableOnChange: true,
                isMultiSelect: false,
                isDisabled: false,
            },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
            },
        },
        {
            id: "messageToRecipientBank",
            lable: "Message to recipient Bank",
            Field_Name: "Message to recipient Bank",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "messageToRecipientBank",
            fieldSetting: {
                placeholder: "Please Enter Message to recipient Bank",
                isEnableOnChange: true,
                maxLength: 75,
            },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
            },
        },
    ],
    formSetting: {
        isViewOnly: false,
    },
};