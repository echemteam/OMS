import { EditGridColumnType } from "../../../../../../../data/editGridColumnType";
import { FormFieldTypes } from "../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const addEditCarrierFormData = {
    name: "Shipping Form",
    initialState: {
        carrierId: 0,
        accountNumber: '',
        handlingFee: 10,
        isCarrierPrimary: false
    },
    formFields: [
        {
            id: "carrier",
            lable: "Carrier ",
            Field_Name: "Carrier",
            fieldType: FormFieldTypes.SELECT,
            dataField: "carrier",
            fieldSetting: {
                placeholder: "Select Carrier",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2 label-h-0",
            },
        },
        {
            id: "accountNumber",
            lable: "Account Number ",
            Field_Name: "Account Number",
            fieldType: FormFieldTypes.INPUT,
            dataField: "accountNumber",
            fieldSetting: {
                placeholder: "Enter Account Number",
                allowSpace: true,
                maxLength: 25,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-3 label-h-0",
            },
        },
        {
            id: "handlingFee",
            lable: "Handling Fee",
            Field_Name: "Handling Fee",
            fieldType: FormFieldTypes.INPUT,
            dataField: "handlingFee",
            fieldSetting: {
                placeholder: "Enter Handling Fee",
                allowSpace: true,
                maxLength: 25,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-3 label-h-0",
            },
        },
        {
            id: "isCarrierPrimary",
            lable: "Is Primary",
            Field_Name: "Is Primary",
            fieldType: FormFieldTypes.CHECKBOX,
            dataField: "isCarrierPrimary",
            fieldSetting: {
                placeholder: "",
                allowSpace: true,
            },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-4 col-xl-12 col-md-12 col-12 col-12 mb-2",
            },
        },

    ],
};

export const AccountGridConfig = {
    columns: [
        {
            name: "Carrier",
            fieldName: "carrier",
            width: "25%"
        },
        {
            name: "Account Number",
            width: "25%",
            fieldName: "accountNumber",
            allowEditColumn: true,
            editColumn: {
                editColType: EditGridColumnType.NUMERIC,
                editColFieldName: "accountNumber",
                isDisable: false,
                editColValidation: [
                    { type: "required", message: "Account Number is required." },
                ],
            },
            colSettings: {},
            allowShort: false
        },
        {
            name: "Handling Fee New",
            fieldName: "handlingFee",
            width: "25%",
            colType: GridColumnType.MONEY,
            allowEditColumn: true,
            editColumn: {
                editColType: EditGridColumnType.NUMERIC,
                editColFieldName: "handlingFee",
                isDisable: false,
                editColValidation: [
                    { type: "required", message: "Handling Fee is required." },
                ],
            },
            colSettings: {},
            allowShort: false
        },

        {
            name: "Is Primary",
            fieldName: "isPrimary",
            width: "25%",
            colType: GridColumnType.CHECKBOX,
            allowEditColumn: true,
            editColumn: {
                editColType: EditGridColumnType.CHECKBOX,
                editColFieldName: "isPrimary",
                editColValidation: [], 
            },
            colSettings: {
                allowCheckbox: true,
                allowDisable: true
            },
        },

        {
            name: "Action",
            width: "25%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDelete: true,
            },
            editColumn: {
                editColType: EditGridColumnType.ACTION,
                defaultEditAction: {
                    allowSave: true,
                    allowCancel: true,
                },
            },
            allowShort: false
        },
    ],
    allowEdit: true,
    handleRowDataUpdate: null,
    OnColumnChangeEdit: null
};
