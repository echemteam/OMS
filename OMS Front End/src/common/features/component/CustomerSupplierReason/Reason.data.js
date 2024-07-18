import { FormFieldTypes } from "../../../../data/formFieldType";

export const reasonData = {
  name: "",
  initialState: { inActiveReason: "" },
  formFields: [
    {
      id: "ResponsibleUserId",
      lable: "Responsible User ",
      Field_Name: "Responsible User",
      fieldType: FormFieldTypes.SELECT,
      dataField: "responsibleUserId",
      fieldSetting: {
        placeholder: "Select Responsible User",
        isDisabled: false,
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2",
      },
    },
    {
      id: "inActiveReason",
      lable: "Reason :",
      Field_Name: "Reason ",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "inActiveReason",
      fieldSetting: {
        placeholder: "please enter Reason",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
      },
    },
  ],
}
