import { AppIcons } from "../../../../data/appIcons";
import { GridColumnType } from "../../../../data/gridColumnType";
import { ListShowCustomer, ListSupplier } from "../../../../utils/Enums/commonEnums";
import { getLabelClass } from "../../../../utils/StatusColors/StatusColors";

export const AllCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "32%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "32%",
      },
      allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Status",
      colStyle: {
        width: "25%",
      },
      fieldName: "status",
      allowShort: true,
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
      colStyle: {
        width: "15%",
      },
      defaultAction: {
        allowEdit: true,
      },
      customAction: [
        {
          name: "ALLOWDISABLE",
          iconName: "mi:user",
          title: "Disable",
          className: "disable-icon"
        },
        {
          name: "ALLOWFREEZE",
          iconName: "material-symbols:lock-outline",
          title: "Freeze",
          className: "freeze-icon"
        },
        {
          name: "ALLOWBLOCKED",
          iconName: "akar-icons:block",
          title: "Blocked",
          className: "block-icon"
        },
        {
          name: "ALLOREJECT",
          iconName: "carbon:close-outline",
          title: "Reject",
          className: "reject-icon"
        },
      ],
     
    },
  ],
};

export const PendingCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    // {
    //   name: "Progress",
    //   fieldName: "progress",
    //   colType: GridColumnType.PROGRESS,

    // },
    {
      name: "Action",
      colStyle: {
        width: "10%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        // isDisabled: true,
      },
      customAction: [
        {
          name: "ALLOWDISABLE",
          iconName: "mi:user",
          title: "Disable",
          className: "disable-icon"
        },
      ],
    },
  ],
};

export const SubmittedCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "25%",
      },
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      colStyle: {
        width: "20%",
      },
      allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      name: "Approve",
      colStyle: {
        width: "10%",
      },
      allowShort: false,
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        isDisabled: false,
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
        // isDisabled: true,
      },
      customAction: [
        {
          name: "ALLOWDISABLE",
          iconName: "mi:user",
          title: "Disable",
          className: "disable-icon"
        },
      ],
    },
  ],

};

export const ApprovedCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
    },
    {
      name: "Tax Id",
      colStyle: {
        width: "35%",
      },
      fieldName: "taxId",
      allowShort: true,
    },
    {
      name: "Action",
      colStyle: {
        width: "30%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
      },
      customAction: [
        {
          name: "ALLOWDISABLE",
          iconName: "mi:user",
          title: "Disable",
          className: "disable-icon"
        },
        {
          name: "ALLOWFREEZE",
          iconName: "material-symbols:lock-outline",
          title: "Freeze",
          className: "freeze-icon"
        },
        {
          name: "ALLOWBLOCKED",
          iconName: "akar-icons:block",
          title: "Blocked",
          className: "block-icon"
        },
        {
          name: "ALLOREJECT",
          iconName: "carbon:close-outline",
          title: "Reject",
          className: "reject-icon"
        },
      ],
    },
  ],
};

export const RejectedCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      name: "Action",
      colStyle: {
        width: "30%",
      },
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
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      allowShort: true,
      colStyle: {
        width: "25%",
      },
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Date",
      colStyle: {
        width: "25%",
      },
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "MM/DD/YYYY hh:mm A ",
      },
    },
    {
      name: "Status",
      colStyle: {
        width: "25%",
        
      },
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
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Date",
      colStyle: {
        width: "25%",
      },
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "MM/DD/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "25%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: false,
        // allowUnfreeze: true,
      },
      customAction: [
        {
          name: "ALLOWFREEZE",
          iconName: "material-symbols:lock-outline",
          title: "Freeze",
          className: "freeze-icon"
        },
      ],
    },
  ],
};

export const BlockedInActiveCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "25%",
      },
      allowShort: true,
    },
    {
      name: "Reason",
      colStyle: {
        width: "25%",
      },
      fieldName: "inActiveReason",
      allowShort: true,
    },
    {
      name: "Date",
      colStyle: {
        width: "25%",
      },
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "MM/DD/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "25%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        // allowDelete: false,
        // allowUnfreeze: false,
        // allowUnblocked: true,
      },
      customAction: [
        {
          name: "ALLOWUNBLOCKED",
          title: "UnBlock",
          iconName: "basil:unlock-outline",
          className: "un-lock-icon"
        },
      ],
    },
  ],
};

export const DisabledInActiveCustomerGridConfig = {
  columns: [
    {
      id: ListShowCustomer.value,
      name: "Customer Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      id: ListSupplier.value,
      name: "Supplier Name",
      fieldName: "name",
      colStyle: {
        width: "35%",
      },
      allowShort: true,
    },
    {
      name: "Reason",
      colStyle: {
        width: "35%",
      },
      fieldName: "inActiveReason",
      allowShort: true,
    },
    {
      name: "Date",
      colStyle: {
        width: "35%",
      },
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "MM/DD/YYYY hh:mm A ",
      },
    },
  ],
};