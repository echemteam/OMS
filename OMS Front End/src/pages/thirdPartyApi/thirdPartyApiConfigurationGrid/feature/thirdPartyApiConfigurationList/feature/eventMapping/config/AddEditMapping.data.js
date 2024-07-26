import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const AddEditMappingData = {
    // name: "Email From"
    initialState: { apiEventMappingId: 0, providerID: "", endpointID: "", description: "" },
    formFields: [
        {
            id: "providerID",
            lable: "Provider ",
            Field_Name: "Provider",
            fieldType: FormFieldTypes.SELECT,
            dataField: "providerID",
            fieldSetting: {
                placeholder: "Select Provider",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "endpointID",
            lable: "End point ",
            Field_Name: "End point",
            fieldType: FormFieldTypes.SELECT,
            dataField: "endpointID",
            fieldSetting: {
                placeholder: "Select End point",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "description",
            lable: "Description",
            Field_Name: "Description",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "description",
            fieldSetting: {
                placeholder: "Please Enter Description",
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};