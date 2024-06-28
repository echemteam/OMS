import { securityKey } from "../../../data/SecurityKey";

export const Menu = [
  {
    name: "Dashboard",
    id: "Dashboard",
    to: "/",
    iconClass: "bi bi-file-earmark-medical",
    subMenu: false,
    securityKey: securityKey.DASHBOARD,
    children: []
  },
  {
    id: "Security",
    name: "Security",
    iconClass: "bi bi-shield-fill-check",
    subMenu: true,
    to: "#",
    securityKey: securityKey.SECURITYROLEMANAGEMENT,
    children: [
      {
        id: "User Management",
        submenuName: "User Management",
        to: "/Users",
        securityKey: securityKey.USERMANAGEMENT
      },
      // {
      //   id: "roleManagement",
      //   submenuName: "Role Management",
      //   to: "/usersRole",
      //   securityKey: securityKey.ROLEMANAGEMENT
      // },
      {
        id: "SecurityRoleManagement",
        submenuName: "Security Roles Management",
        to: "/SecurityRoleManagement",
        securityKey: securityKey.SECURITYROLEMANAGEMENT
      }, 
    ],

  },
  {
    id: "customer",
    name: "Customer Details",
    iconClass: "bi bi-people-fill",
    subMenu: true,
    to: "#",
    securityKey: "",
    children: [
      {
        id: "addCustomer",
        submenuName: "Add Customer",
        to: "/addCustomer",
        securityKey: "",
      },
      {
        id: "Customers",
        submenuName: "Customer",
        to: "/Customers",
        securityKey: "",
      },
    ],
  },
  {
    id: "supplier",
    name: "Supplier Details",
    iconClass: "bi bi-people-fill",
    subMenu: true,
    to: "#",
    securityKey: "",
    children: [
      {
        id: "addSupplier",
        submenuName: "Add Supplier",
        to: "/addSupplier",
        securityKey: "",
      },
      {
        id: "Suppliers",
        submenuName: "Supplier",
        to: "/Suppliers",
        securityKey: "",
      },
    ],
  },
];
