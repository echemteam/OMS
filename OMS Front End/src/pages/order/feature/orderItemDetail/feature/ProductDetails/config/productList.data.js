import { FormFieldTypes } from "../../../../../../../data/formFieldType";

export const productDetailsList = {
    initialState: {
        productSearch: "",
    },

    formFields: [
        {
            id: "productSearch",
            lable: "Product Search ",
            Field_Name: "Product Search ",
            fieldType: FormFieldTypes.INPUT,
            dataField: "productSearch",
            fieldSetting: {
                placeholder: "Enter Product Search",
                allowSpace: true,
                maxLength: 50,
                exemptBoundarySpaces: true,
            },
            validation: [{ type: "require" }, { type: "uniqueName" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input relative",
            },
            inputButtonGroup: {
                isInputButton: true,
                buttonText: "Search",
            },
        },
        {
            id: "attachment",
            lable: "Attachment ",
            Field_Name: "Attachment",
            fieldType: FormFieldTypes.FILE,
            dataField: "attachment",
            fieldSetting: {
                placeholder: "Upload Attachment",
                allowSpace: true,
                isButtonVisible: false,
                isCustomButtonVisible: true,
                acceptedFiles: ".pdf , .doc , .docx ,.csv , .xlsx , .xls ",
            },
            validation: [{ type: "require" }],
            style: {
                containerCss:
                    "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section",
            },
        }
    ]
}

export const productListConfig = {
    columns: [
        {
            name: "Product Name",
            fieldName: "ProductName",
            width: "40%",
        },
        {
            name: "CatalogId",
            fieldName: "CatalogId",
            width: "20%",
        },
        {
            name: "CASNumber",
            fieldName: "CASNumber",
            width: "20%",
        },
        {
            name: "MDLNumber",
            fieldName: "MDLNumber",
            width: "20%",
        }
    ],
};