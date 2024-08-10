import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";


export const addEditApiAuthenticationFormData = {
  initialState: {

    authKey: "",
    clientId: "",
    clientSecret: "",
    tokenEndpoint: "",
    tokenExpires: "",
  },
  formFields: [


    {
      id: "authKey",
      lable: "AuthKey ",
      Field_Name: "authKey",
      fieldType: FormFieldTypes.INPUT,
      dataField: "authKey",
      fieldSetting: {
        placeholder: "Enter AuthKey",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 ",
      },
    },
    {
      id: "clientId",
      lable: "Client Id",
      Field_Name: "Client Id",
      fieldType: FormFieldTypes.INPUT,
      dataField: "clientId",
      fieldSetting: {
        placeholder: "Enter ClientId",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "clientSecret",
      lable: "Client Secret",
      Field_Name: "Client Secret",
      fieldType: FormFieldTypes.INPUT,
      dataField: "clientSecret",
      fieldSetting: {
        placeholder: "Enter Client Secret",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "tokenEndpoint",
      lable: "Token Endpoint",
      Field_Name: "Token Endpoint",
      fieldType: FormFieldTypes.INPUT,
      dataField: "tokenEndpoint",
      fieldSetting: {
        placeholder: "Enter Token Endpoint",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
      },
    },
    {
      id: "tokenExpires",
      lable: "Token Expires Date",
      Field_Name: "TokenExpires",
      fieldType: FormFieldTypes.DATEPICKER,
      dataField: "tokenExpires",
      fieldSetting: {
        placeholder: "Select Expire Date",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
      },
    },
  ],
  formSetting: {
    isViewOnly: false
  }

}
export const ApiAuthenticationtGridConfig = {
  columns: [
    {
      name: "AuthKey",
      fieldName: "authKey",
      colStyle: {
        width: "15%",
      },
      allowShort: true,
    },
    {
      name: "ClientId",
      fieldName: "clientId",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Client Secret",
      fieldName: "clientSecret",
      colStyle: {
        width: "15%",
      },
      allowShort: true,
    },
    {
      name: "Token Endpoint",
      fieldName: "tokenEndpoint",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Token Expires",
      fieldName: "tokenExpires",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.DATE,
      allowShort: true,
      colSettings: {
        format: "DD/MM/YYYY",
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
    },
  ],

};