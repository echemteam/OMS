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
            lable: "Charge Type :",
            Field_Name: "Charge Type",
            fieldType: FormFieldTypes.SELECT,
            dataField: "chargeType",
            fieldSetting: {
                placeholder: "Select Charge Type",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2",
            },
        },
        {
            id: "charge",
            lable: "Charge :",
            Field_Name: "Charge",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "charge",
            fieldSetting: {
                placeholder: "Enter Charge",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2",
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
            width: "20%"
        },
        {
            name: "Charge Type",
            fieldName: "name",
            width: "20%"
        },
        {
            name: "Charge",
            fieldName: "charge",
            width: "20%"
        },
        {
            name: "Is Primary",
            fieldName: "isPrimary",
            width: "20%",
            colType: GridColumnType.CHECKBOX
        },

        {
            name: "Action",
            width: "20%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
                allowDelete: true,
            }
        },
    ],
};
