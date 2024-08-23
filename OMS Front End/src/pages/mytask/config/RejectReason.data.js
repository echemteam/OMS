import { FormFieldTypes } from "../../../data/formFieldType";

export const addResonData = {
    // name: "Shipping Form",
    initialState: {
        rejectReason: ""
    },
    formFields: [
        {
            id: "rejectReason",
            lable: "Rejection Reason :",
            Field_Name: "Rejection Reason ",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "rejectReason",
            fieldSetting: {
                placeholder: "please enter Rejection Reason",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
            },
        },
    ],
};
