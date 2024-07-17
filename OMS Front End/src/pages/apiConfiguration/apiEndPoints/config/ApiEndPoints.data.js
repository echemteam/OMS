import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

export const addEditApiEndPointsFormData ={
    initialState:{
        providerId:"",
        name: "",
        path:"",
        method:"",
        description:"",
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
            },
            
         validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 mt-2",
            },
        },
      
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
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 ",
            },
        },
        {
            id: "path",
            lable: "Path",
            Field_Name: "Path",
            fieldType: FormFieldTypes.INPUT,
            dataField: "path",
            fieldSetting: {
                placeholder: "Enter Path",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "method",
            lable: "Method ",
            Field_Name: "Method",
            fieldType: FormFieldTypes.SELECT,
            dataField: "method",
            fieldSetting: {
                placeholder: "Select Method",
            },
            
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "description",
            lable: "Description",
            Field_Name: "Description",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "description",
            fieldSetting: {
                placeholder: "Enter Description",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
       
    ],
    formSetting: {
        isViewOnly: false
    }

}
export const ApiEndPointGridConfig = {
    columns: [
        {
            name: "Provider Name",
            fieldName: "name",
            width: "15%",
            allowShort: true,
          },
      {
        name: "EndPoint Name",
        fieldName: "endpointName",
        width: "15%",
        allowShort: true,
      },
      {
        name: "EndPoint Path",
        fieldName: "path",
        width: "25%",
        allowShort: true,
      },
      {
        name: "EndPoint Method",
        fieldName: "method",
        width: "15%",
        allowShort: true,
      },
      {
        name: "Description",
        fieldName: "description",
        width: "20%",
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