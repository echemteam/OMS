import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationAccountingFormData = {

    initialState: { companyWebsite:"" },
    formFields: [
        {
            id: "creditLimit",
            lable: "Credit Limit ",
            Field_Name: "Credit Limit",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "creditLimit",
            fieldSetting: {
              placeholder: "Enter Credit Limit",
              allowSpace: true,
              maxLength:5
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
