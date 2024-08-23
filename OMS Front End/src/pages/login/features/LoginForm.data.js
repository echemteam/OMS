import { FormFieldTypes } from "../../../data/formFieldType";

const LoginFormData = {
    name: "Login From",
    initialState: { email: "", password: "" },
    formFields: [
        {
            id: "email",
            lable: "User Name",
            Field_Name: "User Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "email",
            fieldSetting: {
                placeholder: "User Name",
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