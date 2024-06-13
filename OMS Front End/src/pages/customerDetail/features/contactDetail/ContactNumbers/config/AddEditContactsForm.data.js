import { FormFieldTypes } from "../../../../../../data/formFieldType";


export const addEditContactsFormData = {
  name: "Add Edit Role Form",
  initialState: { companyName: "" },
  formFields: [
    
    {
      id: "phoneCode",
      lable: "Contact Number :",
      Field_Name: "Phone Code",
      fieldType: FormFieldTypes.SELECT,
      dataField: "phoneCode",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-5 col-md-5 mb-2 pr-0 border-right-0",
      },
    },
    {
      id: "contactNumber",
      lable: "",
      Field_Name: "Contact Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "contactNumber",
      fieldSetting: {
        placeholder: "Enter Contact Number",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-8 col-xl-7 col-md-7 mb-2 pl-0 border-left-r-0",
      },
    },
  ],
};
