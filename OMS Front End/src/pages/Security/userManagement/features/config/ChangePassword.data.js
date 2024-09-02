import { FormFieldTypes } from "../../../../../data/formFieldType";

const initState = {
    password: "",
    confirmPassword: ""
}

const changePasswordInfo = {
    name: "Change Password",
    initialState: initState,
    formFields: [
        {
            id: "password",
            lable: "Password ",
            Field_Name: "Password",
            fieldType: FormFieldTypes.PASSWORD,
            dataField: "password",
            fieldSetting: {
                placeholder: "Enter Your Password",
                maxLength:20,
            },
            validation: [{ type: "require" }, { type: "password" }],
            style: {
                containerCss: "col-md-6 mb-input",
            },
        },
        {
            id: "confirmPassword",
            lable: "Confirm Password ",
            Field_Name: "Confirm Password",
            fieldType: FormFieldTypes.PASSWORD,
            dataField: "confirmPassword",
            fieldSetting: {
                placeholder: "Confirm Your Password",
                maxLength:20,
            },
            validation: [{ type: "require" }, { type: "compare", compareEle: "password" }],
            style: {
                containerCss: "col-md-6 mb-input",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
}


export default changePasswordInfo;