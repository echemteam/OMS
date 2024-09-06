import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationBankFormData = {
  
    initialState: { beneficiaryName:"" , checkingAccountNumber:"" , routingAccountNumber: "" , swiftCode: "" ,bankAddress:"",bankBranch : ""},
    formFields: [
        {
            id: "beneficiaryName",
            lable: "Beneficiary Name ",
            Field_Name: "Beneficiary Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "beneficiaryName",
            fieldSetting: {
              placeholder: "Enter Beneficiary Name",
              allowSpace: true,
              maxLength:255,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
        {
            id: "checkingAccountNumber",
            lable: "Checking Account Number ",
            Field_Name: "Checking Account Number",
            fieldType: FormFieldTypes.INPUT,
            dataField: "checkingAccountNumber",
            fieldSetting: {
                placeholder: "Enter Checking Account Number",
                allowSpace: true,
                maxLength:34,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "routingAccountNumber",
            lable: "Routing Account Number ",
            Field_Name: "Routing Account Number",
            fieldType: FormFieldTypes.INPUT,
            dataField: "routingAccountNumber",
            fieldSetting: {
                placeholder: "Enter Routing Account Number",
                allowSpace: true,
                 maxLength:9,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
          {
            id: "swiftCode",
            lable: "Swift Code ",
            Field_Name: "Swift Code",
            fieldType: FormFieldTypes.INPUT,
            dataField: "swiftCode",
            fieldSetting: {
                placeholder: "Enter Swift Code",
                allowSpace: true,
                maxLength:11,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "bankBranch",
            lable: "Bank Branch",
            Field_Name: "Bank Branch",
            fieldType: FormFieldTypes.INPUT,
            dataField: "bankBranch",
            fieldSetting: {
                placeholder: "Enter Bank Branch",
                allowSpace: true,
                maxLength:100,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "bankAddress",
            lable: "Bank Address ",
            Field_Name: "Bank Address",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "bankAddress",
            fieldSetting: {
                placeholder: "Enter Bank Address",
                allowSpace: true,
                maxLength:35,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        
    ],
    formSetting: {
        isViewOnly: false
    }
};
