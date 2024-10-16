import { FormFieldTypes } from "../../../../../data/formFieldType";

export const creditCardFormData = {
  initialState: {
    ccNote: "",
    isCCExistsOnFile: false,
  },
  section: [
    {
      title: "Credit Card Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "ccNote",
          label: "Notes",
          Field_Name: "Notes",
          fieldType: FormFieldTypes.TEXTAREA,
          dataField: "ccNote",
          fieldSetting: {
            placeholder: "Please Enter Notes",
            isEnableOnChange: true,
          },
          style: {
            containerCss: "col-xxl-8 col-xl-8 col-md-8 col-12 mb-2",
          },
        },
        {
          id: "isCCExistsOnFile",
          label: "Card exists on file",
          Field_Name: "Card exists on file",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isCCExistsOnFile",
          fieldSetting: {
            placeholder: "Please Select Card exists on file",
            isEnableOnChange: true,
          },
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
          },
        }
      ]
    }
  ],
  formSetting: {
    isViewOnly: false,
  },
};