import { FormFieldTypes } from "../../../../../data/formFieldType";

export const NotesData = {
  name: "Notes From",
  initialState: { note: "" },
  formFields: [
    {
      id: "note",
      lable: "Notes :",
      Field_Name: "notes",
      fieldType: FormFieldTypes.CKEDITOR,
      dataField: "note",
      fieldSetting: {
        placeholder: "Enter",
        allowSpace: true,
        maxLength: 1000,
        isDisable: false
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-input",
      },
    },],
  formSetting: {
    isViewOnly: false
  }
}