import { FormFieldTypes } from "../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../data/gridColumnType";

export const AddEditResponsibleData = {
    // name: "Email From"
    initialState: { responsibleUserId: "" },
    formFields: [
        {
            id: "responsibleUserId",
            lable: "Responsible User ",
            Field_Name: "Responsible User",
            fieldType: FormFieldTypes.SELECT,
            dataField: "responsibleUserId",
            fieldSetting: {
              placeholder: "Select Responsible User",
              isEnableOnChange: true,
              isDisabled: false,
            },
            style: {
              containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
            validation: [{ type: "require" }],
          },
    ],
    formSetting: {
        isViewOnly: false
    }
};

export const manageResponsibleUsersData = {
    columns: [
        {
            name: "functionality Name",
            fieldName: "functionalityName",
            width: "40%",
            allowShort: true,
        },
        {
            name: "responsible User Name",
            fieldName: "responsibleUserName",
            width: "40%",
            allowShort: true,
        },
        {
            name: "Action",
            width: "20%",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowDelete: true,
            },
        },
    ],
};