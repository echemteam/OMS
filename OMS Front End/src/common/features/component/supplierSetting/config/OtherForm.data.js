import { FormFieldTypes } from "../../../../../data/formFieldType";

export const otherFormData = {
  // name: "Email From",
  initialState: {
    otherNote: "",
  },
  formFields: [
    {
      id: "otherNote",
      lable: "Notes",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "otherNote",
      fieldSetting: {
        placeholder: "Please Enter Notes",
        isEnableOnChange: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-8 col-xl-8 col-md-8 col-12 mb-2",
      },
    },
  ],
  formSetting: {
    isViewOnly: false,
  },
};
