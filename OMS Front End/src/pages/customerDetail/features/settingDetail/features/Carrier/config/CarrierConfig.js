import { FormFieldTypes } from "../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const addEditCarrierFormData = {
    name: "Shipping Form",
    initialState: {
        carrierId: 0,
        accountNumber: '',
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
                allowSpace: true,
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
            fieldName: "accountNumber"
        },
        {
            name: "Is Primary",
            fieldName: "isPrimary",
            width: "25%",
            colType: GridColumnType.CHECKBOX,
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

        },
    ],
};
