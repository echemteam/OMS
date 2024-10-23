
import { FormFieldTypes } from "../../../../../../../data/formFieldType";

const initial = {
    catalogId: "",
    casNumber: "",
    chemicalName: "",
    mdlNumber: "",
    note: "",
    orderPriority: "",
    requestDate: "",
    promiseDate: "",
}

export const orderItemFormData = {
    name: "Order Item From",
    initialState: initial,
    formFields: [
        {
            id: "chemicalName",
            lable: "Chemical Name",
            Field_Name: "Chemical Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "chemicalName",
            fieldSetting: {
                placeholder: "Enter Chemical Name",
                allowSpace: true,
                maxLength: 1000,
                isDisable: false
            },
            style: {
                containerCss: "col-xxl-9 col-xl-9 col-md-9 mb-input",
            },
        },
        {
            id: "catalogId",
            lable: "Catalog",
            Field_Name: "Catalog",
            fieldType: FormFieldTypes.INPUT,
            dataField: "catalogId",
            fieldSetting: {
                placeholder: "Enter Catalog",
                maxLength: 15,
                allowSpace: false
            },
            style: {
                containerCss: "col-xxl-3 col-xl-3 col-md-3 mb-input",
            },
        },
        {
            id: "mdlNumber",
            lable: "MDL Number",
            Field_Name: "MDL Number",
            fieldType: FormFieldTypes.INPUT,
            dataField: "mdlNumber",
            fieldSetting: {
                placeholder: "Enter MDL Number",
                maxLength: 15,
                allowSpace: false
            },
            style: {
                containerCss: "col-xxl-5 col-xl-5 col-md-5 mb-input",
            },
        },
        {
            id: "casNumber",
            lable: "CAS Number",
            Field_Name: "CAS Number",
            fieldType: FormFieldTypes.INPUT,
            dataField: "casNumber",
            fieldSetting: {
                placeholder: "Enter CAS Number",
                maxLength: 15,
                allowSpace: false
            },
            style: {
                containerCss: "col-xxl-5 col-xl-5 col-md-5 mb-input",
            },
        },
        {
            id: "orderPriority",
            lable: "Order Priority",
            Field_Name: "Order Priority",
            fieldType: FormFieldTypes.SELECT,
            dataField: "orderPriority",
            fieldSetting: {
                placeholder: "Order Priority",
                isEnableOnChange: true,
                options: [
                    { value: "High", label: "High" },
                    { value: "Low", label: "Low" }
                ]
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-2 col-xl-2 col-md-2 col-12 mb-input",
            },
        },
        {
            id: "requestDate",
            lable: "Request Date",
            Field_Name: "Request Date",
            fieldType: FormFieldTypes.DATEPICKER,
            dataField: "requestDate",
            fieldSetting: {
                placeholder: "Enter Request Date",
                options: [],
            },
            style: { containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input" },
        },
        {
            id: "promiseDate",
            lable: "Promise Date",
            Field_Name: "Promise Date",
            fieldType: FormFieldTypes.DATEPICKER,
            dataField: "promiseDate",
            fieldSetting: {
                placeholder: "Enter Promise Date",
                options: [],
            },
            style: { containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input" },
        },
        {
            id: "note",
            lable: "Order Note",
            Field_Name: "Order Note",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "note",
            fieldSetting: {
                placeholder: "Enter Order Note",
                allowSpace: true,
                maxLength: 1000,
                isDisable: false
            },
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-input",
            },
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};
