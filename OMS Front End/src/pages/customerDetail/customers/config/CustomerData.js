import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

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
      name: "Customer Name",
      fieldName: "name",
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "status-btn badge-gradient-success";
            case "Open":
              return "status-btn badge-gradient-info";
            case "In Active":
              return "status-btn badge-gradient-danger";
            case "Pending":
              return "status-btn badge-gradient-Pending";
            case "In progress":
              return "status-btn badge-gradient-theme";
            case "Submitted":
              return "status-btn badge-gradient-Submitted";
            case "Approved":
              return "status-btn badge-gradient-Approved";
            case "Freeze":
              return "status-btn badge-gradient-Frozen";
            case "Block":
              return "status-btn badge-gradient-Blocked";

            default:
              return "status-btn badge-gradient-info";
          }
        },
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
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
        allowFreeze: true,
        allowBlocked: true,
      },
      // customDropdownActions: [
      //   { name: "EDIT" },
      //   { name: "DISABLE" },
      //   { name: "FREEZE" },
      //   { name: "BLOCKED" },
      // ],
    },
  ],
};

export const PendingCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      // allowShort: true,
    },
    // {
    //   name: "Progress",
    //   fieldName: "progress",
    //   colType: GridColumnType.PROGRESS,

    // },
    {
      name: "Action",
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
      name: "Customer Name",
      fieldName: "name",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      // allowShort: true,
    },
    {
      name: "Approve",
      allowShort: false,
      colType: GridColumnType.CHECKBOX,
      // colSettings: {
      //   allowEdit: true,
      // },
    },
    {
      name: "Action",
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
      name: "Customer Name",
      fieldName: "name",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      // allowShort: true,
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
        allowFreeze: true,
        allowBlocked: true,
      },
    },
  ],
};

export const AllInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      // allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "taxId",
      // allowShort: true,
    },
    {
      name: "Date",
      fieldName: "taxId",
      // allowShort: true,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "status-btn badge-gradient-success";
            case "Open":
              return "status-btn badge-gradient-info";
            case "In Active":
              return "status-btn badge-gradient-danger";
            case "Pending":
              return "status-btn badge-gradient-Pending";
            case "In progress":
              return "status-btn badge-gradient-theme";
            case "Submitted":
              return "status-btn badge-gradient-Submitted";
            case "Approved":
              return "status-btn badge-gradient-Approved";
            case "Freeze":
              return "status-btn badge-gradient-Frozen";
            case "Block":
              return "status-btn badge-gradient-Blocked";

            default:
              return "status-btn badge-gradient-info";
          }
        },
      },
    },
  ],
};

export const FreezedInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
    },
    {
      name: "Date",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
        allowUnfreeze: true,
      },
    },
  ],
};

export const BlockedInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
    },
    {
      name: "Date",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
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
      name: "Customer Name",
      fieldName: "name",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
    },
    {
      name: "Date",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
        allowUnfreeze: false,
        allowUnblocked: false,
        allowActiveCustomer: true,
      },
    },
  ],
};