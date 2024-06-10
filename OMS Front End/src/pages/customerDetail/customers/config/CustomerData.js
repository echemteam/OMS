import { GridColumnType } from "../../../../data/gridColumnType";

export const CustomerGridConfig = {
  columns: [
    {
      name: "User Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "First Name",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Last Name",
      fieldName: "lastName",
    },
    {
      name: "IsActive",
      fieldName: "isActive",
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        valueField: "isActive",
        getLableClass: (value) => {
          switch (value) {
            case true:
              return "info";
            case false:
              return "danger";
            default:
              return "secondary";
          }
        },
      },
    },
    // {
    //   name: "Status",
    //   fieldName: "status",
    //   allowShort: false,
    //   colType: GridColumnType.LABLE,
    //   colSettings: {
    //     valueField: "status",
    //     getLableClass: (value) => {
    //       switch (value) {
    //         case "Active":
    //           return "badge-gradient-success";
    //         case "Open":
    //           return "badge-gradient-info";
    //         case "In Active":
    //           return "badge-gradient-danger";
    //         case "Pending":
    //           return "badge-gradient-warning";

    //         case "In progress":
    //           return "badge-gradient-theme";

    //         default:
    //           return "badge-gradient-info";
    //       }
    //     },
    //   },
    // },

    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },

    },
  ],
};


export const customerData = [
  {
    email: "admin@gmail.com",
  },
  {
    email: "demo@gmail.com",
  },
];