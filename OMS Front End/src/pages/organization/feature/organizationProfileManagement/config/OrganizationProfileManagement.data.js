import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationProfileManagementdata = {
    // name: "Email From"
    initialState: { organizationId:0 , name: "", logo:"", addressLine1: "", addressLine2: "", countryId: 10, stateId: 3707, zipCode: "", cityId: 143 },
    formFields: [
        {
            id: "name",
            lable: "Name ",
            Field_Name: "Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "name",
            fieldSetting: {
                placeholder: "Enter Name",
                allowSpace: true,
                maxLength: 100,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "logo",
            lable: "Logo ",
            Field_Name: "Logo",
            fieldType: FormFieldTypes.IMAGE,
            dataField: "logo",
            fieldSetting: {
                placeholder: "Upload Attachment",
                isImageUpload: true,
                isButtonVisible: true,
                isCustomButtonVisible: false,
                acceptedFiles: '.png ',
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 custom-file-upload-section",
            },
        },
        {
            id: "addressLine1",
            lable: "Address Line 1 ",
            Field_Name: "Address Line 1",
            fieldType: FormFieldTypes.INPUT,
            dataField: "addressLine1",
            fieldSetting: {
                placeholder: "Enter Address Line 1",
                allowSpace: true,
                maxLength: 100,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "addressLine2",
            lable: "Address Line 2 ",
            Field_Name: "Address Line 2",
            fieldType: FormFieldTypes.INPUT,
            dataField: "addressLine2",
            fieldSetting: {
                placeholder: "Enter Address Line 2",
                allowSpace: true,
                maxLength: 100,
            },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "countryId",
            lable: "Country ",
            Field_Name: "Country",
            fieldType: FormFieldTypes.SELECT,
            dataField: "countryId",
            fieldSetting: {
                placeholder: "Select Country",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input label-name-small",
            },
        },
        {
            id: "stateId",
            lable: "State ",
            Field_Name: "State",
            fieldType: FormFieldTypes.SELECT,
            dataField: "stateId",
            fieldSetting: {
                isDisabled: true,
                placeholder: "Select State",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input label-name-small",
            },
        },
        {
            id: "cityId",
            lable: "City ",
            Field_Name: "City",
            fieldType: FormFieldTypes.SELECT,
            dataField: "cityId",
            fieldSetting: {
                isDisabled: true,
                placeholder: "Select City",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input label-name-small",
            },
        },
        {
            id: "zipCode",
            lable: "Zip Code ",
            Field_Name: "Zip Code",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "zipCode",
            fieldSetting: {
                placeholder: "Enter Zip Code",
                allowSpace: true,
                maxLength: 9,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input label-name-small",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};
