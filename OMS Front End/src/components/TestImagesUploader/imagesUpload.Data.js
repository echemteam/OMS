import { FormFieldTypes } from "../../data/formFieldType";

export const imagesUploadData = {
    formFields: [
        {
            id: "attachment",
            lable: "Attachment ",
            Field_Name: "Attachment",
            fieldType: FormFieldTypes.IMAGE,
            dataField: "attachment",
            fieldSetting: {
                placeholder: "Upload Attachment",
                allowSpace: true,
                isImageUpload: true,
                isButtonVisible: true,
                isCustomButtonVisible: false,
                acceptedFiles: '.png ',
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section",
            },

        }
    ]
};