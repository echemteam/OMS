import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initState = {
    fedExAccount: "",
    dHLAccount: "",
    uPSAccount: "",
    uSPSAccount: ""
};


export const OrganizationLogisticFormData = {
    initialState: initState,
    section: [
        {
            title: "Organization Logistic Section",
            row: {},
            style: {
                sectionStyle: "row mb-3",
            },
            fields: [
                {
                    id: "fedExAccount",
                    label: "FedEx Account ",
                    Field_Name: "FedEx Account",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "fedExAccount",
                    fieldSetting: {
                        placeholder: "Enter FedEx Account",
                        allowSpace: true,
                        maxLength: 9,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
                    },
                },
                {
                    id: "dHLAccount",
                    label: "DHL Account ",
                    Field_Name: "DHL Account",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "dHLAccount",
                    fieldSetting: {
                        placeholder: "Enter DHL Account",
                        allowSpace: true,
                        maxLength: 9,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "uPSAccount",
                    label: "UPS Account ",
                    Field_Name: "UPS Account",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "uPSAccount",
                    fieldSetting: {
                        placeholder: "Enter UPS Account",
                        allowSpace: true,
                        maxLength: 6,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-md-6 mb-3 mb-input relative",
                    },
                },
                {
                    id: "uSPSAccount",
                    label: "USPS Account ",
                    Field_Name: "USPS Account",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "uSPSAccount",
                    fieldSetting: {
                        placeholder: "Enter USPS Account",
                        allowSpace: true,
                        maxLength: 9,
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
