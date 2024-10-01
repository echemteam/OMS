import { FormFieldTypes } from "../../../../../data/formFieldType";
import { EmailProviders } from "../../../../../utils/Enums/commonEnums";


export const SMTPSettingsFormData = {
    // name: "Email From",
    initialState: { smtpSettingId: 0, organizationId: 0, emailProvider: "", smtpServer: "", smtpPort: "", smtpUserName: "", smtpPassword: "", useSsl: true ,clientId:"",clientSecret:"",tenantId:""},
    formFields: [
        {
            id: "emailProvider",
            lable: "Email Provider  ",
            Field_Name: "Email Provider ",
            fieldType: FormFieldTypes.SELECT,
            dataField: "emailProvider",
            fieldSetting: {
              placeholder: "Select Email Provider ",
              isEnableOnChange: true,
              isDisabled: false,
            },
            validation: [{ type: "require" }],
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
                maxLength: 5,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "smtpUserName",
            lable: "Email",
            Field_Name: "Email",
            fieldType: FormFieldTypes.INPUT,
            dataField: "smtpUserName",
            fieldSetting: {
                placeholder: "Enter Email",
                allowSpace: true,
                maxLength:65,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "smtpPassword",
            lable: "App Password ",
            Field_Name: "App Password",
            fieldType: FormFieldTypes.PASSWORD,
            dataField: "smtpPassword",
            fieldSetting: {
                placeholder: "Enter Your App Password",
                maxLength:20,
            },
            validation: [{ type: "require" }, { type: "password" }],
            style: {
                containerCss: "col-md-6 mb-input",
            },
        },
      
        {
            id: "clientId",
            lable: "Client Id",
            Field_Name: "Client Id",
            fieldType: FormFieldTypes.INPUT,
            dataField: "clientId",
            fieldSetting: {
                placeholder: "Enter Client Id",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        }, 
        {
            id: "clientSecret",
            lable: "Client Secret",
            Field_Name: "Client Secret",
            fieldType: FormFieldTypes.INPUT,
            dataField: "clientSecret",
            fieldSetting: {
                placeholder: "Enter Client Secret",
                allowSpace: true,
        
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "tenantId",
            lable: "Tenant Id",
            Field_Name: "Tenant Id",
            fieldType: FormFieldTypes.INPUT,
            dataField: "tenantId",
            fieldSetting: {
                placeholder: "Enter Tenant Id",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
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
