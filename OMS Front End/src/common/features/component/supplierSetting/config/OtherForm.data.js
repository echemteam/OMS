import { FormFieldTypes } from "../../../../../data/formFieldType";

export const otherFormData = {
  // name: "Email From",
  initialState: {
    messageToRecipient: "",
    addressLine2: "",
    stateId: "",
    zipCode: "",
    cityId: "",
  },
  formFields: [
    {
      id: "notesId",
      lable: "Notes",
      Field_Name: "Notes",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "notesId",
      fieldSetting: {
        placeholder: "Please Enter Notes",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
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
