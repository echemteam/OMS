import { FormFieldTypes } from "../../../../../../data/formFieldType";


export const addEditContactsFormData = {
  name: "Add Edit Role Form",
  initialState: { companyName: "" },
  formFields: [
    
    {
      id: "contactNumber",
      lable: "Contact Number :",
      Field_Name: "Country Code",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 mb-3 pr-0 border-right-0",
      },
    },
    {
      id: "contactNumber",
      lable: "",
      Field_Name: "Contact Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Contact Number",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-8 mb-3 pl-0",
      },
    },
  ],
};
