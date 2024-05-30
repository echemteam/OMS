import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

const SecurityPermissions = {
    name: "Security Permissions",
    initialState: {
        roles: ""
    },

    formFields: [
        {
            id: "roles",
            lable: "",
            Field_Name: "Role Name",
            fieldType: FormFieldTypes.SELECT,
            dataField: "roles",
            fieldSetting: {
                placeholder: "Select Role Name",
                options: [],
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6",
            },
        }
    ],
};
export const DatabaseConfigGird = {
    columns: [
        {
            name: "Data Set Name",
            fieldName: "dataSetName",
            allowShort: false,
        },
        {
            name: "Action",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: false,
                allowDelete: true
            }
        }
    ],
}
export default SecurityPermissions;
