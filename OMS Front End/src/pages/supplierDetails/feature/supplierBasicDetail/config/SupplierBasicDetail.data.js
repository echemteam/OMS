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


export const supplierBasicData = {
  initialState: { name: "", groupTypeId: "", supplierTypeId: "", countryId: 233, territoryId: 2, emailAddress: "", website: "", note: "", taxId: "", dbaName: "", responsibleUserId: "", supplierNoteId: "" },
  formFields: [
    {
      id: "name",
      lable: "Supplier Name ",
      Field_Name: "Supplier Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Supplier Name",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true
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
          title: "Supplier Information"
        }
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
      validation: [{ type: "require" }],
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
        isEnableOnChange: true
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
        placeholder: "Select Country",
        isEnableOnChange: true
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
        placeholder: "Select Territory",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input",
      },
    },
    {
      id: "supplierTypeId",
      lable: "Supplier Type ",
      Field_Name: "Supplier Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "supplierTypeId",
      fieldSetting: {
        placeholder: "Select Supplier Type",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input",
      },
    },
    {
      id: "dbaName",
      lable: "Doing Business As Name ",
      Field_Name: "Doing Business As Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "dbaName",
      fieldSetting: {
        placeholder: "Doing Business As Name",
        allowSpace: true,
        maxLength: 50,
      },
      // validation: [{ type: "require" }],
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
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-12 col-12 mb-input mb-0",
      },
    },
    // {
    //   id: "responsibleUserId",
    //   lable: "Responsible User ",
    //   Field_Name: "Responsible User ",
    //   fieldType: FormFieldTypes.SELECT,
    //   dataField: "responsibleUserId",
    //   fieldSetting: {
    //     placeholder: "Select Responsible USer",
    //     allowSpace: true,
    //   },
    //   style: {
    //     containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
    //   },
    // },
  ],
  formSetting: {
    isViewOnly: false
  }
};
