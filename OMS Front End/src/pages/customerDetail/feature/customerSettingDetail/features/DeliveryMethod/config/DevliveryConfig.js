import { EditGridColumnType } from "../../../../../../../data/editGridColumnType";
import { FormFieldTypes } from "../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const addEditDeliveryFormData = {
    name: "Shipping Form",
    initialState: {
        charge: '',
        chargeType: '',
        isDeliveryMethodPrimary: false,
    },
    formFields: [
        {
            id: "chargeType",
            lable: "Charge Type ",
            Field_Name: "Charge Type",
            fieldType: FormFieldTypes.SELECT,
            dataField: "chargeType",
            fieldSetting: {
                placeholder: "Select Charge Type",
                isEnableOnChange: true,
                isDisabled: false,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2 label-h-0",
            },
        },
        {
            id: "charge",
            lable: "Charge ",
            Field_Name: "Charge",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "charge",
            fieldSetting: {
                placeholder: "Enter Charge",
                allowSpace: true,
                maxLength: 3,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2 label-h-0",
            },
        },
        {
            id: "isDeliveryMethodPrimary",
            lable: "Is Primary",
            Field_Name: "Is Primary",
            fieldType: FormFieldTypes.CHECKBOX,
            dataField: "isDeliveryMethodPrimary",
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

export const OurAccountGridConfig = {
    columns: [
        {
            name: "Zone",
            fieldName: "zone",
            colStyle: {
                width: "20%",
            },
        },
        {
            name: "Charge Type",
            fieldName: "name",
            colStyle: {
                width: "20%",
            },
        },
        {
            name: "Charge",
            fieldName: "charge",
            colType: GridColumnType.MONEY,
            colStyle: {
                width: "20%",
            },
            allowEditColumn: true,
            editColumn: {
                editColType: EditGridColumnType.NUMERIC,
                editColFieldName: "charge",
                isDisable: false,
                editColValidation: [
                    { type: "required", message: "Charge is required." },
                    { type: "maxLength", value: 3, message: "Charge Fee must be at least 3 characters long." }
                ],
            },
            colSettings: {},
            allowShort: false
        },
        {
            name: "Is Primary",
            fieldName: "isPrimary",
            colType: GridColumnType.CHECKBOX,
            colStyle: {
                width: "20%",
            },
            colSettings: {
                isDisabled: true,
                allowEdit: true
            },
            allowEditColumn: true,
            editColumn: {
                editColType: EditGridColumnType.CHECKBOX,
                editColFieldName: "isPrimary",
                isDisable: false,
                editColValidation: [],
            },
            allowShort: false
        },
        {
            name: "Action",
            colStyle: {
                width: "20%",
            },
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDelete: false,
            },
            allowShort: false
        },
    ],
    editSettings: {
        buttons: {
            save: true,
            cancel: true
        }
    },
    allowEdit: true,
    handleRowDataUpdate: null,
    OnColumnChangeEdit: null,
    hasChildGridTable: false,
};
