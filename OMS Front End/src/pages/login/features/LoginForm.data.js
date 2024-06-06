import { FormFieldTypes } from "../../../data/formFieldType";

const LoginFormData = {
    name: "Login From",
    initialState: { email: "kirtan@gmail.com", password: "Mol@1234" },
    formFields: [
        {
            id: "email",
            lable: "Email Address ",
            Field_Name: "Email Address",
            fieldType: FormFieldTypes.INPUT,
            dataField: "email",
            fieldSetting: {
                placeholder: "Email Address",
                allowSpace: false,
            },
            validation: [{ type: "require" },{ type: "email" }],
            style: {
                containerCss: "col-md-12"
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
            validation: [{ type: "require"} , { type: "password" }]
        },
    ],
};

export default LoginFormData;