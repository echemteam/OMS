import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

export const addEditApiAuthenticationFormData ={
    initialState:{
        providerId:"",
       authKey: "",
        clientId:"",
        clientSecret:"",
        tokenEndpoint:"",
        tokenExpires:"",
    },
    formFields: [
        {
            id: "providerId",
            lable: "Provider Id ",
            Field_Name: "Provider Id",
            fieldType: FormFieldTypes.SELECT,
            dataField: "providerId",
            fieldSetting: {
                placeholder: "Select Provider ",
                isEnableOnChange: true
            },
            
         validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 mt-2",
            },
        },
      
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
            // validation: [{ type: "require" }],
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
            name: "Provider Name",
            fieldName: "providerName",
            width: "15%",
            allowShort: true,
          },
      {
        name: "AuthKey",
        fieldName: "authKey",
        width: "15%",
        allowShort: true,
      },
      {
        name: "ClientId",
        fieldName: "clientId",
        width: "25%",
        allowShort: true,
      },
      {
        name: "Client Secret",
        fieldName: "clientSecret",
        width: "15%",
        allowShort: true,
      },
      {
        name: "Token Endpoint",
        fieldName: "tokenEndpoint",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Token Expires",
        fieldName: "tokenExpires",
        width: "20%",
        colType: GridColumnType.DATE,
        allowShort: true,
        colSettings: {
          format: "DD/MM/YYYY",
        },
      },
      {
        name: "Action",
        width: "10%",
        colType: GridColumnType.ACTION,
        defaultAction: {
          allowEdit: true,
          allowDelete: true,
        },
      },
    ],
  
  };