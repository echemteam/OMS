import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const NotesData = {
    name: "Notes From",
    initialState: { note: ""},
    formFields: [
        {
            id: "note",
            lable: "Add Notes :",
            Field_Name: "Add Notes ",
            fieldType: FormFieldTypes.CKEDITOR,
            dataField: "note",
            fieldSetting: {
              placeholder: "Enter Notes",
              allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
            },
        },],
        formSetting: {
          isViewOnly: false
        }
}