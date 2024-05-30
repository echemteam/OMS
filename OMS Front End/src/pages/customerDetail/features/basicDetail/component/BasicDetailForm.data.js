import { FormFieldTypes } from "../../../../../data/formFieldType";

export const basicDetailFormData = {
  name: "Email From",
  initialState: { companyName: "" },
  formFields: [
    {
      id: "customerName",
      lable: "Customer Name :",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Customer Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "groupType",
      lable: "Group Type :",
      Field_Name: "Group Type",
      fieldType: FormFieldTypes.SELECT,
      dataField: "GroupType",
      fieldSetting: {
        placeholder: "Select Group Type",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "territory",
      lable: "Territory :",
      Field_Name: "Territory",
      fieldType: FormFieldTypes.SELECT,
      dataField: "Territory",
      fieldSetting: {
        placeholder: "Select Territory",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    
    {
      id: "website",
      lable: "Website :",
      Field_Name: "Website",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Customer Website",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "textId",
      lable: "Text Id :",
      Field_Name: "Text Id",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "Enter Customer Text Id",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3",
      },
    },
    {
      id: "isCompany",
      lable: "Is Company",
      Field_Name: "Is Company",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "Is Company",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 margin-left0-checkbox",
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
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3 margin-left0-checkbox",
      },
    },
    
    // {
    //   id: "gender",
    //   label: "Gender :",
    //   fieldName: "Instrument Type",
    //   fieldType: FormFieldTypes.RADIOBUTTON,
    //   dataField: "gender",
    //   fieldSetting: {
    //     options: [
    //       {
    //         label: "Male",
    //         value: "Male",
    //         isDisable: false,
    //         optionClass: "",
    //       },
    //       {
    //         label: "Female",
    //         value: "Female",
    //         isDisable: false,
    //         optionClass: "second-radio",
    //       },
    //       // Add more options if needed
    //     ],
    //   },
    //   validation: [{ type: "require" }],
    //   style: {
    //     containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-3 mt-3",
    //   },
    // },
    
    
   
    
    {
      id: "notes",
      lable: "Notes :",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "Notes",
      fieldSetting: {
        placeholder: "Enter Notes",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 col-12 mb-3",
      },
    },
    
  ],
};
