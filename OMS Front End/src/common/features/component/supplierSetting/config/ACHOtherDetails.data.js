import { FormFieldTypes } from "../../../../../data/formFieldType";


export const ACHOtherDetailsData = {
    initialState: {
        messageToRecipientBank: "",
        messageToRecipient: "",
    },
    section: [
        {
            title: "ACH Other Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "messageToRecipient",
                    label: "Message to recipient",
                    Field_Name: "Message to recipient",
                    fieldType: FormFieldTypes.TEXTAREA,
                    dataField: "messageToRecipient",
                    fieldSetting: {
                        placeholder: "Please Enter Message to recipient",
                        isEnableOnChange: true,
                        isMultiSelect: false,
                        isDisabled: false,
                    },
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
                    },
                },
                {
                    id: "messageToRecipientBank",
                    label: "Message to recipient Bank",
                    Field_Name: "Message to recipient Bank",
                    fieldType: FormFieldTypes.TEXTAREA,
                    dataField: "messageToRecipientBank",
                    fieldSetting: {
                        placeholder: "Please Enter Message to recipient Bank",
                        isEnableOnChange: true,
                        maxLength: 75,
                    },
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
                    },
                },
            ]
        }
    ],
    formSetting: {
        isViewOnly: false,
    },
};