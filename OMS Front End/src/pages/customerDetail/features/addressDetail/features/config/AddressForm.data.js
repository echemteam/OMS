import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const addressFormData = {
  // name: "Email From",
  initialState: { addressTypeId: ""  , addressLine1:"" , addressLine2:"" , addressLine3:"" , addressLine4:"" , addressLine5 :"" , countryId:"" , stateId:"" ,zipCode:"", cityId:"" , supplierId : 0 , isPreferredBilling:false , isShippingAndBilling:false , isPreferredShipping:false},
  formFields: [
    {
      id: "addressTypeId",
      lable: "Address Type :",
      Field_Name: "Address Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "addressTypeId",
      fieldSetting: {
        placeholder: "Select Address Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    
    {
      id: "addressLine1",
      lable: "Address Line 1 :",
      Field_Name: "Address Line 1",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine1",
      fieldSetting: {
        placeholder: "Enter Address Line 1",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "addressLine2",
      lable: "Address Line 2 :",
      Field_Name: "Address Line 2",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine2",
      fieldSetting: {
        placeholder: "Enter Address Line 2",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "addressLine3",
      lable: "Address Line 3 :",
      Field_Name: "Address Line 3",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine3",
      fieldSetting: {
        placeholder: "Enter Address Line 3",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "addressLine4",
      lable: "Address Line 4 :",
      Field_Name: "Address Line 4",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine4",
      fieldSetting: {
        placeholder: "Enter Address Line 4",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "addressLine5",
      lable: "Address Line 5 :",
      Field_Name: "Address Line 5",
      fieldType: FormFieldTypes.INPUT,
      dataField: "addressLine5",
      fieldSetting: {
        placeholder: "Enter Address Line 5",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
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
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "stateId",
      lable: "State :",
      Field_Name: "State",
      fieldType: FormFieldTypes.SELECT,
      dataField: "stateId",
      fieldSetting: {
        isDisabled: true,
        placeholder: "Select State",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "cityId",
      lable: "City :",
      Field_Name: "City",
      fieldType: FormFieldTypes.SELECT,
      dataField: "cityId",
      fieldSetting: {
        isDisabled: true,
        placeholder: "Select City",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "zipCode",
      lable: "Zip Code :",
      Field_Name: "Zip Code",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "zipCode",
      fieldSetting: {
        placeholder: "Enter Zip Code",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-8 col-md-8 col-12 mb-2",
      },
    },
    {
      id: "isShippingAndBilling",
      lable: "Is Billing and Shipping",
      Field_Name: "Is Billing and Shipping",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isShippingAndBilling",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-12 col-md-12 col-12 col-12 mb-2 margin-left0-checkbox",
      },
    },
    {
      id: "isPreferredBilling",
      lable: "Is Preferred Billing",
      Field_Name: "Is PreferredBilling",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isPreferredBilling",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-12 col-md-12 col-12 col-12 mb-2 margin-left0-checkbox",
      },
    },
    {
      id: "isPreferredShipping",
      lable: "Is Preferred Shipping",
      Field_Name: "Is PreferredShipping",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isPreferredShipping",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-12 col-md-12 col-12 col-12 mb-2 margin-left0-checkbox",
      },
    },
  ],
  formSetting: {
    isViewOnly: false
  }
};
