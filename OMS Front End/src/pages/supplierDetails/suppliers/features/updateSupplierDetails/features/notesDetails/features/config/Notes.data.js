import { FormFieldTypes } from "../../../../../../../../../data/formFieldType";


export  const NotesFormData = {
    name: "Notes From",
    initialState: { note: ""},
    formFields: [
        {
            id: "note",
            lable: "Add Notes :",
            Field_Name: "Add Notes :",
            fieldType: FormFieldTypes.CKEDITOR,
            dataField: "note",
            fieldSetting: {
              placeholder: "",
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
export default NotesFormData;