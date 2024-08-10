import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationContactFormData = {
    // name: "Email From",
    initialState: { companyWebsite:"" , salesEmail:"" , accountsEmail: "" , purchaseEmail: "" ,customerServiceEmail: "",salesPhone: "",accountsPhone: "",tollFreePhone: ""},
    formFields: [
        {
            id: "companyWebsite",
            lable: "Company Website ",
            Field_Name: "Company Website",
            fieldType: FormFieldTypes.INPUT,
            dataField: "companyWebsite",
            fieldSetting: {
              placeholder: "Enter Company Website",
              allowSpace: true,
              maxLength:255,
            },
            validation: [{ type: "require" }, { type: "website" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
        {
            id: "salesEmail",
            lable: "Sales Email ",
            Field_Name: "Sales Email",
            fieldType: FormFieldTypes.INPUT,
            dataField: "salesEmail",
            fieldSetting: {
                placeholder: "Enter Sales Email",
                allowSpace: true,
                maxLength:255,
            },
            validation: [{ type: "require" },{ type: "email" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "accountsEmail",
            lable: "Accounts Email ",
            Field_Name: "Accounts Email",
            fieldType: FormFieldTypes.INPUT,
            dataField: "accountsEmail",
            fieldSetting: {
                placeholder: "Enter Accounts Email",
                allowSpace: true,
                maxLength:255,
            },
            validation: [{ type: "require" },{ type: "email" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
          {
            id: "purchaseEmail",
            lable: "Purchase Email ",
            Field_Name: "Purchase Email",
            fieldType: FormFieldTypes.INPUT,
            dataField: "purchaseEmail",
            fieldSetting: {
                placeholder: "Enter Purchase Email",
                allowSpace: true,
                maxLength:255,
            },
            validation: [{ type: "require" },{ type: "email" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "customerServiceEmail",
            lable: "Customer Service Email ",
            Field_Name: "Customer Service Email",
            fieldType: FormFieldTypes.INPUT,
            dataField: "customerServiceEmail",
            fieldSetting: {
                placeholder: "Enter Customer Service Email",
                allowSpace: true,
                maxLength:255,
            },
            validation: [{ type: "require" },{ type: "email" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
       
        {
            id: "salesPhone",
            lable: "Sales Phone ",
            Field_Name: "Sales Phone",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "salesPhone",
            fieldSetting: {
                placeholder: "Enter Sales Phone",
                allowSpace: true,
                maxLength: 15,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "accountsPhone",
            lable: "Accounts Phone ",
            Field_Name: "Accounts Phone",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "accountsPhone",
            fieldSetting: {
                placeholder: "Enter Accounts Phone",
                allowSpace: true,
                maxLength: 15,
                
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3 mb-input relative",
            },
        },
        {
            id: "tollFreePhone",
            lable: "TollFree Phone ",
            Field_Name: "TollFree Phone",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "tollFreePhone",
            fieldSetting: {
                placeholder: "Enter TollFree Phone",
                allowSpace: true,
                maxLength: 15,
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
