import { FormFieldTypes } from "../../../../../data/formFieldType";

export const contactDetailFormData = {
  name: "Email From",
  initialState: { companyName: "" },
  formFields: [
    {
      id: "firstName",
      lable: "First Name :",
      Field_Name: "First Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter First Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3 mt-3",
      },
    },
    {
      id: "middleName",
      lable: "Middle Name :",
      Field_Name: "Middle Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Middle Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "lastName",
      lable: "Last Name :",
      Field_Name: "Last Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Last Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "contactType",
      lable: "Contact Type :",
      Field_Name: "Contact Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "ContactType",
      fieldSetting: {
        placeholder: "Select Contact Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    
     
    {
      id: "gender",
      label: "Gender :",
      fieldName: "Instrument Type",
      fieldType: FormFieldTypes.RADIOBUTTON,
      dataField: "gender",
      fieldSetting: {
        options: [
          
          {
            label: "Male",
            value: "Male",
            isDisable: false,
            optionClass: "",
          },
          {
            label: "Female",
            value: "Female",
            isDisable: false,
            optionClass: "second-radio",
          },
          {
            label: "Other",
            value: "Other",
            isDisable: false,
            optionClass: "second-radio",
          },
          
          // Add more options if needed
        ],
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12",
      },
    },
    {
      id: "isInternational",
      lable: "Is International",
      Field_Name: "Is International",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "Is International",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3 pt-2 margin-left0-checkbox",
      },
    },
   
   
  ],
};
