import { FormFieldTypes } from "../../../../../data/formFieldType";

export const SMTPSettingsData = {
    // name: "Email From",
    initialState: { smtpSettingId: 0, organizationId: 0, emailProvider: "", smtpServer: "", smtpPort: "", smtpUserName: "", smtpPassword: "", useSsl: true },
    formFields: [
        {
            id: "emailProvider",
            lable: "Email Provider  ",
            Field_Name: "Email Provider",
            fieldType: FormFieldTypes.INPUT,
            dataField: "emailProvider",
            fieldSetting: {
                placeholder: "Enter Email Provider",
                allowSpace: true,
                maxLength: 100,
            },
            validation: [{ type: "require" } , { type: "email" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "smtpServer",
            lable: "Server",
            Field_Name: "Server",
            fieldType: FormFieldTypes.INPUT,
            dataField: "smtpServer",
            fieldSetting: {
                placeholder: "Enter Server",
                allowSpace: true,
                maxLength: 255,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "smtpPort",
            lable: "Port",
            Field_Name: "Port",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "smtpPort",
            fieldSetting: {
                placeholder: "Enter Port",
                allowSpace: false,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "smtpUserName",
            lable: "User Name",
            Field_Name: "User Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "smtpUserName",
            fieldSetting: {
                placeholder: "Enter User Name",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "smtpPassword",
            lable: "Password ",
            Field_Name: "Password",
            fieldType: FormFieldTypes.PASSWORD,
            dataField: "smtpPassword",
            fieldSetting: {
                placeholder: "Enter Your Password",
            },
            validation: [{ type: "require" }, { type: "password" }],
            style: {
                containerCss: "col-md-6 mb-input",
            },
        },
        {
            id: "useSsl",
            lable: "UseSSL",
            Field_Name: "useSsl",
            fieldType: FormFieldTypes.CHECKBOX,
            dataField: "useSsl",
            // fieldSetting: {
            //   placeholder: "",
            // },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-4 col-xl-4 col-md-12 col-12 col-12 mt-4",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};
