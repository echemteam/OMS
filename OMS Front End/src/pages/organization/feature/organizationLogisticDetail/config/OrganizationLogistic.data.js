import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationLogisticFormData = {
    
    initialState: { fedExAccount:"" , dHLAccount:"" , uPSAccount: "" , uSPSAccount: "" },
    formFields: [
        {
            id: "fedExAccount",
            lable: "FedEx Account ",
            Field_Name: "FedEx Account",
            fieldType: FormFieldTypes.INPUT,
            dataField: "fedExAccount",
            fieldSetting: {
              placeholder: "Enter FedEx Account",
              allowSpace: true,
              maxLength:50,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
        {
            id: "dHLAccount",
            lable: "DHL Account ",
            Field_Name: "DHL Account",
            fieldType: FormFieldTypes.INPUT,
            dataField: "dHLAccount",
            fieldSetting: {
                placeholder: "Enter DHL Account",
                allowSpace: true,
                maxLength:50,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3",
            },
        },
        {
            id: "uPSAccount",
            lable: "UPS Account ",
            Field_Name: "UPS Account",
            fieldType: FormFieldTypes.INPUT,
            dataField: "uPSAccount",
            fieldSetting: {
                placeholder: "Enter UPS Account",
                allowSpace: true,
                maxLength:50,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3",
            },
        },
          {
            id: "uSPSAccount",
            lable: "USPS Account ",
            Field_Name: "USPS Account",
            fieldType: FormFieldTypes.INPUT,
            dataField: "uSPSAccount",
            fieldSetting: {
                placeholder: "Enter USPS Account",
                allowSpace: true,
                maxLength:50,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3",
            },
        },
        
    ],
    formSetting: {
        isViewOnly: false
    }
};
