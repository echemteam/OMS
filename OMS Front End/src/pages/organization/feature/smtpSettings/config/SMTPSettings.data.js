import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initialState = {
    smtpSettingId: 0,
    organizationId: 0,
    emailProvider: "",
    smtpServer: "",
    smtpPort: "",
    smtpUserName: "",
    smtpPassword: "",
    useSsl: true,
    clientId: "",
    clientSecret: "",
    tenantId: ""
}

export const SMTPSettingsFormData = {
    // name: "Email From",
    initialState: initialState,
    section: [
        {
            title: "SMTP Settings Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "emailProvider",
                    label: "Email Provider  ",
                    Field_Name: "Email Provider ",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "emailProvider",
                    fieldSetting: {
                        placeholder: "Select Email Provider ",
                        isEnableOnChange: true,
                        isDisabled: false,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "smtpServer",
                    label: "Server",
                    Field_Name: "Server",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "smtpServer",
                    fieldSetting: {
                        placeholder: "Enter Server",
                        allowSpace: true,
                        maxLength: 255,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "smtpPort",
                    label: "Port",
                    Field_Name: "Port",
                    fieldType: FormFieldTypes.NUMERIC,
                    dataField: "smtpPort",
                    fieldSetting: {
                        placeholder: "Enter Port",
                        allowSpace: false,
                        maxLength: 5,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "smtpUserName",
                    label: "Email",
                    Field_Name: "Email",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "smtpUserName",
                    fieldSetting: {
                        placeholder: "Enter Email",
                        allowSpace: true,
                        maxLength: 65,
                    },
                    validation: [{ type: "require" }, { type: "email" }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "smtpPassword",
                    label: "App Password ",
                    Field_Name: "App Password",
                    fieldType: FormFieldTypes.PASSWORD,
                    dataField: "smtpPassword",
                    fieldSetting: {
                        placeholder: "Enter Your App Password",
                        maxLength: 20,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-input",
                    },
                },

                {
                    id: "clientId",
                    label: "Client Id",
                    Field_Name: "Client Id",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "clientId",
                    fieldSetting: {
                        placeholder: "Enter Client Id",
                        allowSpace: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "clientSecret",
                    label: "Client Secret",
                    Field_Name: "Client Secret",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "clientSecret",
                    fieldSetting: {
                        placeholder: "Enter Client Secret",
                        allowSpace: true,

                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "tenantId",
                    label: "Tenant Id",
                    Field_Name: "Tenant Id",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "tenantId",
                    fieldSetting: {
                        placeholder: "Enter Tenant Id",
                        allowSpace: true,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "useSsl",
                    label: "UseSSL",
                    Field_Name: "useSsl",
                    fieldType: FormFieldTypes.CHECKBOX,
                    dataField: "useSsl",
                    style: {
                        containerCss: "col-xxl-4 col-xl-4 col-md-12 col-12 col-12 mt-4",
                    },
                },
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};

export const SMTPTestInitialState = {
    emailTo: "",
    subject: "SMTP Configuration Test Successful",
    body: "<p>Dear Team,&nbsp;</p><p>This confirms that the SMTP configuration has been successfully validated. The outbound email settings are functioning as expected.&nbsp; </p><p><strong>Note:</strong> Please note that there is no need to reply to this message.</p>"
}

export const TestEmailConfig = {
    name: "Test Email",
    initialState: SMTPTestInitialState,
    section: [
        {
            title: "SMTP Configuration Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "emailTo",
                    label: "Email To",
                    Field_Name: "Email To",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "emailTo",
                    fieldSetting: {
                        placeholder: "Enter Email To",
                        allowSpace: false,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mt-3",
                    },
                },
                {
                    id: "subject",
                    label: "Subject",
                    Field_Name: "Subject",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "subject",
                    fieldSetting: {
                        placeholder: "Enter Subject",
                        allowSpace: false,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mt-3",
                    },
                },
                {
                    id: "body",
                    label: "Body",
                    Field_Name: "Body",
                    fieldType: FormFieldTypes.TEXTEDITOR,
                    dataField: "body",
                    fieldSetting: {
                        placeholder: "Enter Body",
                        allowSpace: false,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-12 mb-3 mt-3",
                    },
                }
            ]
        }
    ]
};
