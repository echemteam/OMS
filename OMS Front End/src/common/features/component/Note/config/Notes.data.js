import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

export const NotesData = {
  name: "Notes From",
  initialState: { note: "" },
  section: [
    {
      title: "Notes Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "note",
          lable: "Notes :",
          Field_Name: "notes",
          fieldType: FormFieldTypes.TEXTEDITOR,
          dataField: "note",
          fieldSetting: {
            placeholder: "Enter",
            allowSpace: true,
            maxLength: 1000,
            isDisable: false
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-input",
          },
        }
      ]
    }
  ],
  formSetting: {
    isViewOnly: false
  }
}