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
              return "badge-gradient-success";
            case "Open":
              return "badge-gradient-info";
            case "In Active":
              return "badge-gradient-danger";
            case "Pending":
              return "badge-gradient-Pending";
            case "In progress":
              return "badge-gradient-theme";
            case "Submitted":
              return "badge-gradient-Submitted";
            case "Approved":
              return "badge-gradient-Approved";
            case "Freeze":
              return "badge-gradient-Frozen";
            case "Block":
              return "badge-gradient-Blocked";

            default:
              return "badge-gradient-info";
          }
        },
      },
    },
    {
      name: "Progress",
      fieldName: "progress",
      colType: GridColumnType.PROGRESS,

    },
    {
      name: "Action",
      colType: GridColumnType.MULTIACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
      },
      customDropdownActions: [
        { name: "EDIT" },
        { name: "DISABLE" },
        { name: "FREEZE" },
        { name: "BLOCKED" },
      ],
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
    {
      name: "Progress",
      fieldName: "progress",
      colType: GridColumnType.PROGRESS,

    },
    {
      name: "Action",
      colType: GridColumnType.MULTIACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
      },
      customDropdownActions: [
        { name: "EDIT" },
        { name: "DISABLE" },
      ],
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
      colSettings: {
        allowEdit: true,
      },
    },
    {
      name: "Action",
      colType: GridColumnType.MULTIACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
      },
      customDropdownActions: [
        { name: "EDIT" },
        { name: "DISABLE" },
      ],
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
      colType: GridColumnType.MULTIACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
      },
      customDropdownActions: [
        { name: "EDIT" },
        { name: "DISABLE" },
        { name: "FREEZE" },
        { name: "BLOCKED" },
      ],
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
      name: "Data",
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
              return "badge-gradient-success";
            case "Open":
              return "badge-gradient-info";
            case "In Active":
              return "badge-gradient-danger";
            case "Pending":
              return "badge-gradient-Pending";
            case "In progress":
              return "badge-gradient-theme";
            case "Submitted":
              return "badge-gradient-Submitted";
            case "Approved":
              return "badge-gradient-Approved";
            case "Freeze":
              return "badge-gradient-Frozen";
            case "Block":
              return "badge-gradient-Blocked";

            default:
              return "badge-gradient-info";
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
      fieldName: "taxId",
    },
    {
      name: "Data",
      fieldName: "taxId",
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
      fieldName: "taxId",
    },
    {
      name: "Data",
      fieldName: "taxId",
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
        allowUnfreeze: false,
        allowblocked: true,
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
      fieldName: "taxId",
    },
    {
      name: "Data",
      fieldName: "taxId",
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
        allowUnfreeze: false,
        allowblocked: false,
        allowActiveCustomer: true,
      },
    },
  ],
};