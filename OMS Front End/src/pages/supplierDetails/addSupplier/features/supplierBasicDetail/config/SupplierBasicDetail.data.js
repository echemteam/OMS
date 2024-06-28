import { FormFieldTypes } from "../../../../../../data/formFieldType";

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


export const supplierBasicData = {
  initialState: { name: "", groupTypeId: "", supplierTypeId:"", countryId: "", territoryId: "", emailAddress: "", website: "", note: "", taxId: "", dbaName:"" ,responsibleUserId:""},
  formFields: [
    {
      id: "name",
      lable: "Supplier Name :",
      Field_Name: "Supplier Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Supplier Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }, { type: "uniqueName" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Verify'
      }
    },
    {
      id: "name-input",
      lable: "Customer Name :",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Customer Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }, { type: "uniqueName" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "groupTypeId",
      lable: "Group Type :",
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
      lable: "Country :",
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
      lable: "Territory :",
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
      id: "supplierTypeId",
      lable: "Supplier Type :",
      Field_Name: "Supplier Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "supplierTypeId",
      fieldSetting: {
        placeholder: "Select Supplier Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "dbaName",
      lable: "Doing Business As Name :",
      Field_Name: "Doing Business As Name",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "dbaName",
      fieldSetting: {
        placeholder: "Doing Business As Name",
        allowSpace: true,
      },
      validation: [{ type: "require" } , { type: "number "}],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "emailAddress",
      lable: "Email :",
      Field_Name: "Email",
      fieldType: FormFieldTypes.INPUT,
      dataField: "emailAddress",
      fieldSetting: {
        placeholder: "Enter Email",
        allowSpace: true,
      },
      validation: [{ type: "require" }, { type: "email" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "website",
      lable: "Website :",
      Field_Name: "Website",
      fieldType: FormFieldTypes.INPUT,
      dataField: "website",
      fieldSetting: {
        placeholder: "https://www.xyz.com/",
        allowSpace: true,
      },
      validation: [{ type: "require" }, { type: "website" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "taxId",
      lable: "Tax Id :",
      Field_Name: "Tax Id",
      fieldType: FormFieldTypes.INPUT,
      dataField: "taxId",
      fieldSetting: {
        placeholder: "Tax Id",
        allowSpace: true,
        minLength: 0,
        maxLength: 10,
      },
      validation: [{ type: "require" }, { type: "taxId", minLength: 0, maxLength: 10 }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "note",
      lable: "Notes :",
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
      id: "responsibleUserId",
      lable: "Responsible User :",
      Field_Name: "Responsible User ",
      fieldType: FormFieldTypes.SELECT,
      dataField: "responsibleUserId",
      fieldSetting: {
        placeholder: "Select Responsible USer",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
  ],
  formSetting: {
    isViewOnly: false
  }
};
