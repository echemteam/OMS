import { SuccessMessage } from "../../../../../data/appMessages";
import { FormFieldTypes } from "../../../../../data/formFieldType";

// export const securityKeys = {
//   ADD: securityKey.ADDCUSTOMER,
//   EDIT: securityKey.EDITCUSTOMER,
//   // DELETE: securityKey.DELETECUSTOMER
//   // BLOCK: securityKey.BLOCKCUSTOMER
//   // FREEZE: securityKey.FREEZECUSTOMER
//   // UNFREEZE: securityKey.DISABLECUSTOMER
//   // UNBLOCK: securityKey.DISABLECUSTOMER
//   // ACTIVE: securityKey.ACTIVECUSTOMER
// };


export const basicDetailFormDataHalf = {
  initialState: { name: "", groupTypeId: "", countryId: 233, territoryId: 2, emailAddress: "", website: "", note: "", isCompany: false, taxId: "", isBuyingForThirdParty: false , responsibleUserId:""},
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
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Verify',
      }
    },
    {
      id: "name-input",
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
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
        allowSpace: true,
        maxLength: 50,
      },
      validation: [{ type: "require" }, { type: "email" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
        maxLength: 100,
      },
      validation: [{ type: "require" }, { type: "website" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
      validation: [{ type: "require" }, { type: "taxId", minLength: 10, maxLength: 10 }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
        allowSpace: true,
        isDisabled: false,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
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
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-7 col-xl-6 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "isCompany",
      lable: "Is Company",
      Field_Name: "Is Company",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isCompany",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-0 margin-left0-checkbox mt-0",
      },
    },
    {
      id: "isBuyingForThirdParty",
      lable: "Is Buying for Third Party",
      Field_Name: "Is Buying for Third Party",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isBuyingForThirdParty",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 margin-left0-checkbox mb-0",
      },
    },
  ],
  formSetting: {
    isViewOnly: false
  }
};
