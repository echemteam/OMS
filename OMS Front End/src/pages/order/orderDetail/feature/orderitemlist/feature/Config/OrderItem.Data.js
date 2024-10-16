
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
    section: [
        {
            title: "Order Item Information Section",
            row: {},
            style: {
                sectionStyle: "col-lg-12 row mb-3",
            },
            fields: [
                {
                    id: "chemicalName",
                    label: "Chemical Name",
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
                        containerCss: "col-xxl-9 col-xl-9 col-md-12 mb-input",
                    },
                },
                {
                    id: "catalogId",
                    label: "Catalog",
                    Field_Name: "Catalog",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "catalogId",
                    fieldSetting: {
                        placeholder: "Enter Catalog",
                        maxLength: 15,
                        allowSpace: false
                    },
                    style: {
                        containerCss: "col-xxl-3 col-xl-3 col-md-12 mb-input",
                    },
                },
                {
                    id: "mdlNumber",
                    label: "MDL Number",
                    Field_Name: "MDL Number",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "mdlNumber",
                    fieldSetting: {
                        placeholder: "Enter MDL Number",
                        maxLength: 15,
                        allowSpace: false
                    },
                    style: {
                        containerCss: "col-xxl-3 col-xl-3 col-md-12 mb-input",
                    },
                },
                {
                    id: "casNumber",
                    label: "CAS Number",
                    Field_Name: "CAS Number",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "casNumber",
                    fieldSetting: {
                        placeholder: "Enter CAS Number",
                        maxLength: 10,
                        allowSpace: false
                    },
                    style: {
                        containerCss: "col-xxl-3 col-xl-3 col-md-12 mb-input",
                    },
                },
                {
                    id: "orderPriority",
                    label: "Order Priority",
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
                    style: {
                        containerCss: "col-xxl-3 col-xl-3 col-md-12 mb-input",
                    },
                },
                {
                    id: "requestDate",
                    label: "Request Date",
                    Field_Name: "Request Date",
                    fieldType: FormFieldTypes.DATEPICKER,
                    dataField: "requestDate",
                    fieldSetting: {
                        placeholder: "Enter Request Date",
                        options: [],
                    },
                    style: { containerCss: "col-xxl-3 col-xl-3 col-md-6 col-12 mb-input" },
                },
                {
                    id: "promiseDate",
                    label: "Promise Date",
                    Field_Name: "Promise Date",
                    fieldType: FormFieldTypes.DATEPICKER,
                    dataField: "promiseDate",
                    fieldSetting: {
                        placeholder: "Enter Promise Date",
                        options: [],
                    },
                    style: { containerCss: "col-xxl-3 col-xl-3 col-md-6 col-12 mb-input" },
                },
                {
                    id: "note",
                    label: "Order Note",
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
                        containerCss: "col-xxl-9 col-xl-9 col-md-12 mb-input",
                    },
                }
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};
