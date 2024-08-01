import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";

export const orderItemPriceList = {
  columns: [
    {
        name: "Size",
        fieldName: "phoneType",
        width: "10%",
      },
      {
        name: "Unit",
        fieldName: "phoneCode,phoneNumber",
        colType: GridColumnType.CUSTOM,
        width: "10%",
      },
      {
        name: "Price",
        width: "10%",
        fieldName: "extension",
      },
      {
        name: "Order note",
        fieldName: "isPrimary",
        width: "15%",
      },
      {
        name: "Req-Date",
        fieldName: "isPrimary",
        width: "15%",
      },
      {
        name: "Promise-Date",
        fieldName: "isPrimary",
        width: "15%",
      },
      {
        name: "Priority",
        fieldName: "isPrimary",
        width: "15%",
      },
      {
        name: "Action",
        fieldName: "isPrimary",
        width: "10%",
      },
  ],
};

export const orderItemDetailData = {
  initialState: {},

  formFields: [
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
    },
  ],
};
