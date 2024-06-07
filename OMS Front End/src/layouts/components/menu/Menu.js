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
    name: "Form",
    id: "form",
    to: "/themeComponent/demoForm",
    iconClass: "bi bi-file-earmark-medical",
    subMenu: false,
    securityKey: '',
    children: []
  },
  {
    name: "Grid",
    id: "gridPage",
    to: "/themeComponent/demoGrid",
    iconClass: "bi bi-table",
    subMenu: false,
    securityKey: '',
    children: []
  },
  {
    name: "Stepper",
    id: "Stepper",
    to: "/themeComponent/stepper",
    iconClass: "bi bi-table",
    subMenu: false,
    securityKey: '',
    children: []
  },
  {
    name: "widgets",
    id: "widgets",
    to: "/themeComponent/widgets",
    iconClass: "bi bi-clipboard-data",
    subMenu: false,
    securityKey: '',
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
        id: "viewCustomer",
        submenuName: "Customer",
        to: "/viewCustomer",
        securityKey: "",
      },
    ],
  },
];
