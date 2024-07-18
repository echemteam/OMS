import { GridColumnType } from "../../../../data/gridColumnType";
import { FormFieldTypes } from "../../../../data/formFieldType";

export const addEditApiParameterFormData ={
    initialState:{
        endpointId:"",
        name: "",
        dataType:"",
        defaultValue:"",
        isRequired:"",
    },
    formFields: [
        {
            id: "endpointId",
            lable: "EndPoint Id ",
            Field_Name: "EndPoint Id ",
            fieldType: FormFieldTypes.SELECT,
            dataField: "endpointId",
            fieldSetting: {
                placeholder: "Select Endpoint ",
                isEnableOnChange: true
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
            id: "dataType",
            lable: "DataType ",
            Field_Name: "DataType",
            fieldType: FormFieldTypes.SELECT,
            dataField: "dataType",
            fieldSetting: {
                placeholder: "Select DataType",
                isEnableOnChange: true
            },
            
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "defaultValue",
            lable: "Default Value",
            Field_Name: "Default Value",
            fieldType: FormFieldTypes.INPUT,
            dataField: "defaultValue",
            fieldSetting: {
                placeholder: "Enter Default Value",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
       
        {
            id: "isRequired",
            lable: "Is Required",
            Field_Name: "Is Required",
            fieldType: FormFieldTypes.CHECKBOX,
            dataField: "isRequired",
            fieldSetting: {
              placeholder: "",
              allowSpace: true,
            },
            style: {
              containerCss:
                "col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-input margin-left0-checkbox",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }

}

export const ApiParameterGridConfig = {
    columns: [
        {
            name: "EndPoint Name",
            fieldName: "endpointName",
            width: "15%",
            allowShort: true,
          },
      {
        name: "Parameter Name",
        fieldName: "name",
        width: "20%",
        allowShort: true,
      },
      {
        name: "DataType ",
        fieldName: "dataType",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Default Value ",
        fieldName: "defaultValue",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Is Required",
        fieldName: "isRequired",
        width: "15%",
        colType: GridColumnType.CHECKBOX,
        colSettings: {
          allowCheckbox: true,
          allowDisable: true
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