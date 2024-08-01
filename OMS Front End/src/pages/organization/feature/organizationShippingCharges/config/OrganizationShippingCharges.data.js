import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationShippingChargesFormData = {
  
    initialState: { domesticOvernight:"",domesticSecondDay:"", domesticGround:"", internationalPriority:"",  internationalEconomy:"" },
    formFields: [
        {
            id: "domesticOvernight",
            lable: "Domestic Overnight ",
            Field_Name: "Domestic Overnight",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "domesticOvernight",
            fieldSetting: {
              placeholder: "Enter Domestic Overnight",
              allowSpace: true,
              maxLength:18
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
    
          {
            id: "domesticSecondDay",
            lable: "Domestic SecondDay ",
            Field_Name: "Domestic SecondDay",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "domesticSecondDay",
            fieldSetting: {
              placeholder: "Enter Domestic SecondDay",
              allowSpace: true,
              maxLength:18
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
          {
            id: "domesticGround",
            lable: "Domestic Ground ",
            Field_Name: "Domestic Ground",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "domesticGround",
            fieldSetting: {
              placeholder: "Enter Domestic Ground",
              allowSpace: true,
              maxLength:18
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
          {
            id: "internationalPriority",
            lable: "International Priority ",
            Field_Name: "International Priority",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "internationalPriority",
            fieldSetting: {
              placeholder: "Enter International Priority",
              allowSpace: true,
              maxLength:18
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
          {
            id: "internationalEconomy",
            lable: "International Economy ",
            Field_Name: "International Economy",
            fieldType: FormFieldTypes.NUMERIC,
            dataField: "internationalEconomy",
            fieldSetting: {
              placeholder: "Enter International Economy",
              allowSpace: true,
              maxLength:18
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
