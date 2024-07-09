import { ListShowCustomer, ListSupplier } from "../../../../common/features/Enums/ListEnums";
import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";
import { getLabelClass } from "../../../../utils/StatusColors/StatusColors";

export const reasonData = {
  name: "",
  initialState: { inActiveReason: "" },
  formFields: [
    {
      id: "inActiveReason",
      lable: "Reason :",
      Field_Name: "Reason ",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "inActiveReason",
      fieldSetting: {
        placeholder: "please enter Reason",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
      },
    },],
}

export const AllCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "32%",
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "32%",
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      width: "25%",
    },
    {
      name: "Status",
      width: "25%",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: getLabelClass,
      },
    },
    // {
    //   name: "Progress",
    //   fieldName: "progress",
    //   colType: GridColumnType.PROGRESS,

    // },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      width: "15%",
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
        allowFreeze: true,
        allowBlocked: true,
        allowReject: true,
      },
    },
  ],
};

export const PendingCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "35%",
      // allowShort: true,
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "35%",
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      width: "20%",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      width: "35%",
      // allowShort: true,
    },
    // {
    //   name: "Progress",
    //   fieldName: "progress",
    //   colType: GridColumnType.PROGRESS,

    // },
    {
      name: "Action",
      width: "10%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
      },
    },
  ],
};

export const SubmittedCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "25%",
      // allowShort: true,
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "25%",
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      width: "20%",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      width: "35%",
      // allowShort: true,
    },
    {
      name: "Approve",
      width: "10%",
      allowShort: false,
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        allowDisable: false,
      },
    },
    {
      name: "Action",
      width: "10%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
      },
    },
  ],

};

export const ApprovedCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "35%",
      // allowShort: true,
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "35%",
    },
    {
      name: "Tax Id",
      width: "35%",
      fieldName: "taxId",
      // allowShort: true,
    },
    {
      name: "Action",
      width: "30%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
        allowFreeze: true,
        allowBlocked: true,
        allowReject: true,
      },
    },
  ],
};

export const RejectedCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "35%",
      // allowShort: true,
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "35%",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      width: "35%",
      // allowShort: true,
    },
    {
      name: "Action",
      width: "30%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,

      },
    },
  ],
};


export const AllInActiveCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      // allowShort: true,
      width: "25%",
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "25%",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      width: "25%",
      // allowShort: true,
    },
    {
      name: "Date",
      width: "25%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Status",
      width: "25%",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: getLabelClass,
      },
    },
  ],
};

export const FreezedInActiveCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "25%",
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "25%",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      width: "25%",
    },
    {
      name: "Date",
      width: "25%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      width: "25%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: false,
        allowUnfreeze: true,
      },
    },
  ],
};

export const BlockedInActiveCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "25%",
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "25%",
    },
    {
      name: "Reason",
      width: "25%",
      fieldName: "inActiveReason",
    },
    {
      name: "Date",
      width: "25%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      width: "25%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: false,
        allowUnfreeze: false,
        allowUnblocked: true,
      },
    },
  ],
};

export const DisabledInActiveCustomerGridConfig = {
  columns: [
    {
      id:ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      width: "35%",
    },
    {
      id:ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      width: "35%",
    },
    {
      name: "Reason",
      width: "35%",
      fieldName: "inActiveReason",
    },
    {
      name: "Date",
      width: "30%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    // {
    //   name: "Action",
    //   width:"25%",
    //   colType: GridColumnType.ACTION,
    //   defaultAction: {
    //     allowEdit: false,
    //     allowDelete: false,
    //     allowUnfreeze: false,
    //     allowUnblocked: false,
    //     allowActiveCustomer: true,
    //   },
    // },
  ],
};