import { FormFieldTypes } from "../../../../../../../data/formFieldType";

export const shippingFormData = {
    name: "Shipping Form",
    initialState: { deliveryAccountId: "" },
    formFields: [
        {
            id: "deliveryAccountId",
            lable: "Account Type ",
            Field_Name: "Account Type",
            fieldType: FormFieldTypes.SELECT,
            dataField: "deliveryAccountId",
            fieldSetting: {
                placeholder: "Select Account",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12",
            },
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};