import { SuccessMessage } from "../../../../../data/appMessages";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";
import { getLabelClass } from "../../../../../utils/StatusColors/StatusColors";

export const excludingRoles = ["Admin", "manager"];

export const customerbasicData = {
  initialState: {
    name: "",
    groupTypeId: 1,
    countryId: 233,
    territoryId: 2,
    emailAddress: "",
    website: "",
    note: "",
    isSubCustomer: false,
    taxId: "",
    isBuyingForThirdParty: false,
    responsibleUserId: "",
    customerNoteId: "",
    incotermId: 11,
    attachment: "",
    base64File: "",
    storagePath: "",
  },
  formFields: [
    {
      id: "attachment",
      lable: "Customer Logo ",
      Field_Name: "Attachment",
      fieldType: FormFieldTypes.IMAGE,
      dataField: "attachment",
      fieldSetting: {
        placeholder: "Upload Attachment",
        allowSpace: true,
        isImageUpload: true,
        isButtonVisible: true,
        isCustomButtonVisible: false,
        acceptedFiles: ".png , .jpg ",
      },
      validation: [{ type: "require" }],
      style: {
        containerCss:
          "col-xxl-4 col-xl-4 col-md-4 col-4 col-4 mb-input mb-0 custom-file-upload-section validation-image-uploader",
      },
    },
    {
      id: "",
      lable: "",
      Field_Name: "",
      dataField: "",
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-4 col-4 remove-line",
      },
    },
    {
      id: "name",
      lable: "Customer Name ",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Customer Name",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
      },
      validation: [{ type: "require" }, { type: "uniqueName" }],
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-8 col-12 mb-input",
      },
      inputButtonGroupConfig: {
        isPrimaryButtonVisible: false,
        // primaryButtonText: 'Verify',
        infoButtonConfig: {
          isInfoButtonVisible: true,
          infoButtonIcon: "fa-search",
          infoButtonTooltip: "Customer Information",
        },
      },
    },
    {
      id: "emailAddress",
      lable: "Email ",
      Field_Name: "Email",
      fieldType: FormFieldTypes.INPUT,
      dataField: "emailAddress",
      fieldSetting: {
        placeholder: "Enter Email",
        allowSpace: false,
        maxLength: 65,
        exemptBoundarySpaces: true,
      },
      validation: [{ type: "require" }, { type: "email" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
      },
    },
    {
      id: "website",
      lable: "Website ",
      Field_Name: "Website",
      fieldType: FormFieldTypes.INPUT,
      dataField: "website",
      fieldSetting: {
        placeholder: "https://www.xyz.com",
        allowSpace: false,
        maxLength: 250,
      },
      validation: [{ type: "require" }, { type: "website" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
      },
    },

    {
      id: "groupTypeId",
      lable: "Group Type ",
      Field_Name: "Group Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "groupTypeId",
      fieldSetting: {
        placeholder: "Select Group Type",
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-4 col-md-6 col-12 mb-input",
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
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-4 col-md-6 col-12 mb-input",
      },
    },
    {
      id: "territoryId",
      lable: "Territory ",
      Field_Name: "Territory",
      fieldType: FormFieldTypes.SELECT,
      dataField: "territoryId",
      fieldSetting: {
        placeholder: "Select Territory",
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-4 col-md-4 col-12 mb-input",
      },
    },
    {
      id: "incotermId",
      lable: "Incoterm",
      Field_Name: "Incoterm",
      fieldType: FormFieldTypes.SELECT,
      dataField: "incotermId",
      fieldSetting: {
        placeholder: "Select Incoterm",
        isEnableOnChange: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-3 col-xl-4 col-md-4 col-12 mb-input",
      },
    },
    {
      id: "taxId",
      lable: "Tax Id ",
      Field_Name: "Tax Id",
      fieldType: FormFieldTypes.INPUT,
      dataField: "taxId",
      fieldSetting: {
        placeholder: "Tax Id",
        allowSpace: false,
        minLength: 10,
        maxLength: 10,
        exemptBoundarySpaces: true,
      },
      inputIcon: {
        isIconShow: true,
        faIcon: "fa-info-circle",
        message: SuccessMessage.DefaultUSATaxId,
      },
      style: {
        containerCss: "col-xxl-3 col-xl-3 col-md-4 col-12 mb-input",
      },
    },
    {
      id: "responsibleUserId",
      lable: "Responsible User ",
      Field_Name: "Responsible User",
      fieldType: FormFieldTypes.SELECT,
      dataField: "responsibleUserId",
      fieldSetting: {
        placeholder: "Select Responsible User",
        isEnableOnChange: true,
        isDisabled: false,
      },
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input",
      },
    },
    {
      id: "isBuyingForThirdParty",
      lable: "Is Buying for Third Party",
      Field_Name: "Is Buying for Third Party",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isBuyingForThirdParty",
      style: {
        containerCss:
          "col-xxl-2 col-xl-2 col-md-3 col-12 pt-2 mb-input margin-top-checkbox mt-2",
      },
    },
    {
      id: "isSubCustomer",
      lable: "Is Sub Customer",
      Field_Name: "Is Sub Customer",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isSubCustomer",
      style: {
        containerCss:
          "col-xxl-2 col-xl-2 col-md-3 col-12 md-pt-0 pt-2 mb-input margin-top-checkbox margin-left0-checkbox mt-2",
      },
    },
    {
      id: "note",
      lable: "Notes ",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.CKEDITOR,
      dataField: "note",
      fieldSetting: {
        placeholder: "Enter Notes",
        maxLength: 1000,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-5 col-xl-5 col-md-12 col-12 mb-input mb-0",
      },
    },
  ],
  formSetting: {
    isViewOnly: false,
  },
};

export const basicInfoData = {
  columns: [
    {
      name: "Name",
      fieldName: "name",
      width: "15%",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      width: "15%",
      // allowShort: true,
    },
    {
      name: "Country",
      fieldName: "countryName",
      width: "15%",
      // allowShort: true,
    },

    {
      name: "Email",
      fieldName: "emailAddress",
      width: "15%",
      // allowShort: true,
    },
    {
      name: "Group Type",
      fieldName: "groupType",
      width: "15%",
      // allowShort: true,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      width: "15%",
      colSettings: {
        valueField: "status",
        getLableClass: getLabelClass,
      },
    },
    {
      name: "Action",
      width: "10%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: false,
      },
    },
  ],
};
