import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationProfileManagementdata = {
    // name: "Email From"
    initialState: { registeredName:"" , dBAName: "", dateIncorporated:"", nAICSCode: "", eIN: "", tXTaxpayerNumber: "", sOSFileNumber: "", webFileNumber: "",tWCTaxAccountNumber:""},
    formFields: [
        {
            id: "registeredName",
            lable: "Registered Name ",
            Field_Name: "Registered Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "registeredName",
            fieldSetting: {
                placeholder: "Enter Registered Name",
                allowSpace: true,
                maxLength: 255,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        // {
        //     id: "logo",
        //     lable: "Logo ",
        //     Field_Name: "Logo",
        //     fieldType: FormFieldTypes.IMAGE,
        //     dataField: "logo",
        //     fieldSetting: {
        //         placeholder: "Upload Attachment",
        //         isImageUpload: true,
        //         isButtonVisible: true,
        //         isCustomButtonVisible: false,
        //         acceptedFiles: '.png ',
        //     },
        //     validation: [{ type: "require" }],
        //     style: {
        //         containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 custom-file-upload-section",
        //     },
        // },
        {
            id: "dBAName",
            lable: "DBA Name ",
            Field_Name: "DBA Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "dBAName",
            fieldSetting: {
                placeholder: "Enter DBA Name",
                allowSpace: true,
                maxLength: 255,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "dateIncorporated",
            lable: "Date Incorporated ",
            Field_Name: "Date Incorporated",
            fieldType: FormFieldTypes.DATEPICKER,
            dataField: "dateIncorporated",
            fieldSetting: {
                placeholder: "Select Date Incorporated",
                allowSpace: true,
            },
             validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "nAICSCode",
            lable: "NAICS Code ",
            Field_Name: "NAICS Code",
            fieldType: FormFieldTypes.INPUT,
            dataField: "nAICSCode",
            fieldSetting: {
                placeholder: "Select NAICS Code",
                allowSpace: true,
                maxLength:6
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "eIN",
            lable: "EIN ",
            Field_Name: "EIN",
            fieldType: FormFieldTypes.INPUT,
            dataField: "eIN",
            fieldSetting: {
                placeholder: "Select EIN",
                allowSpace: true,
                maxLength: 9,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "tXTaxpayerNumber",
            lable: "TXTaxpayer Number ",
            Field_Name: "TXTaxpayer Number",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "tXTaxpayerNumber",
            fieldSetting: {
                placeholder: "Select TXTaxpayer Number",
                allowSpace: true,
                maxLength:20,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "sOSFileNumber",
            lable: "SOS File Number ",
            Field_Name: "SOS File Number",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "sOSFileNumber",
            fieldSetting: {
                placeholder: "Enter SOS File Number",
                allowSpace: true,
                maxLength:20,
             },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "webFileNumber",
            lable: "Web File Number ",
            Field_Name: "Web File Number",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "webFileNumber",
            fieldSetting: {
                placeholder: "Enter Web File Number",
                allowSpace: true,
                maxLength:20,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "tWCTaxAccountNumber",
            lable: "TWC Tax Account Number ",
            Field_Name: "TWC Tax Account Number",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "tWCTaxAccountNumber",
            fieldSetting: {
                placeholder: "Enter TWC Tax Account Number",
                allowSpace: true,
                maxLength:20,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};
