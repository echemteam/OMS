import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const SettingFormData = {
  name: "Setting Form",
  initialState: { paymentTermId: "" ,creditLimit:"",paymentMethodId:"",billingCurrency:"",invoiceSubmissionInstruction:""},
  formFields: [
    {
      id: "paymentTermId",
      lable: "Default Payment Terms Template :",
      Field_Name: "Default Payment Terms Template",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentTermId",
      fieldSetting: {
        placeholder: "Select Default Payment Terms Template",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "creditLimit",
      lable: "Credit Limit :",
      Field_Name: "Credit Limit",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "creditLimit",
      fieldSetting: {
        placeholder: "Enter Credit Limit",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "paymentMethodId",
      lable: "Payment Method :",
      Field_Name: "Payment Method",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentMethodId",
      fieldSetting: {
        placeholder: "Select Payment Method",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
      
    },
      {
      id: "billingCurrency",
      lable: "Billing Currency :",
      Field_Name: "Billing Currency",
      fieldType: FormFieldTypes.INPUT,
      dataField: "billingCurrency",
      fieldSetting: {
        placeholder: "Billing Currency",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "invoiceSubmissionInstruction",
      lable: "Invoice Submission Instruction :",
      Field_Name: "Invoice Submission Instruction",
      fieldType: FormFieldTypes.TINYEDITOR,
      dataField: "invoiceSubmissionInstruction",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    
  ],
};

export const shippingFormData = {
  name: "Shipping Form",
  initialState: { accountType: ""},
  formFields: [
    {
      id: "accountType",
      lable: "Account Type :",
      Field_Name: "",
      fieldType: FormFieldTypes.SELECT,
      dataField: "accountType",
      fieldSetting: {
        placeholder: "Select Account",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    
    
  ],
};



export const ShippingGridConfig = {
  columns: [
    
    {
      name: "Carrier",
      fieldName: "carrier",
      // allowShort: true,
    },
    {
      name: "Account Number",
      fieldName: "accountNumber",
    },
    {
      name: "Is Primary",
      fieldName: "isPrimary",
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        valueField: "isPrimary",
        getLableClass: (value) => {
          switch (value) {
            case true:
              return "info";
            case false:
              return "danger";
            default:
              return "secondary";
          }
        },
      },
    },
    
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: false,
      },

    },
  ],
};


export const collectAccountData = [
  {
    carrier:"Fedex",
    accountNumber:"2165241460",
  },
  {
    carrier:"DHL",
    accountNumber:"1105652414",
  },
  {
    carrier:"UPS",
    accountNumber:"1104056025",
  },
];


export const addEditCarrierFormData = {
  name: "Shipping Form",
  initialState: { accountType: ""},
  formFields: [
    {
      id: "carrier",
      lable: "Carrier :",
      Field_Name: "",
      fieldType: FormFieldTypes.SELECT,
      dataField: "carrier",
      fieldSetting: {
        placeholder: "Select Carrier",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    {
      id: "accountNumber",
      lable: "Account Number :",
      Field_Name: "Account Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "accountNumber",
      fieldSetting: {
        placeholder: "Enter Account Number",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-2",
      },
    },
    
    
  ],
};