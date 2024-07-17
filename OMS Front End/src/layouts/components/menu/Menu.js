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
    securityKey: securityKey.SECURITY,
    children: [
      {
        id: "User Management",
        submenuName: "User Management",
        to: "/Users",
        securityKey: securityKey.USERMANAGEMENT
      },
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
    securityKey: securityKey.CUSTOMER,
    children: [
      {
        id: "addCustomer",
        submenuName: "Add Customer",
        to: "/addCustomer",
        securityKey: securityKey.ADDCUSTOMER,
      },
      {
        id: "Customers",
        submenuName: "Customer",
        to: "/Customers",
        securityKey: securityKey.CUSTOMERLIST,
      },
    ],
  },
  {
    id: "supplier",
    name: "Supplier Details",
    iconClass: "fa fa-truck",
    subMenu: true, 
    to: "#",
    securityKey: securityKey.SUPPLIER,
    children: [
      {
        id: "addSupplier",
        submenuName: "Add Supplier",
        to: "/addSupplier",
        securityKey: securityKey.ADDSUPPLIER,
      },
      {
        id: "Suppliers",
        submenuName: "Supplier",
        to: "/Suppliers",
        securityKey: securityKey.SUPPLIERLIST,
      },
    ],
  },
  {
    id: "configuration",
    name: "Configuration",
    iconClass: "fa fa-cog",
    subMenu: true, 
    to: "#",
    securityKey: securityKey.CONFIGURATION,
    children: [
      {
        id: "approvalRules",
        submenuName: "Approval Rules",
        to: "/ApprovalRules",
        securityKey: securityKey.APPROVALRULES,
      },
    ],
  },
  {
    id: "apiconfiguration",
    name: "API Configuration",
    iconClass: "fa fa-cog",
    subMenu: true, 
    to: "#",
   // securityKey: securityKey.CONFIGURATION,
    children: [
      {
        id: "apiProviders",
        submenuName: "API Providers",
        to: "/APIProviders", 
        //securityKey: securityKey.APPROVALRULES,
      },
      {
        id: "apiEndpoints",
        submenuName: "API EndPoints",
        to: "/APIEndpoints", 
        //securityKey: securityKey.APPROVALRULES,
      },
      {
        id: "apiParameters",
        submenuName: "API Parameters",
        to: "/APIParameters", 
        //securityKey: securityKey.APPROVALRULES,
      },
      {
        id: "apiAuthentication",
        submenuName: "API Authentication",
        to: "/APIAuthentication", 
        //securityKey: securityKey.APPROVALRULES,
      },
    ],
  },
];
