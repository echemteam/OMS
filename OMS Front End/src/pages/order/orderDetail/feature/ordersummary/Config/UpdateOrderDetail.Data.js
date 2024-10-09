import { FormFieldTypes } from "../../../../../../data/formFieldType";

const intial = {
    orderMethodId: 0,
    orderReceivedDate: "",
    referenceNumber: "",
    poNumber: ""
}

export const orderDetailsData = {
    initialState: intial,
    formFields: [
        {
            id: "poNumber",
            lable: "PO Number ",
            Field_Name: "PO Number",
            fieldType: FormFieldTypes.INPUT,
            dataField: "poNumber",
            fieldSetting: {
                placeholder: "Enter PO Number",
                allowSpace: true,
                maxLength: 50,
                exemptBoundarySpaces: true
            },
            validation: [{ type: "require" }, { type: "uniqueName" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
            },
            inputButtonGroupConfig: {
                isPrimaryButtonVisible: false,
                primaryButtonText: 'Verify',
                infoButtonConfig: {
                    isInfoButtonVisible: false,
                    infoButtonIcon: "fa-search",
                    infoButtonTooltip: "PO Number"
                }
            }
        },
        {
            id: "orderMethodId",
            lable: "Order Method ",
            Field_Name: "Order Method",
            fieldType: FormFieldTypes.SELECT,
            dataField: "orderMethodId",
            fieldSetting: {
                isDisabled: false,
                placeholder: "Select Order Method",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input label-name-small",
            },
        },
        {
            id: "referenceNumber",
            lable: "Reference Number",
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
            lable: "Order Received Date :",
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
    ],
};
