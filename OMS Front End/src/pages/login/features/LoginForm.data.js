import { FormFieldTypes } from "../../../data/formFieldType";

const LoginFormData = {
    name: "Login From",
    initialState: { email: "admin@gmail.com", password: "Mol@1234" },
    formFields: [
        {
            id: "email",
            lable: "User Name / Email Address",
            Field_Name: "Email Address",
            fieldType: FormFieldTypes.INPUT,
            dataField: "email",
            fieldSetting: {
                placeholder: "Email Address",
                allowSpace: false,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-12 mb-3"
            }
        },
        {
            id: "Password",
            lable: "Password",
            Field_Name: "Password",
            fieldType: FormFieldTypes.PASSWORD,
            dataField: "password",
            fieldSetting: {
                placeholder: "Password",
            },
            style: {
                containerCss: "col-md-12"
            },
            validation: [{ type: "require" }, { type: "password" }]
        },
    ],
};

export default LoginFormData;