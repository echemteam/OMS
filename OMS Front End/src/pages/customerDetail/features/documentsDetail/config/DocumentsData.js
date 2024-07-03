import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const DocumentFormData = {
  name: "Document Form",
  initialState: {
    name: "",
    documentTypeId: "",
    customerId: "",
    attachment: "",
    base64File: "",
    storagePath: ""
  },
  formFields: [
    {
      id: "documentTypeId",
      lable: "Document Type ",
      Field_Name: "Document Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "documentTypeId",
      fieldSetting: {
        placeholder: "Select Document Type",
        allowSpace: true,
        options: []
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "name",
      lable: "Document Name ",
      Field_Name: "Document Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Document Name",
        allowSpace: true,
        maxLength: 50,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
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
        acceptedFiles: '.pdf , .doc , .docx ',
      },
     
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 custom-file-upload-section",
      },

    },

  ],
};



export const DocumentGridConfig = {
  columns: [
    {
      name: "Document Type",
      fieldName: "documentType",
      // allowShort: true,
    },
    {
      name: "Document Name",
      fieldName: "documentName",
      // allowShort: true,
    },

    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },

    },
  ],
};


export const DocumentTypes = [
  { value: 1, label: "Tax or Registration document" },
  { value: 2, label: "Customer details form" },
  { value: 3, label: "Our submitted forms" }
];

export const FileTypeIcons = [
  {
    type: 'pdf',
    icon: AppIcons.PdfIcon
  },
  {
    type: 'docx',
    icon: AppIcons.DocIcon
  },
  {
    type: 'xlsx',
    icon: AppIcons.XlsIcon
  },
  {
    type: 'pptx',
    icon: AppIcons.PptIcon
  },
  {
    type: 'zip',
    icon: AppIcons.ZipIcon
  },
  {
    type: 'csv',
    icon: AppIcons.CsvIcon
  }
]
