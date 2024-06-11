import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const NotesData = {
    name: "Notes From",
    initialState: { type: ""},
    formFields: [
        {
            id: "notes",
            lable: "Add Notes :",
            Field_Name: "Add Notes :",
            fieldType: FormFieldTypes.TEXTAREA,
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