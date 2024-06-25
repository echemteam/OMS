import { FormFieldTypes } from "../../../../../../../../../data/formFieldType";


export  const NotesFormData = {
    name: "Notes From",
    initialState: { type: ""},
    formFields: [
        {
            id: "notes",
            lable: "Add Notes :",
            Field_Name: "Add Notes :",
            fieldType: FormFieldTypes.TINYEDITOR,
            dataField: "type",
            fieldSetting: {
              placeholder: "",
              allowSpace: true,
            },
            // validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
            },
        },],
}
export default NotesFormData;