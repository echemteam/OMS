import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initState = {
    beneficiaryName: "",
    checkingAccountNumber: "",
    routingAccountNumber: "",
    swiftCode: "",
    bankAddress: "",
    bankBranch: ""
};


export const OrganizationBankFormData = {

    initialState: initState,
    section: [
        {
            title: "User Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "beneficiaryName",
                    label: "Beneficiary Name ",
                    Field_Name: "Beneficiary Name",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "beneficiaryName",
                    fieldSetting: {
                        placeholder: "Enter Beneficiary Name",
                        allowSpace: true,
                        maxLength: 255,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
                    },
                },
                {
                    id: "checkingAccountNumber",
                    label: "Checking Account Number ",
                    Field_Name: "Checking Account Number",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "checkingAccountNumber",
                    fieldSetting: {
                        placeholder: "Enter Checking Account Number",
                        allowSpace: true,
                        maxLength: 34,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "routingAccountNumber",
                    label: "Routing Account Number ",
                    Field_Name: "Routing Account Number",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "routingAccountNumber",
                    fieldSetting: {
                        placeholder: "Enter Routing Account Number",
                        allowSpace: true,
                        maxLength: 9,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "swiftCode",
                    label: "Swift Code ",
                    Field_Name: "Swift Code",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "swiftCode",
                    fieldSetting: {
                        placeholder: "Enter Swift Code",
                        allowSpace: true,
                        maxLength: 11,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "bankBranch",
                    label: "Bank Branch",
                    Field_Name: "Bank Branch",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "bankBranch",
                    fieldSetting: {
                        placeholder: "Enter Bank Branch",
                        allowSpace: true,
                        maxLength: 100,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "bankAddress",
                    label: "Bank Address ",
                    Field_Name: "Bank Address",
                    fieldType: FormFieldTypes.TEXTAREA,
                    dataField: "bankAddress",
                    fieldSetting: {
                        placeholder: "Enter Bank Address",
                        allowSpace: true,
                        maxLength: 35,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};
