import { FormFieldTypes } from "../../../../../../data/formFieldType";


export const addEditEmailFormData = {
  name: "Add Edit Role Form",
  initialState: { companyName: "" },
  formFields: [
    {
      id: "emailAddress",
      lable: "Email Address :",
      Field_Name: "Email Address",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Email Address",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
      },
    },
    
  ],
};
