
import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  isActive: true,
  password: "",
}

export const userFormData = {
  name: "User From",
  initialState: initialState,
  section: [
    {
      title: "User Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "firstName",
          label: "First Name",
          Field_Name: "First Name",
          fieldType: FormFieldTypes.INPUT,
          dataField: "firstName",
          fieldSetting: {
            placeholder: "Enter First Name",
            allowSpace: true,
            maxLength: 65,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl- col-xl-6 col-md-6 mb-input",
          },
        },
        {
          id: "lastName",
          label: "Last Name",
          Field_Name: "Last Name",
          fieldType: FormFieldTypes.INPUT,
          dataField: "lastName",
          fieldSetting: {
            placeholder: "Enter Last Name",
            allowSpace: true,
            maxLength: 65,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-input",
          },
        },
        {
          id: "userName",
          label: "User Name",
          Field_Name: "User Name",
          fieldType: FormFieldTypes.INPUT,
          dataField: "userName",
          fieldSetting: {
            placeholder: "Enter User Name",
            allowSpace: true,
            maxLength: 65,
            isDisable: false
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl- col-xl-6 col-md-6 mb-input",
          },
        },
        {
          id: "Password",
          label: "Password",
          Field_Name: "Password",
          fieldType: FormFieldTypes.PASSWORD,
          dataField: "password",
          fieldSetting: {
            placeholder: "Enter Your Password",
            maxLength: 20,
          },
          validation: [{ type: validationTypes.REQUIRE }, { type: validationTypes.PASSWORD }],
          style: {
            containerCss: "col-xxl- col-xl-6 col-md-6 mb-input",
          },
        },
        {
          id: "isActive",
          label: "IsActive",
          Field_Name: "IsActive",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isActive",
          style: {
            containerCss: "col-xxl-4 col-xl-4 col-md-4 mb-input mt-3 margin-top-checkbox",
          },
        },
      ]
    }
  ],
  formSetting: {
    isViewOnly: false
  }
};

export const UserGridConfig = {
  columns: [

    {
      name: "First Name",
      fieldName: "firstName",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Last Name",
      fieldName: "lastName",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "User Name",
      fieldName: "userName",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Is Active",
      fieldName: "isActive",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        isDisabled: true,
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "10%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
      customAction: [
        {
          name: "HISTORY",
          iconName: "iconamoon:history-bold",
          title: "Login History",
          className: ".history-btn "
        },
      ],
    },
  ],
};
export const UserHistoryGridConfig = {
  columns: [
    {
      name: "Login Time",
      fieldName: "userLoginDateTime",
      colStyle: {
        width: "40%",
      },
      allowShort: false,
    },
    {
      name: "Logout Time",
      fieldName: "userLogoutDateTime",
      colStyle: {
        width: "40%",
      },
      allowShort: false,
    },
    {
      name: "IP Address",
      fieldName: "ipAddress",
      colStyle: {
        width: "20%",
      },
      allowShort: false,
    },

  ]
};