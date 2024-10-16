import { FormFieldTypes } from "../../../../../data/formFieldType";

export const otherFormData = {
  initialState: {
    otherNote: "",
  },
  section: [
    {
      title: "Other Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "otherNote",
          label: "Notes",
          Field_Name: "Notes",
          fieldType: FormFieldTypes.TEXTAREA,
          dataField: "otherNote",
          fieldSetting: {
            placeholder: "Please Enter Notes",
            isEnableOnChange: true,
          },
          style: {
            containerCss: "col-xxl-8 col-xl-8 col-md-8 col-12 mb-2",
          },
        },
      ]
    }
  ],
  formSetting: {
    isViewOnly: false,
  },
};
