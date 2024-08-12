import { FormFieldTypes } from "../../../../../data/formFieldType";

export const creditCardFormData = {
  // name: "Email From",
  initialState: {
    ccNote: "",
    isCCExistsOnFile: false,
  },
  formFields: [
    
    {
      id: "ccNote",
      lable: "Notes",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "ccNote",
      fieldSetting: {
        placeholder: "Please Enter Notes",
        isEnableOnChange: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-8 col-12 mb-2",
      },
    },
    {
      id: "isCCExistsOnFile",
      lable: "Card exists on file",
      Field_Name: "Card exists on file",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isCCExistsOnFile",
      fieldSetting: {
        placeholder: "Please Select Card exists on file",
        isEnableOnChange: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    

  ],
  formSetting: {
    isViewOnly: false,
  },
};