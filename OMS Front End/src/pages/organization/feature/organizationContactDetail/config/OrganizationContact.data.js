import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initState = {
    companyWebsite: "",
    salesEmail: "",
    accountsEmail: "",
    purchaseEmail: "",
    customerServiceEmail: "",
    salesPhone: "",
    accountsPhone: "",
    tollFreePhone: ""
};

export const OrganizationContactFormData = {
    initialState: initState,
    section: [
        {
            title: "Organization Contact Section",
            row: {},
            style: {
                sectionStyle: "row mb-3",
            },
            fields: [
                {
                    id: "companyWebsite",
                    label: "Company Website ",
                    Field_Name: "Company Website",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "companyWebsite",
                    fieldSetting: {
                        placeholder: "Enter Company Website",
                        allowSpace: true,
                        maxLength: 255,
                    },
                    validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.WEBSITE }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
                    },
                },
                {
                    id: "salesEmail",
                    label: "Sales Email ",
                    Field_Name: "Sales Email",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "salesEmail",
                    fieldSetting: {
                        placeholder: "Enter Sales Email",
                        allowSpace: true,
                        maxLength: 65,
                    },
                    validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.EMAIL }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "accountsEmail",
                    label: "Accounts Email ",
                    Field_Name: "Accounts Email",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "accountsEmail",
                    fieldSetting: {
                        placeholder: "Enter Accounts Email",
                        allowSpace: true,
                        maxLength: 65,
                    },
                    validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.EMAIL }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "purchaseEmail",
                    label: "Purchase Email ",
                    Field_Name: "Purchase Email",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "purchaseEmail",
                    fieldSetting: {
                        placeholder: "Enter Purchase Email",
                        allowSpace: true,
                        maxLength: 65,
                    },
                    validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.EMAIL }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "customerServiceEmail",
                    label: "Customer Service Email ",
                    Field_Name: "Customer Service Email",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "customerServiceEmail",
                    fieldSetting: {
                        placeholder: "Enter Customer Service Email",
                        allowSpace: true,
                        maxLength: 65,
                    },
                    validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.EMAIL }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "salesPhone",
                    label: "Sales Phone ",
                    Field_Name: "Sales Phone",
                    fieldType: FormFieldTypes.NUMERIC,
                    dataField: "salesPhone",
                    fieldSetting: {
                        placeholder: "Enter Sales Phone",
                        defaultCountry: "us",
                        allowSpace: true
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "accountsPhone",
                    label: "Accounts Phone ",
                    Field_Name: "Accounts Phone",
                    fieldType: FormFieldTypes.NUMERIC,
                    dataField: "accountsPhone",
                    fieldSetting: {
                        placeholder: "Enter Accounts Phone",
                        defaultCountry: "us",
                        allowSpace: true
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "tollFreePhone",
                    label: "TollFree Phone ",
                    Field_Name: "TollFree Phone",
                    fieldType: FormFieldTypes.NUMERIC,
                    dataField: "tollFreePhone",
                    fieldSetting: {
                        placeholder: "Enter TollFree Phone",
                        allowSpace: true,
                        defaultCountry: "us"
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
            ]
        }
    ],
    formFields: [


    ],
    formSetting: {
        isViewOnly: false
    }
};
