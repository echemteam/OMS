import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationOtherChargesFormData = {
  
    initialState: { handlingFees:"",bankWireFees:"", creditCardServiceFees:"", coldBoxFees:"",  iTNFees:"",paymentTermId:"" },
    formFields: [
        {
            id: "handlingFees",
            lable: "Handling Fees ",
            Field_Name: "Handling Fees",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "handlingFees",
            fieldSetting: {
              placeholder: "Enter Handling Fees",
              allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
    
          {
            id: "bankWireFees",
            lable: "Bank Wire Fees ",
            Field_Name: "Bank Wire Fees",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "bankWireFees",
            fieldSetting: {
              placeholder: "Enter Bank Wire Fees",
              allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
          {
            id: "creditCardServiceFees",
            lable: "Credit Card Service Fees ",
            Field_Name: "Credit Card Service Fees",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "creditCardServiceFees",
            fieldSetting: {
              placeholder: "Enter Credit Card Service Fees",
              allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
          {
            id: "coldBoxFees",
            lable: "Cold Box Fees ",
            Field_Name: "Cold Box Fees",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "coldBoxFees",
            fieldSetting: {
              placeholder: "Enter Cold Box Fees",
              allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
          {
            id: "iTNFees",
            lable: "ITN Fees ",
            Field_Name: "ITN Fees",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "iTNFees",
            fieldSetting: {
              placeholder: "Enter ITN Fees",
              allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },

          {
            id: "paymentTermId",
            lable: "Default Payment Terms ",
            Field_Name: "Default Payment Terms",
            fieldType: FormFieldTypes.SELECT,
            dataField: "paymentTermId",
            fieldSetting: {
              placeholder: "Select Default Payment Terms",
              isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
    ],
    formSetting: {
        isViewOnly: false
    }
};
