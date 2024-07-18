import { GridColumnType } from "../../../../data/gridColumnType";
import { FormFieldTypes } from "../../../../data/formFieldType";

export const addEditApiProviderFormData ={
    initialState:{
        name: "",
        baseURL:"",
        authenticationType:"",
    },
    formFields: [
        {
            id: "name",
            lable: "Name ",
            Field_Name: "Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "name",
            fieldSetting: {
                placeholder: "Enter Name",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 mt-2",
            },
        },
        {
            id: "baseURL",
            lable: "Base URL ",
            Field_Name: "Base URL",
            fieldType: FormFieldTypes.INPUT,
            dataField: "baseURL",
            fieldSetting: {
                placeholder: "Enter URL",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "authenticationType",
            lable: "Authentication ",
            Field_Name: "AuthenticationType",
            fieldType: FormFieldTypes.SELECT,
            dataField: "authenticationType",
            fieldSetting: {
                placeholder: "Select Authentication Type",
                isEnableOnChange: true
            },
            
           // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
      
       
    ],
    formSetting: {
        isViewOnly: false
    }

}

export const ApiProvidersGridConfig = {
    columns: [

      {
        name: "Name",
        fieldName: "name",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Base URL",
        fieldName: "baseURL",
        width: "35%",
        allowShort: true,
      },
      {
        name: "Authentication Type",
        fieldName: "authenticationType",
        width: "35%",
        allowShort: true,
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