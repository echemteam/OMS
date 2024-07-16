import { SuccessMessage } from "../../../../../data/appMessages";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";
import { getLabelClass } from "../../../../../utils/StatusColors/StatusColors";

export const excludingRoles = ['Admin', 'manager']

export const customerbasicData = {
  initialState: { name: "", groupTypeId: 1, countryId: 233, territoryId: 2, emailAddress: "", website: "", note: "", isCompany: false, taxId: "", isBuyingForThirdParty: false, responsibleUserId: "", customerNoteId: "" },
  formFields: [
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
      },
      validation: [{ type: "require" }, { type: "uniqueName" }],
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-8 col-12 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Verify',
        showInformation: {
          showInputButton: true,
          faIcon: "fa-search",
          title: "Customer Information"
        }
      }
    },
    {
      id: "emailAddress",
      lable: "Email ",
      Field_Name: "Email",
      fieldType: FormFieldTypes.INPUT,
      dataField: "emailAddress",
      fieldSetting: {
        placeholder: "Enter Email",
        allowSpace: true,
        maxLength: 50,
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
        placeholder: "https://www.xyz.com/",
        allowSpace: true,
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
        placeholder: "Select Group Type"
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input",
      },
    },


    {
      id: "countryId",
      lable: "Country ",
      Field_Name: "Country",
      fieldType: FormFieldTypes.SELECT,
      dataField: "countryId",
      fieldSetting: {
        placeholder: "Select Country"
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input",
      },
    },
    {
      id: "territoryId",
      lable: "Territory ",
      Field_Name: "Territory",
      fieldType: FormFieldTypes.SELECT,
      dataField: "territoryId",
      fieldSetting: {
        placeholder: "Select Territory"
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input",
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
        allowSpace: true,
        minLength: 10,
        maxLength: 10,
      },
      inputIcon: {
        isIconShow: true,
        faIcon: "fa-info-circle",
        message: SuccessMessage.DefaultUSATaxId
      },
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input",
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
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mt-3 pt-2 mb-input margin-left0-checkbox",
      },
    },
    {
      id: "isSubCompany",
      lable: "Is Sub Company",
      Field_Name: "Is Sub Company",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isSubCompany",
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mt-3 pt-2 mb-input margin-left0-checkbox",
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
        allowSpace: true,
        maxLength: 1000,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input mb-0",
      },
    },

  ],
  formSetting: {
    isViewOnly: false
  }
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

