import { validationTypes } from "../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../data/formFieldType";

const intial = {
    orderMethodId: 0,
    orderReceivedDate: "",
    referenceNumber: "",
    poNumber: ""
}

export const orderDetailsData = {
    initialState: intial,
    section: [
        {
            title: "Order Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "poNumber",
                    label: "PO Number ",
                    Field_Name: "PO Number",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "poNumber",
                    fieldSetting: {
                        placeholder: "Enter PO Number",
                        allowSpace: true,
                        maxLength: 50,
                        exemptBoundarySpaces: true
                    },
                    validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.UNIQUENAME }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
                    }
                },
                {
                    id: "orderMethodId",
                    label: "Order Method ",
                    Field_Name: "Order Method",
                    fieldType: FormFieldTypes.SELECT,
                    dataField: "orderMethodId",
                    fieldSetting: {
                        isDisabled: false,
                        placeholder: "Select Order Method",
                        isEnableOnChange: true
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input label-name-small",
                    },
                },
                {
                    id: "referenceNumber",
                    label: "Reference Number",
                    Field_Name: "Reference Number",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "referenceNumber",
                    fieldSetting: {
                        placeholder: "Enter Reference Number",
                        allowSpace: true,
                        maxLength: 35,
                    },
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
                    },
                },
                {
                    id: "orderReceivedDate",
                    label: "Order Received Date :",
                    Field_Name: "Order Received Date",
                    fieldType: FormFieldTypes.DATEPICKER,
                    dataField: "orderReceivedDate",
                    fieldSetting: {
                        placeholder: "Enter Order Received Date",
                        options: [],
                    },
                    validation: [{ type: "require" }, { type: "text" }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12",
                    },
                },
            ]
        }
    ]
};
