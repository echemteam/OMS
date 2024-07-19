import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const SubCustomerFormData = {
    name: "SubCustomer From",
    initialState: { customerId: "" },
    formFields: [
      {
        id: "customerId",
        lable: "Link Customer ",
        Field_Name: "Link-Customer",
        fieldType: FormFieldTypes.SELECT,
        dataField: "customerId",
        fieldSetting: {
          placeholder: "Select Customer ",
          isMultiSelect:true,
          options: []
        },
        validation: [{ type: "require" }],
        style: {
          containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
        },
      },],
    formSetting: {
      isViewOnly: false
    }
  }

  export const SubCustomerGridConfig = {
    columns: [

        {
          name: "Customer",
          fieldName: "subCustomerName",
          width: "30%",
          allowShort: true,
        },
        {
          name: "Country",
          fieldName: "countryName",
          width: "25%",
          allowShort: true,
        },
   
        {
            name: "Tax Id",
            fieldName: "taxId",
            width: "25%",
            allowShort: true,
          },
        {
          name: "Action",
          width: "20%",
          colType: GridColumnType.ACTION,
          defaultAction: {
            allowDelete: true,
          },
          customAction: [
            {
                name: "EDIT",
                iconName: AppIcons.EyeIcon,
            },
        ],
          
        },
      ],
  }