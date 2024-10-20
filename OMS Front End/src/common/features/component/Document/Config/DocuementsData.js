import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const DocumentFormData = {
  name: "Document Form",
  initialState: {
    name: "",
    documentTypeId: "",
    supplierId: "",
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
      fieldType: FormFieldTypes.EDITABLEDROPDOWN,
      dataField: "documentTypeId",
      fieldSetting: {
        placeholder: "Select Document Type",
        isEnableOnChange: true,
        options: []
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
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
        isDisable: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-6 col-12 mb-input",
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
        acceptedFiles: '.pdf , .docx ',
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-input mb-0 custom-file-upload-section",
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
    type: 'doc',
    icon: AppIcons.DocIcon
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
    type: 'xls',
    icon: AppIcons.XlsIcon
  },
  {
    type: 'ppt',
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
